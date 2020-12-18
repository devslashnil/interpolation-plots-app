import React, { Fragment } from 'react';
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryContainer,
  VictoryLegend,
} from 'victory';
import newtonFuncs from './newtonFuncs';

type Props = {
  points: number[];
};

const NewtonGraph: React.FC<Props> = ({ points }) => {
  const { newtonFunc, baseFunc } = newtonFuncs(points);

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
              symbol: { fill: 'blue' },
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
          data={newtonFunc}
          animate={{ duration: 1500 }}
          style={{
            data: {
              stroke: 'blue',
            },
          }}
        />
      </VictoryChart>
    </>
  );
};

export default NewtonGraph;
