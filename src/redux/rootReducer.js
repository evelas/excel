// pure Functions
import { CHANGE_TEXT, CHANGE_TOOLBAR_STYLES, TABLE_RESIZE } from './actions/types';

export function rootReducer(state, action) {
  let field;
  // console.log('Action:', action);
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      // динамическое значение field обернем []
      return { ...state, [field]: value(state, field, action) };
    case CHANGE_TEXT:
      field = 'dataState';
      return { ...state, currentText: action.data.value, field: value(state, field, action) };
    case CHANGE_TOOLBAR_STYLES:
      return { ...state, currentStyles: action.data };
    default:
      return state;
  }
}

function value(state, field, action) {
  const val = state[field] || {};
  val[action.data.id] = action.data.value;
  return val;
}
