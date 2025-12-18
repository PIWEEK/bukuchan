import type Node from "./node";

export default interface NodeRepository {
  getById(storyId: string, nodeId: string): Promise<Node>;
  create(storyId: string, node: Node): Promise<Node>;
  update(storyId: string, node: Node): Promise<Node>;
}
