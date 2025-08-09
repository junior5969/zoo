
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
});

target.addEventListener("drop", (event) => {
  event.preventDefault();
  if (draggedEl) {
    target.appendChild(draggedEl); // sposto l’emoji nel target
    draggedEl = null;
    state.textContent = animale.getStatoGenerale();
  }
});

  actionPanel.appendChild(emojiButtonElement);


// --- Eventi mobile touch ---
let isDragging = false;

let originalX = 0;
let originalY = 0;

let offsetX = 0;
let offsetY = 0;

emojiButtonElement.addEventListener("touchstart", (event) => {
  isDragging = true;

    draggedEl = emojiButtonElement;

    const rect = draggedEl.getBoundingClientRect(); //Metodo che restituisce un oggetto con informazioni sulla posizione e le dimensioni dell’elemento relative alla viewport
    const touch = event.touches[0];

   offsetX = touch.clientX - rect.left;
   offsetY = touch.clientY - rect.top;

   
  // Salvo posizione originale per rollback
  originalX = rect.left;
  originalY = rect.top;


  draggedEl.style.opacity = "0.5";
  draggedEl.style.position = "absolute";
  draggedEl.style.zIndex = "1000";
  draggedEl.style.left = `${rect.left}px`;
  draggedEl.style.top = `${rect.top}px`;
});

emojiButtonElement.addEventListener("touchmove", (event) => {
  if (!isDragging || !draggedEl) return; // Se non sto trascinando o non c'è elemento da spostare, esci subito
  event.preventDefault(); // Blocca lo scroll/predefinito del browser

  const touch = event.touches[0];           // Prendi la prima posizione del dito (clientX/clientY), questa posizione si aggiorna ad ogni spostamento del dito (quindi mentre si trascina)

  const containerRect = target.getBoundingClientRect(); 

  console.log(draggedEl);
 draggedEl.style.position = "absolute";    // Serve perché left e top funzionino per spostare l'elemento
  draggedEl.style.zIndex = "1000";          // Porta l'elemento sopra tutti gli altri, per visibilità
  draggedEl.style.left = (touch.clientX - containerRect.left - offsetX) + "px";
   draggedEl.style.top = (touch.clientY - containerRect.top - offsetY) + "px";
});


emojiButtonElement.addEventListener("touchend", (event) => {
  if (!isDragging || !draggedEl) return;
  isDragging = false; //Fine del move
 
  //Posizione del tocco per capire se è dentro target
  const touch = event.changedTouches[0]; //Posizione finale 
  const dropRect = target.getBoundingClientRect();

  if (
    touch.clientX > dropRect.left &&
    touch.clientX < dropRect.right &&
    touch.clientY > dropRect.top &&
    touch.clientY < dropRect.bottom
  ) {
    target.appendChild(draggedEl!);
    emojiButtonElement.remove();
    draggedEl = null;
    display.classList.remove("hidden");
    state.textContent = animale.getStatoGenerale();
  } else {
    // Rollback posizione originale se drop fuori target
    draggedEl.style.left = `${originalX}px`;
    draggedEl.style.top = `${originalY}px`;
    draggedEl.style.opacity = "1";
    draggedEl.style.position = "static";
    draggedEl.style.zIndex = "auto";
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
