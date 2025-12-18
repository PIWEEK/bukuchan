import type NodeRepository from "./node-repository";
import type Node from "./node";

export default class GetAllNodesUseCase {
  constructor(private nodeRepository: NodeRepository) {}

  async execute(storyId: string): Promise<Node[]> {
    return this.nodeRepository.getAll(storyId);
  }
}
