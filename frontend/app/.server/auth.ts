import User from "~/core/user";

export async function verifyUser(
  userId: string,
  password: string
): Promise<User | null> {
  // FIXME: Implement user verification
  if (userId === "benko" && password === "1234test") {
    return new User("benko");
  }

  return null;
}

export function createToken(user: User): string {
  // FIXME: Implement token creation

  if (user.id === "benko") {
    return "1234";
  }

  return "0000";
}

export function verifyToken(token: string): User | null {
  // FIXME: Implement token verification
  if (token === "1234") {
    return new User("benko");
  }

  return null;
}
