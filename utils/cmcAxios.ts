import axios from "axios";

export const cmcAxios = axios.create({
  baseURL: "https://pro-api.coinmarketcap.com/",
  headers: {
    "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY
  }
});