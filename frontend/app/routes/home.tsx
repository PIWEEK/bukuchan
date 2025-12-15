import type { Route } from "./+types/home";
import { Link } from "react-router";
import { BookHeart } from "lucide-react";

import Heading from "~/ui/heading";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bukuchan" },
    { name: "description", content: "Minimalist creative writing app" },
  ];
}

export default function Home() {
  return (
    <article className="h-full grid place-content-center">
      <BookHeart
        strokeWidth={1.0}
        className="w-64 h-64 text-center mx-auto py-6"
      />
      <Heading className="my-6 text-center">Hola!</Heading>
      <p className="text-center text-xl">
        <Link to="/login">Login</Link>
      </p>
    </article>
  );
}
