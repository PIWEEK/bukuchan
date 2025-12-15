import type { Route } from "./+types/login";
import LoginForm from "~/components/login-form";

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "Bukuchan" },
//     { name: "description", content: "Minimalist creative writing app" },
//   ];
// }

export default function Login() {
  return <LoginForm />;
}
