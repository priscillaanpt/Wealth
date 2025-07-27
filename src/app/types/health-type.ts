export type TransformedPrograms =
  | ({
      HelthPlan: {
        need: number;
        own: number;
      }[];
      programType: {
        name: string;
        id: string;
      };
    } & {
      id: string;
      hospitalId: string;
      programTypeId: string;
    }[])
  | undefined;
