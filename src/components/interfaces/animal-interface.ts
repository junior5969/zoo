
import { StatoFame, StatoEnergia } from "../types";

export interface AnimalInterface {
    tipo : string;
    nome : string;
    eta : number;
    fame: StatoFame;
    energia: StatoEnergia;
}


export interface Lavabile {
  lavare(): void;
}