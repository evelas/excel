import { defaultStyles, defaultTableName } from '../constans';

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {}, // {'1:1': 'someText'}
  stylesState: {}, // {'id': {styles}}
  currentText: '',
  currentStyles: defaultStyles,
  tableName: defaultTableName,
  openedDate: new Date().toJSON(),
};

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

export function normalizeInitialState(state) {
  return state ? normalize(state) : defaultState;
}
