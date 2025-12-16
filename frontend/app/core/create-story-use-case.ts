import type User from "./user";
import type StoryRepository from "./story-repository";

export default class CreateStoryUseCase {
  constructor(private storyRepository: StoryRepository) {}

  async execute(user: User, title: string) {
    return this.storyRepository.add(user, title);
  }
}
