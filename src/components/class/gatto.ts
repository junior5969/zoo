
import { Animals } from "./animal.js";
import { Lavabile } from "../interfaces/animal-interface.js";
import type { StatoFame, StatoEnergia, StatoIgiene, StatoUmore } from "../types.js";

export class Gatto extends Animals implements Lavabile {

    constructor (
        tipo : string,
        nome : string,
        eta : number, 
        fame: StatoFame, 
        energia: StatoEnergia,
        umore: StatoUmore, 
        igiene: StatoIgiene, 
        public razza: string
    ) {
    super(tipo, nome, eta, fame, energia, umore, igiene);
}

lavare(): void {
  if (this.igiene === "sporco") {
    this.igiene = "pulito";
  }
} 
}