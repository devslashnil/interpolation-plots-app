import { Dots } from '../../types';

const f = (x: number) => {
  return Math.sin(x) * Math.sqrt(x) + 1;
};

const diff = (dots: number[]): number => {
  if (dots.length > 2) {
    return (
      (diff(dots.slice(1)) - diff(dots.slice(0, dots.length - 1))) /
      (dots[dots.length - 1] - dots[0])
    );
  }
  if (dots.length === 2) return (f(dots[1]) - f(dots[0])) / (dots[1] - dots[0]);
  return 0;
};

const newtonPolynomial = (x: number, points: number[]) => {
  let res = f(points[0]);
  let omega = 1;

  for (let i = 1; i < points.length; i += 1) {
    omega *= x - points[i - 1];
    res += diff(points.slice(0, i + 1)) * omega;
  }

  return res;
};

export default (points: number[]): { baseFunc: Dots; newtonFunc: Dots } => {
  const baseFunc: Dots = [];
  const newtonFunc: Dots = [];

  for (let i = 0; i < 256; i += 1) {
    const x = i / 40;
    newtonFunc.push({
      x,
      y: newtonPolynomial(x, points),
    });
    baseFunc.push({
      x,
      y: f(x),
    });
  }

  return {
    baseFunc,
    newtonFunc,
  };
};
