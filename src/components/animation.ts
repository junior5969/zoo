
import { Animals } from "./class/animal.js";
import { Cane } from "./class/cane.js";
import { Gatto } from "./class/gatto.js";
import { Criceto } from "./class/criceto.js";
import { Pesce } from "./class/pesce.js";



export enum ButtonType {
  feedButton = 'food',
  sleepButton='bed',
  washButton = 'soap',
  cuddleButton = 'hand'
}

//creo una funzione che genera una emoji che rappresenta l'oggetto in base al bottone 
export function getButtonEmoji (button: ButtonType, animale?: Animals): string {
  if ( button===ButtonType.feedButton) {
     if (animale instanceof Cane) return "🍖";
     if (animale instanceof Gatto) return "🐟";
     if (animale instanceof Criceto) return "🥜";
     if (animale instanceof Pesce) return "🪱";
     }

  if  ( button===ButtonType.sleepButton) return "😴";
  if  ( button===ButtonType.washButton) return "🧼";
  if  ( button===ButtonType.cuddleButton)return "🖐️";
  return "?";
}

