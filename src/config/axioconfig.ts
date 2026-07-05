import axios from "axios";
import { chatboturl, serverurl } from "./url";

export const Serverchatbot = axios.create({
    baseURL : chatboturl
})

export const Serverdatabase = axios.create({
    baseURL : serverurl,
    withCredentials : true
})