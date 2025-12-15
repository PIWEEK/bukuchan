import type { Route } from "./+types/home";
import { Link } from "react-router";
import Heading from "~/ui/heading";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bukuchan" },
    { name: "description", content: "Minimalist creative writing app" },
  ];
}

export default function Home() {
  return (
    <article className="h-full">
      <Heading className="my-6 text-center">Hola!</Heading>
      <p className="text-center text-xl">
        <Link to="/login">Login</Link>
      </p>
    </article>
  );
}
