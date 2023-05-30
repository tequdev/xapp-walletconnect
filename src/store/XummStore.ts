import { Xumm } from "xumm";

export const xumm =  new Xumm(import.meta.env.VITE_XUMM_API_KEY || "");
