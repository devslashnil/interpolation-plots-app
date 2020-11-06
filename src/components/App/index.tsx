import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { MainDots } from '../../types';
import LagrangeGraph from '../LagrangeGraph';

import DotsCheckboxGroup from '../DotsCheckboxGroup';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 800,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

const h = Math.PI / 7;

const App: React.FC = () => {
  const [dots, setDots] = useState<MainDots>({
    h05: { checked: true, value: 0.5 * h },
    h15: { checked: true, value: 1.5 * h },
    h25: { checked: true, value: 2.5 * h },
    h45: { checked: true, value: 4.5 * h },
    h65: { checked: true, value: 6.5 * h },
  });
  const classes = useStyles();

  const points = Object.keys(dots)
    .filter((key: string) => dots[key as keyof MainDots].checked)
    .map((key: string) => dots[key as keyof MainDots].value);

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <Typography variant="h3" gutterBottom>
          Интерполяция Лагранжа
        </Typography>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs>
            <Typography>
              Выберите точки через которые проходит интерполяционный многочлен
            </Typography>
            <DotsCheckboxGroup dots={dots} setDots={setDots} />
            <LagrangeGraph points={points} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default App;
