import { DefaultAction, ResizeAction } from './types';

function has(object: object, key: string): boolean {

  return (!!object && typeof object === 'object') ?
  Object.prototype.hasOwnProperty.call(object, key) : false;
}

export function baseReducer(state: any, action: DefaultAction): any | Error {
  if (has(state, action.type)) {
    return { ...state, [action.type]: action.value };
  } else {
    throw new Error(`BaseReducer: Unrecognized action type: ${action.type}`);
  }
}
