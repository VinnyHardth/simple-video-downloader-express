import youtubedl from "youtube-dl-exec";
import * as ytdl from "ytdl-core";

export async function downloadVideo(url: string, outputPath: string) {
  try {
    await youtubedl(url, {
      output: outputPath,
    });
    console.log("Vídeo baixado com sucesso!");
  } catch (error) {
    console.error("Ocorreu um erro ao baixar o vídeo:", error);
  }
}

interface VideoFormat {
  resolution: string;
  format: string;
}

interface VideoInfo {
  audioFormats: VideoFormat[];
  videoFormats: VideoFormat[];
}

export async function getVideoInfo(url: string): Promise<VideoInfo> {
  try {
    const info = await ytdl.getInfo(url);
    const audioFormats: VideoFormat[] = [];
    const videoFormats: VideoFormat[] = [];

    info.formats.forEach((format) => {
      if (
        format.mimeType &&
        (format.mimeType.includes("video/mp4") ||
          format.mimeType.includes("audio/mp4"))
      ) {
        const resolution = format.qualityLabel || "unknown";

        const formatInfo: VideoFormat = {
          resolution: resolution,
          format: format.mimeType,
        };

        if (format.hasVideo && !format.hasAudio) {
          videoFormats.push(formatInfo);
        } else if (format.hasAudio && !format.hasVideo) {
          audioFormats.push(formatInfo);
        }
      }
    });

    return { audioFormats, videoFormats };
  } catch (error) {
    console.error("Ocorreu um erro ao obter informações do vídeo:", error);
    throw error;
  }
}
