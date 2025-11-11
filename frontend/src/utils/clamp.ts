export const clamp = (v: number, minVal: number, maxVal: number) => {
  return Math.min(Math.max(v, minVal), maxVal);
};
