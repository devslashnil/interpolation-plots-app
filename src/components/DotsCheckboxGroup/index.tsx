import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { GreenCheckbox } from '../StyledElems';
import { MainDots, MainDotsKeys } from '../../types';

const dotsDict: Record<MainDotsKeys, string> = {
  h05: '0.5 * h',
  h15: '1.5 * h',
  h25: '2.5 * h',
  h45: '4.5 * h',
  h65: '6.5 * h',
};

type Props = {
  dots: MainDots;
  setDots: React.Dispatch<React.SetStateAction<MainDots>>;
};

const DotsCheckboxGroup: React.FC<Props> = ({ dots, setDots }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDots({
      ...dots,
      [event.target.name]: {
        ...dots[event.target.name as MainDotsKeys],
        checked: event.target.checked,
      },
    });
  };

  return (
    <FormGroup row>
      {Object.keys(dots).map((key: string) => (
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={dots[key as MainDotsKeys].checked as boolean}
              onChange={handleChange}
              name={key}
            />
          }
          label={dotsDict[key as MainDotsKeys]}
        />
      ))}
    </FormGroup>
  );
};

export default DotsCheckboxGroup;
