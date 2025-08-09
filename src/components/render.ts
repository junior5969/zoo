
import { Animals } from "./class/animal";

import { Criceto } from "./class/criceto";       
import { Cane } from "./class/cane";
import { Gatto } from "./class/gatto";       
import { Pesce } from "./class/pesce";


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
  if (animale instanceof Cane) return "img/fibi.png";
  if (animale instanceof Gatto) return "img/barney.png";
  if (animale instanceof Criceto) return "img/cioppi.png";
  if (animale instanceof Pesce) return "img/cleo.png";
  return "img/default.png"; // fallback
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

