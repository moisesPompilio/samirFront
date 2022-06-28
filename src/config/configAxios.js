import axios from "axios";
import { baseApiUrl } from "../global";

export const http = axios.create({
baseURL: baseApiUrl
})