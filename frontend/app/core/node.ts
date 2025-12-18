export default class Node {
  readonly id: string;
  readonly type: 'scene' | 'lore-entity' | 'node-group';
  readonly name: string;
  readonly text: string;

  constructor(
    id: string,
    type: 'scene' | 'lore-entity' | 'node-group',
    name: string,
    text: string,
  ) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.text = text;
  }
}
