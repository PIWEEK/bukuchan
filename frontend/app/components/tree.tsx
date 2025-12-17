import { Tree, TreeItem, TreeItemContent } from "react-aria-components";
import Button from "~/ui/button";

import {
  Plus,
  Circle,
  ChevronDown,
  ChevronRight,
  GripVertical,
  Clapperboard,
  Box,
} from "lucide-react";

function CollapsibleItem({
  id,
  title,
  children,
  icon: Icon,
}: {
  id: string;
  title: string;
  icon: React.ElementType;
  children?: React.ReactNode;
}) {
  return (
    <TreeItem
      textValue={title}
      className="flex gap-1 flex-row items-center py-1"
      id={id}
    >
      <TreeItemContent>
        {({ isExpanded, hasChildItems, level }) => (
          <>
            <Button
              slot="drag"
              icon={GripVertical}
              variant="ghost"
              style={{
                marginInlineStart: `calc(${(level - 1) * 5} * var(--spacing)`,
              }}
              className="px-0"
            />
            <Button
              variant="ghost"
              slot="chevron"
              icon={isExpanded ? ChevronDown : ChevronRight}
              className={`px-0`}
              isDisabled={!hasChildItems}
            />
            <Icon size={16} className="text-current" aria-label="Group" />
            {title}
          </>
        )}
      </TreeItemContent>
      {children}
    </TreeItem>
  );
}

export function TerminalItem({
  id,
  title,
  icon: Icon,
}: {
  id: string;
  title: string;
  icon: React.ElementType;
}) {
  return (
    <TreeItem
      textValue={title}
      className="flex gap-1 flex-row items-center py-1"
      id={id}
    >
      <TreeItemContent>
        {({ level }) => (
          <>
            <Button
              slot="drag"
              icon={GripVertical}
              variant="ghost"
              className="px-0"
              style={{
                marginInlineStart: `calc(${(level - 1) * 5} * var(--spacing)`,
              }}
            />
            <Icon size={16} className="text-current" aria-label="Group" />
            {title}
          </>
        )}
      </TreeItemContent>
    </TreeItem>
  );
}

export default function StoryTree({ className }: { className?: string }) {
  return (
    <section className={`${className} w-full`}>
      <Button variant="ghost" icon={Plus} className="-ms-2">
        Add node
      </Button>
      <Tree className="pt-2" aria-label="Story Tree">
        <CollapsibleItem id="001" title="Draft" icon={Circle}>
          <CollapsibleItem id="004" title="Act I" icon={Circle}>
            <TerminalItem title="Catalyst" id="002" icon={Clapperboard} />
          </CollapsibleItem>
        </CollapsibleItem>
        <CollapsibleItem id="003" title="Characters" icon={Circle}>
          <TerminalItem id="005" title="Bilbo" icon={Box} />
          <TerminalItem id="006" title="Gandalf" icon={Box} />
        </CollapsibleItem>
      </Tree>
    </section>
  );
}
