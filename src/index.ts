// import youtubedl from "youtube-dl-exec";
// import * as path from "path";

// async function downloadVideo(url: string, outputPath: string) {
//   try {
//     await youtubedl(url, {
//       output: outputPath, // Caminho do arquivo de saída
//     });
//     console.log("Vídeo baixado com sucesso!");
//   } catch (error) {
//     console.error("Ocorreu um erro ao baixar o vídeo:", error);
//   }
// }

// // Exemplo de uso
// const videoURL = "https://www.youtube.com/watch?v=lmQKBde9qRA";
// const outputDirectory = path.join(__dirname, "videos");
// const outputFilename = "video.mp4"; // Nome do arquivo de saída
// const outputPath = path.join(outputDirectory, outputFilename);

// downloadVideo(videoURL, outputPath);

import dotenv from "dotenv";
import express from "express";
import router from "./router/router";
import sass from "node-sass-middleware";
import { engine } from "express-handlebars";
import { envalidEnv } from "./utils/envalidEnv";

// Carrega e valida as as variáveis de ambiente
dotenv.config();
envalidEnv();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

app.use(
  sass({
    src: `${__dirname}/../public/scss`,
    dest: `${__dirname}/../public/css`,
    outputStyle: "compressed",
    prefix: "/css",
  })
);

app.use("/css", express.static(`${__dirname}/../public/css`));
app.use(
  "/js",
  express.static(`${__dirname}/../node_modules/bootstrap/dist/js/`)
);

app.engine(
  "handlebars",
  engine({
    helpers: require(`${__dirname}/view/helpers/helpers.ts`),
    layoutsDir: `${__dirname}/view/layouts`,
  })
);

app.set("view engine", "handlebars");
app.set("views", `${__dirname}/view`);

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
