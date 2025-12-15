import { CircleX } from "lucide-react";

export default function Message({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={`text-red-500 dark:text-red-300 grid gap-2 grid-cols-[auto_1fr] border-current border-2 p-2 rounded-md ${className}`}
    >
      <CircleX className="w-6 h-6" />
      <div>{children}</div>
    </article>
  );
}
