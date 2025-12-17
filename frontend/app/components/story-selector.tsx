import { NotebookPen } from "lucide-react";

import type Story from "~/core/story";

export default function StorySelector({
  stories,
  currentId,
  className,
  onChange,
  ...other
}: {
  stories: Story[];
  currentId: string;
  className?: string;
  onChange?: (id: string) => void;
}) {
  return (
    <div className="flex gap-2 flex-row items-center">
      <NotebookPen size={20} />
      <select
        className={`${className} outline-none focus-visible:ring-2 focus-visible:ring-light-or rounded-md`}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          if (onChange) {
            e.preventDefault();
            onChange(e.currentTarget.value);
          }
        }}
        {...other}
      >
        {stories.map((story) => (
          <option
            key={story.id}
            value={story.id}
            selected={story.id === currentId}
          >
            {story.title}
          </option>
        ))}
      </select>
    </div>
  );
}
