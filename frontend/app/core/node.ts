export type NodeType = "scene" | "loreentity" | "node-group";

export default class Node {
  readonly id: string;
  readonly nodeType: NodeType;
  readonly name: string;
  readonly text: string;
  readonly children: Node[] = [];

  constructor(
    id: string,
    nodeType: NodeType,
    name: string,
    text: string,
    children: Node[] = []
  ) {
    this.id = id;
    this.nodeType = nodeType;
    this.name = name;
    this.text = text;
    this.children = children;
  }
}
