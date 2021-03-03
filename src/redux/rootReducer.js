// pure Functions
import {
  APPLY_STYLE,
  CHANGE_TABLE_NAME,
  CHANGE_TEXT,
  CHANGE_TOOLBAR_STYLES,
  TABLE_RESIZE,
} from './actions/types';

export function rootReducer(state, action) {
  let field;
  let val;
  // console.log('Action:', action);
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      // динамическое значение field обернем []
      return { ...state, [field]: value(state, field, action) };
    case CHANGE_TEXT:
      field = 'dataState';
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action),
      };
    case CHANGE_TOOLBAR_STYLES:
      return { ...state, currentStyles: action.data };
    case APPLY_STYLE:
      field = 'stylesState';
      // сохраняем
      // получаем объект прошлого состояния
      val = state[field] || {};
      action.data.ids.forEach((id) => {
        val[id] = { ...val[id], ...action.data.value };
      });
      return {
        ...state,
        [field]: val,
        currentStyles: { ...state.currentStyles, ...action.data.value },
      };
    case CHANGE_TABLE_NAME:
      field = 'tableName';
      return {
        ...state,
        [field]: action.data.name,
      };
    default:
      return state;
  }
}

function value(state, field, action) {
  const val = state[field] || {};
  val[action.data.id] = action.data.value;
  return val;
}
