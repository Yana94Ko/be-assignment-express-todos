export type BallangResponse<D> =
  | {
      success: true;
      result: D;
      error: null;
    }
  | {
      success: false;
      result: null;
      error: {
        message: string;
      };
    };
