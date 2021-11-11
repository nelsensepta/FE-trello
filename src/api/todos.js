import axios from "axios";
import { config } from "../config";

export function getTodos() {
  return axios.get(`${config.api_host}/api/v1/todos`);
}
