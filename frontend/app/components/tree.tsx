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

import type { NodeType } from "~/core/node";

import Button from "~/ui/button";

function iconForNodeType(nodeType: NodeType) {
  const iconMap: Record<NodeType, typeof Circle> = {
    "node-group": Circle,
    scene: Clapperboard,
    loreentity: Box,
  };
  return iconMap[nodeType] ?? Box;
}

export interface StoryNode {
  id: string;
  title: string;
  nodeType: NodeType;
  children: StoryNode[];
}

export default function StoryTree({
  className,
  nodes,
  defaultSelected,
}: {
  className?: string;
  nodes: StoryNode[];
  defaultSelected?: string;
}) {
  const tree = useTreeData({
    initialItems: nodes,
  });

  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (_, items: typeof tree.items) =>
      items.map((item) => ({ "text/plain": item.value.title })),
    onMove: (e: any) => {
      if (e.target.dropPosition === "before") {
        tree.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === "after") {
        tree.moveAfter(e.target.key, e.keys);
      } else if (e.target.dropPosition === "on") {
        // Move items to become children of the target
        let targetNode = tree.getItem(e.target.key);
        if (targetNode && targetNode.value.nodeType === "node-group") {
          let targetIndex = targetNode.children
            ? targetNode.children.length
            : 0;
          let keyArray = Array.from(e.keys) as (string | number)[];
          for (let i = 0; i < keyArray.length; i++) {
            tree.move(keyArray[i], e.target.key, targetIndex + i);
          }
        }
      }
    },
  });

  return (
    <section className={`${className} w-full`}>
      <Button variant="ghost" icon={Plus} className="-ms-2">
        Add node
      </Button>
      <Tree
        className="pt-2
          [&_.react-aria-DropIndicator[data-drop-target]]:outline-1
        [&_.react-aria-DropIndicator[data-drop-target]]:outline-light-or
          [&_.react-aria-DropIndicator[data-drop-target]]:ml-[calc(${(level - 1) * 5} * var(--spacing)]"
        aria-label="Story Tree"
        dragAndDropHooks={dragAndDropHooks}
        items={tree.items}
        defaultExpandedKeys={defaultSelected ? [defaultSelected] : undefined}
      >
        {function renderItem(item): React.ReactNode {
          const Icon = iconForNodeType(item.value.nodeType as NodeType);
          const textColorClass =
            item.value.id === defaultSelected
              ? "text-light-or"
              : "text-current";
          return (
            <TreeItem
              textValue={item.value.title}
              className={`${textColorClass} flex gap-1 flex-row items-center py-1 data-drop-target:outline-2 data-drop-target:outline-light-or rounded-md data-drop-target:outline-offset-1`}
              key={item.value.id}
            >
              <TreeItemContent>
                {({ level, isExpanded, hasChildItems }) => (
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
                    {item.children?.length ? (
                      <Button
                        variant="ghost"
                        slot="chevron"
                        icon={isExpanded ? ChevronDown : ChevronRight}
                        className={`px-0`}
                        isDisabled={!hasChildItems}
                      />
                    ) : null}
                    <Icon
                      size={16}
                      className="text-current"
                      aria-label={item.value.nodeType}
                    />
                    {item.value.title}
                  </>
                )}
              </TreeItemContent>
              {item.children && (
                <Collection items={item.children}>{renderItem}</Collection>
              )}
            </TreeItem>
          );
        }}
      </Tree>
    </section>
  );
}
