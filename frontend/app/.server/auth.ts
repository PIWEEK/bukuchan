import { redirect } from "react-router";
import User from "~/core/user";

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

type Token = string;

export async function verifyUser(
  userId: string,
  password: string
): Promise<Token | null> {
  // FIXME: Implement user verification
  if (userId === "benko" && password === "1234test") {
    const user = new User("benko");
    return createToken(user);
  }

  return null;
}

export function verifyToken(token: string): User | null {
  // FIXME: Implement token verification
  if (token === "1234") {
    return new User("benko");
  }

  return null;
}

function createToken(user: User): string {
  // FIXME: Implement token creation

  if (user.id === "benko") {
    return "1234";
  }

  return "0000";
}
