import { storage } from '@core/utils';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {'1:1': 'someText'}
  currentText: '',
};
export const initialState = storage('excel-state') ? storage('excel-state') : defaultState;
