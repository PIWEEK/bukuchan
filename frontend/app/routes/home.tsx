import type { Route } from "./+types/home";
import LoginForm from "~/components/login-form";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bukuchan" },
    { name: "description", content: "Minimalist creative writing app" },
  ];
}

export default function Home() {
  return (
    <>
      <LoginForm />
    </>
  );
}
