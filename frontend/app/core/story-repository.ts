import type User from "./user";
import type Story from "./story";

export default interface StoryRepository {
  add(title: string): Promise<Story>;
  getById(id: string): Promise<Story>;
  getAll(): Promise<Story[]>;
}
