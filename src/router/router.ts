import { Router } from "express";

import * as mainController from "../controllers/main";

const router = Router();

router.get("/", mainController.index);

export default router;
