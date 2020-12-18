import { Dots } from '../../types';

const H = Math.PI / 7;

const points = [0, 0.5 * H, 1.5 * H, 2.5 * H, 4.5 * H, 6.5 * H, 7 * H];

const n = points.length;

const f = (x: number) => {
  return Math.sin(x) * Math.sqrt(x) + 1;
};

const a = [0];
const b = [0];
const c = [0];
const d = [0];
const h = [0];

for (let i = 1; i < n; i += 1) {
  h[i] = points[i] - points[i - 1];
}

for (let i = 1; i < n - 1; i += 1) {
  a[i] = h[i] / (h[i] + h[i + 1]);
}

for (let i = 1; i < n - 1; i += 1) {
  b[i] = -2;
}

for (let i = 1; i < n - 1; i += 1) {
  c[i] = h[i + 1] / (h[i] + h[i + 1]);
}

for (let i = 1; i < n - 1; i += 1) {
  d[i] =
    (6 *
      ((f(points[i + 1]) - f(points[i])) / h[i + 1] -
        (f(points[i]) - f(points[i - 1])) / h[i])) /
    (points[i + 1] - points[i - 1]);
}

const m = [0];
const coefficients = [
  { s: 0, t: 0 },
  { s: c[1] / b[1], t: -d[1] / b[1] },
];

for (let i = 2; i < n - 1; i += 1) {
  coefficients[i] = {
    s: c[i] / (b[i] - coefficients[i - 1].s),
    t:
      (a[i] * coefficients[i - 1].t - d[i]) /
      (b[i] - coefficients[i - 1].s * a[i]),
  };
}

for (let i = n - 2; i > 0; i -= 1) {
  if (i === n - 2) {
    m[i + 1] = 0;
    m[i] = coefficients[i].t;
  } else {
    m[i] = coefficients[i].s * m[i + 1] + coefficients[i].t;
  }
}

function cubicPolynomial(x: number, i: number) {
  // i = 1,2 ... n
  return (
    (m[i - 1] * (points[i] - x) ** 3) / (6 * h[i]) +
    (m[i] * (-points[i - 1] + x) ** 3) / (6 * h[i]) +
    (f(points[i - 1]) - (m[i - 1] * h[i] * h[i]) / 6) *
      ((points[i] - x) / h[i]) +
    (f(points[i]) - (m[i] * h[i] * h[i]) / 6) * ((-points[i - 1] + x) / h[i])
  );
}

function getPointsOfPolynomial(index: number) {
  const res = [];
  for (
    let i = Math.round(points[index - 1] * 20);
    i <= Math.round(points[index] * 20);
    i += 1
  ) {
    const x = i / 20;
    res.push({
      x,
      y: cubicPolynomial(x, index),
    });
  }
  return res;
}

export const spline = [];

export default (): { baseFunc: Dots; splineFunc: Dots } => {
  const baseFunc: Dots = [];
  let splineFunc: Dots = [];

  for (let i = 1; i < n; i += 1) {
    splineFunc = [...splineFunc, ...getPointsOfPolynomial(i)];
  }

  for (let i = 0; i < 256; i += 1) {
    const x = i / 40;
    baseFunc.push({
      x,
      y: f(x),
    });
  }

  return {
    baseFunc,
    splineFunc,
  };
};
