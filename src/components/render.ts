
import { Animals } from "./class/animal.js";

import { Criceto } from "./class/criceto.js";       
import { Cane } from "./class/cane.js";
import { Gatto } from "./class/gatto.js";       
import { Pesce } from "./class/pesce.js";

//creo una funzione che genera una emoji che rappresenta l'animale in base al tipo 
export function getAnimalEmoji(animale: Animals): string {
  if (animale instanceof Cane) return "🐕";
  if (animale instanceof Gatto) return "🐈";
  if (animale instanceof Criceto) return "🐹";
  if (animale instanceof Pesce) return "🐟";
  return "❓";
}

//creo una funzione che genera una immagine che rappresenta l'animale in base al tipo 
export function getAnimalImage(animale: Animals): string {
  if (animale instanceof Cane) return "../image/fibi.png";
  if (animale instanceof Gatto) return "../image/barney.png";
  if (animale instanceof Criceto) return "../image/cioppi.png";
  if (animale instanceof Pesce) return "../image/cleo.png";
  return "../image/default.png"; // immagine di fallback
}

//creo una funzione che genera una card per ogni animale con la rispettiva emoji
export function renderAnimalCard(animale: Animals): HTMLElement {

  const container = document.createElement("div");
  container.classList.add("animal-container");

  const card = document.createElement("div");
  card.classList.add("animal-card");

  // Emoji
  const emoji = document.createElement("span");
  emoji.textContent = getAnimalEmoji(animale);
  emoji.classList.add("emoji");
  emoji.style.cursor = "pointer";

  card.appendChild(emoji);
  container.appendChild(card);

  return container;
}

//funzione che inserisce in ogni sezione html un animale in base all'istanza di appartenenza
export function appendToHabitat(animale: Animals, elemento: HTMLElement) {
  if (animale instanceof Cane) {
    document.getElementById("dog-house")?.appendChild(elemento);
  } else if (animale instanceof Gatto) {
    document.getElementById("cat-house")?.appendChild(elemento);
  } else if (animale instanceof Criceto) {
    document.getElementById("hamster-house")?.appendChild(elemento);
  } else if (animale instanceof Pesce) {
    if (animale.habitat === "acqua salata") {
      document.getElementById("salt-water")?.appendChild(elemento);
    } else {
      document.getElementById("sweet-water")?.appendChild(elemento);
    }
  }
}

