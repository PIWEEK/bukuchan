import User from "~/core/user";
import type UserRepository from "~/core/user-repository";

const BASE_ENDPOINT = "http://localhost:8000/api";

export type Token = string;

export class UserApiRepository implements UserRepository {
  constructor(private token: Token) {
    this.token = token;
  }

  async get(): Promise<User | null> {
    const response = await fetch(`${BASE_ENDPOINT}/profile`, {
      headers: {
        Authorization: `Token ${this.token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (!data?.username) {
      return null;
    }

    return new User(data.username);
  }
}
