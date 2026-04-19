export function toSafeErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "unknown_error";
}

export function safeErrorMeta(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
    };
  }
  return { name: "UnknownError", message: "unknown_error" };
}
