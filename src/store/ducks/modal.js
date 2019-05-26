/**
 * Action Types
 */
export const Types = {
  SHOW: 'modal/SHOW',
  HIDE: 'modal/HIDE',
};

/**
 * Reducer
 */

const INITIAL_STATE = {
  visible: false,
  coordinate: null,
};

export default function modal(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.SHOW:
      return { visible: true, coordinate: action.payload.coordinate };
    case Types.HIDE:
      return { visible: false, coordinate: null };
    default:
      return state;
  }
}

/**
 * Action Creators
 */
export const Creators = {
  showModal: coordinate => ({
    type: Types.SHOW,
    payload: { coordinate },
  }),

  hideModal: () => ({
    type: Types.HIDE,
  }),
};
