import type StoryRepository from "~/core/story-repository";
import Story from "~/core/story";

const BASE_ENDPOINT = "http://localhost:8000/api";

export class StoryApiRepository implements StoryRepository {
  constructor(private token: string) {
    this.token = token;
  }
  async getAll(): Promise<Story[]> {
    const response = await fetch(`${BASE_ENDPOINT}/projects`, {
      headers: {
        Authorization: `Token ${this.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get stories");
    }

    const data = await response.json();
    return data.map((story: any) => {
      if (!story.id || !story.title) {
        throw new Error("Invalid story data");
      }
      return new Story(`${story.id}`, story.title);
    });
  }

  async add(title: string): Promise<Story> {
    const response = await fetch(`${BASE_ENDPOINT}/projects`, {
      method: "POST",
      headers: {
        Authorization: `Token ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description: "Once upon a time…" }),
    });

    if (!response.ok) {
      throw new Error("Failed to create story");
    }

    const data = await response.json();

    if (!data.id || !data.title) {
      throw new Error("Invalid story data");
    }

    return new Story(`${data.id}`, data.title);
  }

  async getById(id: string): Promise<Story> {
    // const story = stories.get(id);
    // return story?.story ?? null;
    return new Story("1235", "Title");
  }
}
