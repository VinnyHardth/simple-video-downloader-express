import { get } from "http";
import * as ytdl from "ytdl-core";

interface FormatInfo {
  resolution: string;
  format: string;
}

async function getVideoFormats(url: string): Promise<FormatInfo[]> {
  try {
    const info = await ytdl.getInfo(url);
    const videoFormats: FormatInfo[] = [];

    info.formats.forEach((format) => {
      if (format.mimeType && format.mimeType.includes("video/mp4")) {
        let resolution;
        if (format.qualityLabel) {
          resolution = format.qualityLabel;
        } else if (format.width && format.height) {
          resolution = `${format.width}x${format.height}`;
        } else {
          resolution = "unknown";
        }

        const formatInfo: FormatInfo = {
          resolution: resolution,
          format: format.mimeType,
        };
        videoFormats.push(formatInfo);
      }
    });

    return videoFormats;
  } catch (error) {
    console.error("Ocorreu um erro ao obter informações do vídeo:", error);
    throw error;
  }
}

async function getAudioFormats(url: string): Promise<FormatInfo[]> {
  try {
    const info = await ytdl.getInfo(url);
    const audioFormats: FormatInfo[] = [];

    info.formats.forEach((format) => {
      if (format.mimeType && format.mimeType.includes("audio/mp4")) {
        const formatInfo: FormatInfo = {
          resolution: "audio only",
          format: format.mimeType,
        };
        audioFormats.push(formatInfo);
      }
    });

    return audioFormats;
  } catch (error) {
    console.error("Ocorreu um erro ao obter informações do áudio:", error);
    throw error;
  }
}

export async function getVideoName(url: string) {
  try {
    const info = await ytdl.getInfo(url);
    return info.videoDetails.title;
  } catch (error) {
    console.error("Ocorreu um erro ao obter o nome do vídeo:", error);
    throw error;
  }
}

export async function getVideoInfo(url: string) {
  try {
    const name = await getVideoName(url);
    const videoFormats = await getVideoFormats(url);
    const audioFormats = await getAudioFormats(url);

    return { name, videoFormats, audioFormats };
  } catch (error) {
    console.error("Ocorreu um erro ao obter informações do vídeo:", error);
    throw error;
  }
}
