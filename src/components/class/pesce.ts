
import { Animals } from "./animal";
import type { StatoFame, StatoEnergia, StatoUmore, AmbientiAcquatici } from "../types";

export class Pesce extends Animals {
  
    constructor (
        tipo : string,
        nome : string,
        eta : number, 
        fame: StatoFame, 
        energia: StatoEnergia,
        umore: StatoUmore, 
        public habitat: AmbientiAcquatici
    ) {
    super(tipo, nome, eta, fame, energia, umore);

     this.habitat=habitat;
}

}