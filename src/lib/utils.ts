import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function log(item: any, ...items:any){
  const ambiente = import.meta.env.VITE_ENVIRONMENT_VARIABLE
  if(ambiente != "production"){
    console.log(item, ...items)
  }
}