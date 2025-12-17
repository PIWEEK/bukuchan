import { DocumentTree } from "~/ui";
import Editor from "~/components/editor";

export default function Story() {
  return (
    <article className="grid w-full grid-cols-[auto_1fr] gap-8 py-8">
      <aside className="h-full px-6">
        <DocumentTree></DocumentTree>
      </aside>

      <section className="h-full px-6 mx-auto container">
        <Editor />
      </section>
    </article>
  );
}
