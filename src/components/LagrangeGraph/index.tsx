import React, { Fragment } from 'react';
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryContainer,
  VictoryLegend,
} from 'victory';
import lagrangeFuncs from './lagrangeFuncs';

type Props = {
  points: number[];
};

const LagrangeGraph: React.FC<Props> = ({ points }) => {
  const { lagrangeFunc, basisFuncs, baseFunc } = lagrangeFuncs(points);

  return (
    <>
      <VictoryChart
        maxDomain={{ x: 8, y: 8 }}
        minDomain={{ x: 0, y: -8 }}
        theme={VictoryTheme.material}
        containerComponent={<VictoryContainer responsive={false} />}
        width={800}
        height={800}
      >
        <VictoryLegend
          x={50}
          y={50}
          orientation="vertical"
          gutter={20}
          data={[
            {
              name: 'График функции',
              symbol: { fill: 'red' },
              labels: { fill: 'black' },
            },
            {
              name: 'График интерполяционного многочлена',
              symbol: { fill: 'green' },
              labels: { fill: 'black' },
            },
            {
              name: 'Базисная функция 1',
              symbol: { fill: '#FF7F50' },
              labels: { fill: 'black' },
            },
            {
              name: 'Базисная функция 2',
              symbol: { fill: '#FFB6C1' },
              labels: { fill: 'black' },
            },
            {
              name: 'Базисная функция 3',
              symbol: { fill: '#CD853F' },
              labels: { fill: 'black' },
            },
            {
              name: 'Базисная функция 4',
              symbol: { fill: 'maroon' },
              labels: { fill: 'black' },
            },
            {
              name: 'Базисная функция 5',
              symbol: { fill: '#008B8B' },
              labels: { fill: 'black' },
            },
          ]}
        />
        <VictoryLine
          data={baseFunc}
          animate={{ duration: 1500 }}
          style={{
            data: {
              stroke: 'red',
            },
          }}
        />
        <VictoryLine
          data={lagrangeFunc}
          animate={{
            duration: 1500,
          }}
          style={{
            data: {
              stroke: 'green',
            },
          }}
        />
        <VictoryLine
          data={basisFuncs[0]}
          animate={{
            duration: 1500,
          }}
          style={{
            data: {
              stroke: '#FF7F50',
            },
          }}
        />
        <VictoryLine
          data={basisFuncs[1]}
          animate={{
            duration: 1500,
          }}
          style={{
            data: {
              stroke: '#FFB6C1',
            },
          }}
        />
        <VictoryLine
          data={basisFuncs[2]}
          animate={{
            duration: 1500,
          }}
          style={{
            data: {
              stroke: '#CD853F',
            },
          }}
        />
        <VictoryLine
          data={basisFuncs[3]}
          animate={{
            duration: 1500,
          }}
          style={{
            data: {
              stroke: 'maroon',
            },
          }}
        />
        <VictoryLine
          data={basisFuncs[4]}
          animate={{
            duration: 1500,
          }}
          style={{
            data: {
              stroke: '#008B8B',
            },
          }}
        />
      </VictoryChart>
    </>
  );
};

export default LagrangeGraph;
