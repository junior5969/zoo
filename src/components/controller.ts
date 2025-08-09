
import { Animals } from "./class/animal";

import { Lavabile } from "./interfaces/animal-interface";

import { ButtonType, getButtonEmoji } from "./animation";

import { getAnimalImage } from "./render";

// Funzione che al click di ogni bottone gestisce: aggiorare stato, alternare scomparsa/comparsa di display ed emoji 
function handleAction(
  buttonType: ButtonType,
  animale: Animals,
  container: HTMLElement,
  actionPanel: HTMLElement,
  state: HTMLElement,
  display: HTMLElement,
  actionCallback: () => void,
  clickedButton?: HTMLButtonElement
) {
  actionCallback(); 
  display.classList.add("hidden");

  //nel botton poi, nell'evento click si usa event.currentTarget per indicare il parametro che è il bottone cliccato e che sostiuitrà clickedButton
  if (clickedButton) {
    clickedButton.setAttribute("disabled", "true");
  }

  //buttonEmoji è l'emoji che deriva dalla funziona che in base al bottone premuto la genera
  const buttonEmoji = getButtonEmoji(buttonType, animale);
  //creiamo un bottone che conterrà l'emoji generata
  const emojiButtonElement = document.createElement("button");
  emojiButtonElement.textContent = buttonEmoji;
  emojiButtonElement.classList.add("emoji-button");
   emojiButtonElement.setAttribute("draggable", "true");

/*      //al click del bottone con l'emoji il display dei bottoni si nascone, ma non serve lo faccio gia al click dei bottoni
  emojiButtonElement.addEventListener("click", () => {
    display.classList.add("hidden");
 }); */

let draggedEl: HTMLElement | null = null; 

    emojiButtonElement.addEventListener("dragstart", () => {
     console.log("dragstart");
     emojiButtonElement.style.opacity="0.5";
    //emojiButtonElement.remove();
   });

   
const target = container.querySelector(".animal-image") as HTMLElement;
target.addEventListener("dragover", (event) => {
  // prevent default to allow drop
  event.preventDefault();
    display.classList.remove("hidden");
    emojiButtonElement.remove();
      state.textContent = animale.getStatoGenerale();
});

target.addEventListener("drop", (event) => {
  event.preventDefault();
  if (draggedEl) {
   draggedEl.style.opacity = "1";
    target.appendChild(draggedEl); // sposto l’emoji nel target
    draggedEl = null;
  }
});

  actionPanel.appendChild(emojiButtonElement);


// --- Eventi mobile touch ---
let isDragging = false;

emojiButtonElement.addEventListener("touchstart", (event) => {
  isDragging = true;
  draggedEl = emojiButtonElement;
  emojiButtonElement.style.opacity = "0.5";
});

emojiButtonElement.addEventListener("touchmove", (event) => {
  if (!isDragging) return;
  event.preventDefault();
  // opzionale: muovi l'elemento insieme al dito, se vuoi
});

emojiButtonElement.addEventListener("touchend", (event) => {
  if (!isDragging) return;
  isDragging = false;
  emojiButtonElement.style.opacity = "1";

  // Recupera la posizione del tocco per capire se è dentro target
  const touch = event.changedTouches[0];
  const dropRect = target.getBoundingClientRect();

  if (
    touch.clientX > dropRect.left &&
    touch.clientX < dropRect.right &&
    touch.clientY > dropRect.top &&
    touch.clientY < dropRect.bottom
  ) {
    target.appendChild(draggedEl!);
    draggedEl = null;
    display.classList.remove("hidden");
    state.textContent = animale.getStatoGenerale();
  }
});

}

// ✅ Funzione principale per interazione con l’animale
export function interact(animale: Animals, container: HTMLElement) {
  const card = container.querySelector(".animal-card") as HTMLElement;
  if (!card) return;

  card.addEventListener("click", () => {
    //al click della card, chiude tutti i pannelli aperti degli altri animali (se il pannello non è nel pannello dell'animale cliccato, rimuovi)
    container.classList.add("blur-effect");
    document.querySelectorAll(".action-panel").forEach((panel) => {
    if (!container.contains(panel)) {
      panel.remove();
    }
 });
    // Chiude immagini aperte di altri animali e ripristina emoji
    document.querySelectorAll(".animal-image").forEach((image) => {
      const parent = image.closest(".animal-container") as HTMLElement;
      if (!container.contains(image)) {
        image.remove();
        const otherCard = parent?.querySelector(".animal-card") as HTMLElement;
        if (otherCard) otherCard.classList.remove("hidden");
      }
    });


 card.classList.add("hidden");
   

 
    // Creo immagine
    const img = document.createElement("img");
    img.src = getAnimalImage(animale);
    img.alt = "immagine animale";
    img.classList.add("animal-image");
    img.style.cursor = "pointer";

    img.addEventListener("click", () => {
      img.remove();
      card.classList.remove("hidden");
      const existingPanel = container.querySelector(".action-panel");
      if (existingPanel) {
        existingPanel.remove();
      }
    }); 
 
 
 container.appendChild(img);
   


  
  //altrimenti crealo
    const actionPanel = document.createElement("div");
    actionPanel.classList.add("action-panel");

    const display = document.createElement("div");
    display.classList.add("interaction-panel");

    const stateDiv = document.createElement("div");
    stateDiv.classList.add("bubble-container");

    const stateContainer = document.createElement("div");
    stateContainer.classList.add("bubble");

    const state = document.createElement("p");
    state.textContent = animale.getStatoGenerale();
    state.classList.add("display-text");

    // Bottoni
    
    const feedButton = document.createElement("button");
    feedButton.textContent = "Mangiare";
    feedButton.classList.add("display-btn");
    feedButton.addEventListener("click", (event) => {
      handleAction(ButtonType.feedButton, animale, container, actionPanel, state, display, () => animale.mangiare(), event.currentTarget as HTMLButtonElement);
    });

    const sleepButton = document.createElement("button");
    sleepButton.textContent = "Dormire";
    sleepButton.classList.add("display-btn");
    sleepButton.addEventListener("click", (event) => {
      handleAction(ButtonType.sleepButton, animale, container, actionPanel, state, display, () => animale.dormire(), event.currentTarget as HTMLButtonElement);
    });

    display.appendChild(feedButton);
    display.appendChild(sleepButton);

    // Lavare se disponibile
    if ("lavare" in animale) {
      const washButton = document.createElement("button");
      washButton.textContent = "Lavare";
      washButton.classList.add("display-btn");
      washButton.addEventListener("click", (event) => {
        handleAction(ButtonType.washButton, animale, container, actionPanel, state, display, () => (animale as Lavabile).lavare(), event.currentTarget as HTMLButtonElement);
      });
      display.appendChild(washButton);
    }

    const cuddleButton = document.createElement("button");
    cuddleButton.textContent = "Coccolare";
    cuddleButton.classList.add("display-btn");
    cuddleButton.addEventListener("click", (event) => {
      handleAction(ButtonType.cuddleButton, animale, container, actionPanel, state, display, () => animale.coccolare(), event.currentTarget as HTMLButtonElement);
    });
    display.appendChild(cuddleButton);


    
    //aggiungiamo il contenitore della nuvoletta al contenitore totale
     actionPanel.appendChild(stateDiv);
   
    //aggiungiamo il contenitore del p e lo stesso p al contenitore della nuvoletta
    stateDiv.appendChild(stateContainer);
    stateContainer.appendChild(state);

  //aggiungiamo il contenitore dei bottoni al contenitore totale
    actionPanel.appendChild(display);

    //aggiungiamo il bottone al contenitore dei bottoni
    display.appendChild(cuddleButton);

     container.appendChild(actionPanel);
 })
}
