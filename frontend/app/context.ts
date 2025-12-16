import { createContext } from "react-router";
import type User from "./core/user";

export const userContext = createContext<{
  user: User;
  token: string;
} | null>(null);
