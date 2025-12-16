import User, { type Token } from "./user";

export default interface UserRepository {
  get(): Promise<User | null>;
}
