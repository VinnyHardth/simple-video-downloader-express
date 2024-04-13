/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response } from "express";
import * as middleware from "../middlewares/downloader";
import path from "path";

const index = (req: Request, res: Response) => {
  try {
    res.render("index");
  } catch (error) {
    console.error("Ocorreu um erro ao renderizar a página:", error);
  }
};

const download = (req: Request, res: Response) => {
  if (req.method === "POST") {
    try {
      const videoURL = req.body.link;
      console.log(videoURL);
      const outputDirectory = path.join(__dirname, "videos");
      const outputFilename = "video.mp4"; // Nome do arquivo de saída
      const outputPath = path.join(outputDirectory, outputFilename);

      middleware.printVideoQualities(videoURL);
    } catch (error) {
      console.error("Ocorreu um erro ao baixar o vídeo:", error);
    }
  }
};

export { index, download };
