import youtubedl from "youtube-dl-exec";

export const downloadAudio = async (url: string, outputPath: string) => {
  try {
    await youtubedl(url, {
      extractAudio: true,
      audioFormat: "mp3",
      output: outputPath,
    });
  } catch (error) {
    console.error("Ocorreu um erro ao baixar o áudio:", error);
    throw error;
  }
};

export const downloadVideo = async (url: string, outputPath: string) => {
  try {
    await youtubedl(url, {
      output: outputPath,
      format: "mp4",
    });
  } catch (error) {
    console.error("Ocorreu um erro ao baixar o vídeo:", error);
    throw error;
  }
};
