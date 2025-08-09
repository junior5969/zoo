
import { AnimalInterface } from "../interfaces/animal-interface";
import type { StatoFame, StatoEnergia, StatoIgiene, StatoUmore, AmbientiAcquatici } from "../types";

export abstract class Animals implements AnimalInterface {
  constructor(
    public tipo: string,
    public nome: string,
    public eta: number,
    public fame: StatoFame,
    public energia: StatoEnergia,
    public umore: StatoUmore,
    public igiene?: StatoIgiene,
    public habitat?: AmbientiAcquatici,
  ) {}


mangiare(){
  if (this.fame === "affamato") {
    this.fame = "sazio";
  }
}

dormire(): void {
  if (this.energia === "stanco") {
    this.energia = "a riposo";
  }
}

coccolare(): void {
  if (this.umore === "triste") {
    this.umore = "felice";
  }
}

getStatoGenerale(): string {
  return `${this.nome} è ${this.fame}, ${this.energia}` + (this.igiene ? `, ${this.igiene}` : "")+ ` e ${this.umore}`;
}

}

