import type User from "~/core/user";
import type StoryRepository from "~/core/story-repository";
import Story from "~/core/story";

// FIXME: Implement API communication logic to avoid this
const stories = new Map<string, { user: User; story: Story }>();

export class StoryApiRepository implements StoryRepository {
  async add(user: User, title: string): Promise<Story> {
    const id = crypto.randomUUID();
    // FIXME: Implement API call to create story
    const story = new Story(id, title);
    stories.set(id, { user, story });

    return story;
  }

  async getById(id: string): Promise<Story | null> {
    const story = stories.get(id);
    return story?.story ?? null;
  }
}
