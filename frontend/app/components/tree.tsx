import {
  Tree,
  TreeItem,
  TreeItemContent,
  useDragAndDrop,
  Collection,
  useTreeData,
} from "react-aria-components";

import {
  Plus,
  Circle,
  ChevronDown,
  ChevronRight,
  GripVertical,
  Clapperboard,
  Box,
} from "lucide-react";

import Button from "~/ui/button";

// FIXME: this should be somewhere else
type StoryNode = {
  id: string;
  title: string;
  nodeType: "group" | "scene" | "lore-entity";
  children?: StoryNode[];
};

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
  const tree = useTreeData<StoryNode>({
    initialItems: [
      {
        id: "001",
        title: "Draft",
        nodeType: "group",
        children: [
          {
            id: "004",
            title: "Act I",
            nodeType: "group",
            children: [
              {
                id: "002",
                title: "Catalyst",
                nodeType: "scene",
              },
            ],
          },
        ],
      },
      {
        id: "003",
        title: "Characters",
        nodeType: "group",
        children: [
          {
            id: "005",
            title: "Bilbo",
            nodeType: "lore-entity",
          },
          {
            id: "006",
            title: "Gandalf",
            nodeType: "lore-entity",
          },
        ],
      },
    ],
  });

  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys, items: typeof tree.items) =>
      items.map((item) => ({ "text/plain": item.value.title })),
    onMove: (e: any) => {
      console.log(e);
      console.log("drop position", e.target.dropPosition);
    },
  });

  return (
    <section className={`${className} w-full`}>
      <Button variant="ghost" icon={Plus} className="-ms-2">
        Add node
      </Button>
      <Tree
        className="pt-2"
        aria-label="Story Tree"
        dragAndDropHooks={dragAndDropHooks}
        items={tree.items}
        defaultExpandedKeys={["001", "003"]}
      >
        {function renderItem(
          item: (typeof tree.items)[number]
        ): React.ReactNode {
          if (item.value.nodeType === "group") {
            return (
              <CollapsibleItem
                id={item.value.id}
                title={item.value.title}
                icon={Circle}
              >
                <Collection items={item.children ?? []}>
                  {renderItem}
                </Collection>
              </CollapsibleItem>
            );
          }

          const icon = item.value.nodeType === "scene" ? Clapperboard : Box;

          return (
            <TerminalItem
              id={item.value.id}
              title={item.value.title}
              icon={icon}
            />
          );
        }}
      </Tree>
    </section>
  );
}
