import type AuthRepository from "./auth-repository";
export default class LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(userId: string, password: string) {
    return this.authRepository.getToken(userId, password);
  }
}
