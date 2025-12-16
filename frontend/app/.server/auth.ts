import User, { type Token } from "~/core/user";
import type AuthRepository from "~/core/auth-repository";
import { UserApiRepository } from "./user";

const BASE_ENDPOINT = "http://localhost:8000/api";

export class AuthApiRepository implements AuthRepository {
  async getToken(userId: string, password: string): Promise<Token | null> {
    const response = await fetch(`${BASE_ENDPOINT}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: userId, password }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (!data?.token) {
      return null;
    }

    return data.token;
  }
}

export async function getTokenFromSession(
  request: Request
): Promise<Token | null> {
  const cookie = request.headers.get("Cookie");
  if (!cookie) {
    return null;
  }

  const token = cookie
    .split(";")
    .find((c) => c.trim().startsWith("token="))
    ?.split("=")[1];

  return token ?? null;
}

export async function getSession(
  request: Request
): Promise<{ user: User; token: Token } | null> {
  const token = await getTokenFromSession(request);

  if (!token) {
    return null;
  }

  const userRepository = new UserApiRepository(token);
  const user = await userRepository.get();
  if (!user) {
    return null;
  }

  return { user, token };
}
