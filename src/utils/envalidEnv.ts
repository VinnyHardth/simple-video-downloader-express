import { port } from "envalid";

export function envalidEnv() {
  return {
    PORT: port(),
  };
}
