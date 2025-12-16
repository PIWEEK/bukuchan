import type User from "./user";
import type StoryRepository from "./story-repository";

export default class CreateStoryUseCase {
  constructor(private storyRepository: StoryRepository) {}

  async execute(title: string) {
    return this.storyRepository.add(title);
  }
}
