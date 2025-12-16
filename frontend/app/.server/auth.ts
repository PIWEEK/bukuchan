import User from "~/core/user";
import type AuthRepository from "~/core/auth-repository";
import type { Token } from "~/core/auth-repository";

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

export async function getUserFromSession(
  request: Request
): Promise<User | null> {
  const cookie = request.headers.get("Cookie");
  if (!cookie) {
    return null;
  }

  const token = cookie
    .split(";")
    .find((c) => c.trim().startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    return null;
  }

  const user = verifyToken(token);
  if (!user) {
    return null;
  }

  return user;
}

export function verifyToken(token: string): User | null {
  // FIXME: Implement token verification
  if (token) {
    return new User("benko");
  }

  return null;
}
