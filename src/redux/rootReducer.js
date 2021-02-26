// pure Functions
import { TABLE_RESIZE } from './actions/types';

export function rootReducer(state, action) {
  let prevState;
  let field;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      prevState = state[field] || {};
      prevState[action.data.id] = action.data.value;
      // динамическое значение field обернем []
      return { ...state, [field]: prevState };
    default:
      return state;
  }
}
