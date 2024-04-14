import { Router } from "express";

import * as mainController from "../controllers/main";

const router = Router();

router.get("/", mainController.index);
router.post("/download", mainController.downloadConfirm);
router.post("/startDownload", mainController.downloadVideo);

export default router;
