import { CircleX } from "lucide-react";

const levels = {
  error: {
    color: "text-red-500 dark:text-red-300",
    icon: CircleX,
  },
};

export default function Message({
  children,
  level = "error",
  className,
}: {
  children: React.ReactNode;
  className?: string;
  level?: keyof typeof levels;
}) {
  const { color, icon: Icon } = levels[level];

  return (
    <article
      className={`text-red-500 dark:text-red-300 grid gap-2 grid-cols-[auto_1fr] border-current border-2 p-2 rounded-md ${className}`}
    >
      <Icon className="w-6 h-6" />
      <div>{children}</div>
    </article>
  );
}
