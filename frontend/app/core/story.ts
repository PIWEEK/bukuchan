import type User from "./user";

export default class Story {
  readonly id: string;
  #title: string;

  constructor(id: string, title: string) {
    this.id = id;
    this.#title = title;
  }

  get title() {
    return this.#title;
  }
}
