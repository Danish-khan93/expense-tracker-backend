declare global {
  namespace Express {
    interface Request {
      validatedData?: unknown;
      userId: number;
    }
  }
}

export {};
