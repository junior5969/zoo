import { Animals } from "./components/class/animal";

import { Cane } from "./components/class/cane";
import { Gatto } from "./components/class/gatto";
import { Criceto } from "./components/class/criceto";
import { Pesce } from "./components/class/pesce";

import { StatoEnergia, StatoFame, StatoIgiene, StatoUmore } from "./components/types";
import { AmbientiAcquatici } from "./components/types";

import {renderAnimalCard, appendToHabitat } from "./components/render"; 
import { interact } from "./components/controller";

import '../style.css';


//creo un tipo personalizzato per tipizzare l'array data
export type AnimalData =
  | { tipo: "Cane" | "Gatto"; nome: string; eta: number; fame: StatoFame; energia: StatoEnergia; igiene: StatoIgiene; umore: StatoUmore; razza: string }
  | { tipo: "Criceto"; nome: string; eta: number; fame: StatoFame; energia: StatoEnergia; igiene: StatoIgiene; umore: StatoUmore; colore: string }
  | { tipo: "Pesce"; nome: string; eta: number; fame: StatoFame; energia: StatoEnergia; umore: StatoUmore; habitat: AmbientiAcquatici };


// Dati
const data: AnimalData[] = [
  { tipo: "Cane", nome: "Fido", eta: 5, fame: "affamato", energia: "stanco", igiene: "sporco", umore: "triste", razza: "Labrador" },
  { tipo: "Cane", nome: "Linc", eta: 8, fame: "affamato", energia: "stanco", igiene: "sporco", umore: "triste", razza: "Bassotto" },
  { tipo: "Cane", nome: "Jimmy", eta: 4, fame: "affamato", energia: "stanco", igiene: "sporco", umore: "triste", razza: "Pitbull" },
  { tipo: "Gatto", nome: "Figaro", eta: 3, fame: "affamato", energia: "stanco", igiene: "sporco", umore: "triste", razza: "Siamese" },
  { tipo: "Criceto", nome: "Cioppi", eta: 2, fame: "affamato", energia: "stanco", igiene: "sporco", umore: "triste", colore: "Dorato" },
  { tipo: "Pesce", nome: "Nemo", eta: 1, fame: "affamato", energia: "stanco", umore: "triste", habitat: "acqua salata" },
  { tipo: "Pesce", nome: "Salmo", eta: 2, fame: "affamato", energia: "stanco", umore: "triste", habitat: "acqua dolce" },
];

// creo le istanze
const animali: Animals[] = data.map(info => {
  switch (info.tipo) {
    case "Cane":
      return new Cane(info.tipo, info.nome, info.eta, info.fame, info.energia, info.umore, info.igiene, info.razza);
    case "Gatto":
      return new Gatto(info.tipo, info.nome, info.eta, info.fame, info.energia, info.umore, info.igiene, info.razza);
    case "Criceto":
      return new Criceto(info.tipo, info.nome, info.eta, info.fame, info.energia, info.umore, info.igiene, info.colore);
    case "Pesce":
      return new Pesce(info.tipo, info.nome, info.eta, info.fame, info.energia, info.umore, info.habitat);
    default:
      throw new Error("Tipo di animale non gestito");
  }
});

// Per ogni animale: crea card e appendila nel DOM
animali.forEach(animale => {
  const card = renderAnimalCard(animale);    // genera il DOM element
  appendToHabitat(animale, card);  
  interact(animale, card);         // posiziona nel DOM
});