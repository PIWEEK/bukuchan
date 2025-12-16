import type { Route } from "./+types/index";
import { Link } from "react-router";
import { Button, Editor } from "~/ui";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bukuchan" },
    { name: "description", content: "Minimalist creative writing app" },
  ];
}

export default function DashboardIndex() {
  return (
    <article className="grid gap-4 h-full">
      <Editor></Editor>
      {/*}
      <p>You have no stories yet.</p>
      <p>
        <Button to="/dashboard/new-story">Create a new story</Button>
      </p>
      {*/}
    </article>
  );
}
