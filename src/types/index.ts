export type Dots = { x: number; y: number }[];

export type MainDotsKeys = 'h05' | 'h15' | 'h25' | 'h45' | 'h65';

export type MainDots = Record<
  MainDotsKeys,
  {
    checked: boolean;
    value: number;
  }
>;
