import { AxiosRequestConfig } from "axios";
import { clsx, type ClassValue } from "clsx";
import CryptoJS from "crypto-js";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function log(item: any, ...items: any) {
  const ambiente = import.meta.env.VITE_ENVIRONMENT_VARIABLE;
  if (ambiente != "production") {
    console.log(item, ...items);
  }
}

export const encrypt = (dados: string) => {
  const key = import.meta.env.VITE_AES_KEY;
  const iv = import.meta.env.VITE_AES_IV;
  const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
  const ivUtf8 = CryptoJS.enc.Utf8.parse(iv);
  const encryptbt = CryptoJS.enc.Utf8.parse(dados);
  const encrypted = CryptoJS.AES.encrypt(encryptbt, keyUtf8, {
    keySize: 256 / 32,
    iv: ivUtf8,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

export const decrypt = (dados: string) => {
  const key = import.meta.env.VITE_AES_KEY;
  const iv = import.meta.env.VITE_AES_IV;
  const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
  const ivUtf8 = CryptoJS.enc.Utf8.parse(iv);
  const decryptbt = CryptoJS.AES.decrypt(dados, keyUtf8, {
    keySize: 256 / 32,
    iv: ivUtf8,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decryptbt);
};

export const formatDate = (
  date: string,
  formato: "machine" | "pt-br" | "en" = "pt-br"
): string => {
  try {
    const newDate = new Date(date);

    if (isNaN(newDate.getTime())) {
      return date;
    }

    const day = String(newDate.getDate()).padStart(2, "0");
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const year = newDate.getFullYear();

    switch (formato) {
      case "pt-br":
        return `${day}/${month}/${year}`;
      case "en":
        return `${month}/${day}/${year}`;
      case "machine":
        return `${year}-${month}-${day}`;
      default:
        return date;
    }
  } catch (error) {
    return date;
  }
};

export const formatFileSize = (sizeInBytes: number): string => {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} Bytes`;
  } else if (sizeInBytes < 1024 * 1024) {
    return `${(sizeInBytes / 1024).toFixed(2)} KB`;
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
};

export const completeToken = (token: string) => {
  const newDate = new Date();
  const d = newDate.getDate();
  const m = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const y = newDate.getFullYear();
  const h = newDate.getHours();
  const finalToken = `${token}${y}${m}${d}${h}`;
  return finalToken;
};

export const getFetchHeaders = (contentType?: string) => {
  const token = completeToken(import.meta.env.VITE_TOKEN_BAREAR);
  if (contentType) {
    const header: AxiosRequestConfig = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Strict-Transport-Security":
          "max-age=2592000; includeSubDomains; preload",
        "Content-Type": contentType,
        Authorization: `bearer ${token}`,
      },
    };
    return header;
  }

  const header: AxiosRequestConfig = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Strict-Transport-Security":
        "max-age=2592000; includeSubDomains; preload",
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  return header;
};
