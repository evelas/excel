import { storage } from '@core/utils';
import { defaultStyles, defaultTableName } from '../constans';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {'1:1': 'someText'}
  stylesState: {}, // {'id': {styles}}
  currentText: '',
  currentStyles: defaultStyles,
  tableName: defaultTableName,
};

export const initialState = storage('excel-state') ? storage('excel-state') : defaultState;
