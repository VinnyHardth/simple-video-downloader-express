/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response } from "express";
import * as utils from "../utils/videoInfo";
import * as middleware from "../middlewares/downloader";
import path from "path";

const index = (req: Request, res: Response) => {
  try {
    res.render("index");
  } catch (error) {
    console.error("Ocorreu um erro ao renderizar a página:", error);
  }
};

const downloadConfirm = async (req: Request, res: Response) => {
  if (req.method === "POST") {
    try {
      const videoURL = req.body.link;

      // Espera que a promessa seja resolvida para obter as informações do vídeo
      const videoInfo = await utils.getVideoInfo(videoURL);

      // Agora você pode acessar as informações do vídeo
      console.log("Informações do vídeo:", videoInfo);

      // Aqui você pode acessar propriedades do objeto videoInfo, por exemplo:
      console.log(videoInfo.name); // Supondo que 'name' seja uma propriedade do primeiro objeto em videoInfo

      res.render("download", { videoInfo, videoURL });
    } catch (error) {
      console.error("Ocorreu um erro ao baixar o vídeo:", error);
      res.status(500).send("Ocorreu um erro ao baixar o vídeo");
    }
  }
};

const downloadVideo = async (req: Request, res: Response) => {
  if (req.method === "POST") {
    try {
      console.log(req.body);
      const videoURL = req.body.url;
      const mediaType = req.body.mediaType;
      const name = req.body.name;

      let outputPath;
      if (mediaType === "video") {
        outputPath = path.resolve(
          __dirname,
          `../../public/downloads/${name}.mp4`
        );
        await middleware.downloadVideo(videoURL, outputPath);
      } else {
        outputPath = path.resolve(
          __dirname,
          `../../public/downloads/${name}.mp3`
        );
        await middleware.downloadAudio(videoURL, outputPath);
      }

      res.redirect("/");
    } catch (error) {
      console.error("Ocorreu um erro ao baixar o vídeo:", error);
      res.status(500).send("Ocorreu um erro ao baixar o vídeo");
    }
  }
};

export { index, downloadConfirm, downloadVideo };
