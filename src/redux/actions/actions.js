import {
  APPLY_STYLE,
  CHANGE_TABLE_NAME,
  CHANGE_TEXT,
  CHANGE_TOOLBAR_STYLES,
  TABLE_RESIZE,
  UPDATE_DATE,
} from './types';

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  };
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  };
}

export function changeStyles(data) {
  return {
    type: CHANGE_TOOLBAR_STYLES,
    data,
  };
}

// value and ids
export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data,
  };
}

export function tableName(data) {
  return {
    type: CHANGE_TABLE_NAME,
    data,
  };
}

export function updateDate() {
  return {
    type: UPDATE_DATE,
  };
}
