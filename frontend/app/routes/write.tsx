import type { Route } from "./+types/write";
import Heading from "~/ui/heading";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bukuchan" },
    { name: "description", content: "Minimalist creative writing app" },
  ];
}

export default function Write() {
  return (
    <article>
      <Heading>Welcome back!</Heading>
    </article>
  );
}
