import type User from "./user";
import type Story from "./story";

export default interface StoryRepository {
  add(user: User, title: string): Promise<Story>;
  getById(id: string): Promise<Story | null>;
}
