import type Node from "./node";
import type AnalysisData from "./analysis-data"

export default interface NodeRepository {
  getById(storyId: string, nodeId: string): Promise<Node>;
  create(storyId: string, node: Node): Promise<Node>;
  update(storyId: string, node: Node): Promise<Node>;
  analysis(storyId: string, nodeId: string): Promise<AnalysisData>
  getAll(storyId: string): Promise<Node[]>;
}
