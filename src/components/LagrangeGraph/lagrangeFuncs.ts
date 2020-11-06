import { Dots } from '../../types';

const f = (x: number) => {
  return Math.sin(x) * Math.sqrt(x) + 1;
};

export default (
  points: number[],
): { baseFunc: Dots; lagrangeFunc: Dots; basisFuncs: Dots[] } => {
  const baseFunc: Dots = [];
  const lagrangeFunc: Dots = [];
  const n = points.length;
  const basisFuncs: Dots[] = [[], [], [], [], []];

  for (let i = 0; i < 500; i += 1) {
    const x = (i * Math.PI) / 100; // вычисление по точке от начала координат реальной координаты}
    let yL = 0;
    for (let j = 0; j < n; j += 1) {
      let yB = 1;
      for (let k = 0; k < n; k += 1) {
        if (j !== k) {
          yB = (yB * (x - points[k])) / (points[j] - points[k]); // базисные вещи
        }
      }
      basisFuncs[j].push({
        x,
        y: yB,
      });

      yL += yB * f(points[j]);
    }
    baseFunc.push({
      x,
      y: f(x),
    });
    lagrangeFunc.push({
      x,
      y: yL,
    }); // трисовка базисных функций}
  }
  return {
    baseFunc,
    lagrangeFunc,
    basisFuncs,
  };
};
