export type Token = string;

export default interface AuthRepository {
  getToken(userId: string, password: string): Promise<Token | null>;
}
