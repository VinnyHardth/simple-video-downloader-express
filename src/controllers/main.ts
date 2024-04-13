/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response } from "express";

const index = (req: Request, res: Response) => {
  try {
    res.render("index");
  } catch (error) {
    console.error("Ocorreu um erro ao renderizar a página:", error);
  }
};

export { index };
