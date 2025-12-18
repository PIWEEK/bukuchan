import type NodeRepository from "~/core/node-repository";
import Node from "~/core/node";

const BASE_ENDPOINT = "http://localhost:8000/api";

export class NodeApiRepository implements NodeRepository {
  constructor(private token: string) {
    this.token = token;
  }

  async getById(storyId: string, nodeId: string): Promise<Node> {
    const response = await fetch(
      `${BASE_ENDPOINT}/projects/${storyId}/nodes/${nodeId}`,
      {
        headers: { Authorization: `Token ${this.token}` },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get node");
    }
    const node = await response.json();
    return new Node(`${node.id}`, node.type, node.name, node.text);
  }

  async create(storyId: string, node: Node): Promise<Node> {
    const response = await fetch(`${BASE_ENDPOINT}/projects/${storyId}/nodes`, {
      method: "POST",
      headers: {
        Authorization: `Token ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(node),
    });

    if (!response.ok) {
      throw new Error("Failed to create node");
    }

    const data = await response.json();
    return new Node(`${data.id}`, data.type, data.name, data.text);
  }

  async update(storyId: string, node: Node): Promise<Node> {
    const response = await fetch(
      `${BASE_ENDPOINT}/projects/${storyId}/nodes/${node.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Token ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(node),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update node");
    }

    const data = await response.json();
    return new Node(`${data.id}`, data.type, data.name, data.text);
  }

  async getAll(storyId: string): Promise<Node[]> {
    const response = await fetch(`${BASE_ENDPOINT}/projects/${storyId}/nodes`, {
      headers: { Authorization: `Token ${this.token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to get nodes");
    }

    const data = await response.json();
    return data.map(mapApiNodeToNode);
  }
}

function mapApiNodeToNode(node: any): Node {
  return new Node(
    `${node.id}`,
    node.type,
    node.name,
    node.text,
    node.children?.map(mapApiNodeToNode)
  );
}
