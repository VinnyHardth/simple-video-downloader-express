/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response } from "express";
import * as utils from "../utils/videoInfo";
import path from "path";

const index = (req: Request, res: Response) => {
  try {
    res.render("index");
  } catch (error) {
    console.error("Ocorreu um erro ao renderizar a página:", error);
  }
};

const download = async (req: Request, res: Response) => {
  if (req.method === "POST") {
    try {
      const videoURL = req.body.link;

      // Espera que a promessa seja resolvida para obter as informações do vídeo
      const videoInfo = await utils.getVideoInfo(videoURL);

      // Agora você pode acessar as informações do vídeo
      console.log("Informações do vídeo:", videoInfo);

      // Aqui você pode acessar propriedades do objeto videoInfo, por exemplo:
      console.log(videoInfo.name); // Supondo que 'name' seja uma propriedade do primeiro objeto em videoInfo

      res.render("download", { videoInfo });
    } catch (error) {
      console.error("Ocorreu um erro ao baixar o vídeo:", error);
      res.status(500).send("Ocorreu um erro ao baixar o vídeo");
    }
  }
};

export { index, download };
