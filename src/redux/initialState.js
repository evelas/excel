import { storage } from '@core/utils';
import { defaultStyles } from '../constans';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {'1:1': 'someText'}
  currentText: '',
  currentStyles: defaultStyles,
};
export const initialState = storage('excel-state') ? storage('excel-state') : defaultState;
