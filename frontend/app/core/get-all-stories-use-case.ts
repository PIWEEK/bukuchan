import type StoryRepository from "./story-repository";
import type Story from "./story";

export default class GetAllStoriesUseCase {
  constructor(private storyRepository: StoryRepository) {}

  async execute(): Promise<Story[]> {
    return this.storyRepository.getAll();
  }
}
