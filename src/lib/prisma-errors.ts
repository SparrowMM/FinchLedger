type PrismaLikeError = {
  code?: string;
  message?: string;
};

export function isPrismaCode(error: unknown, code: string): boolean {
  return (error as PrismaLikeError | null)?.code === code;
}

export function isTableMissingError(error: unknown): boolean {
  return isPrismaCode(error, "P2021");
}
