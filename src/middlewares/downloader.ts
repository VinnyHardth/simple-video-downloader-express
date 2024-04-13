import getInfo from "youtube-dl-exec";
import youtubedl from "youtube-dl-exec";
import * as path from "path";

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

export function getVideoInfo(url: string) {
  return new Promise((resolve, reject) => {
    getInfo(url).then((info) => {
      resolve(info);
    });
  });
}
