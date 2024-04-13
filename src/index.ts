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
