import { createContext } from "react";
import type User from "./core/user";

export const userContext = createContext<User | null>(null);
