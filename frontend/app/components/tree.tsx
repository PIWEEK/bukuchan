import { Button, Tree, TreeItem, TreeItemContent } from "react-aria-components";
import type {
  TreeItemContentProps,
  TreeItemContentRenderProps,
} from "react-aria-components";

import { Info, GripVertical } from "lucide-react";

function MyTreeItemContent(
  props: { children?: React.ReactNode } & TreeItemContentProps
) {
  return (
    <TreeItemContent>
      {({ allowsDragging }: TreeItemContentRenderProps) => (
        <>
          {allowsDragging && (
            <Button slot="drag">
              <GripVertical size={18} />
            </Button>
          )}
          <Button slot="chevron">
            <svg viewBox="0 0 24 24">
              <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </Button>
          {props.children}
        </>
      )}
    </TreeItemContent>
  );
}

export default function DocumentTree() {
  return (
    <Tree
      aria-label="Files"
      style={{ height: "300px" }}
      defaultExpandedKeys={["documents", "photos", "project"]}
      selectionMode="multiple"
      defaultSelectedKeys={["photos"]}
    >
      <TreeItem id="documents" textValue="Documents">
        <MyTreeItemContent>
          Documents
          <Button aria-label="Info">
            <Info size={20} />
          </Button>
        </MyTreeItemContent>
        <TreeItem id="project" textValue="Project">
          <MyTreeItemContent>
            Project
            <Button aria-label="Info">
              <Info size={20} />
            </Button>
          </MyTreeItemContent>
          <TreeItem id="report" textValue="Weekly Report">
            <MyTreeItemContent>
              Weekly Report
              <Button aria-label="Info">
                <Info size={20} />
              </Button>
            </MyTreeItemContent>
          </TreeItem>
        </TreeItem>
      </TreeItem>
      <TreeItem id="photos" textValue="Photos">
        <MyTreeItemContent>
          Photos
          <Button aria-label="Info">
            <Info size={20} />
          </Button>
        </MyTreeItemContent>
        <TreeItem id="one" textValue="Image 1">
          <MyTreeItemContent>
            Image 1
            <Button aria-label="Info">
              <Info size={20} />
            </Button>
          </MyTreeItemContent>
        </TreeItem>
        <TreeItem id="two" textValue="Image 2">
          <MyTreeItemContent>
            Image 2
            <Button aria-label="Info">
              <Info size={20} />
            </Button>
          </MyTreeItemContent>
        </TreeItem>
      </TreeItem>
    </Tree>
  );
}
