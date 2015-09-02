const { handleActions } = require('redux-actions');

const initialState = {
  closed: true,
};

const _reducer = (state = initialState, action) => {
  // return Object.assign({}, state, {currentTab: action.payload});
  return {...state, closed: action.payload };
};

exports.sideMenu = handleActions(
  // here i can add any other action that may modify the side menu state
  { TOGGLE_SIDE_MENU: _reducer},
  initialState
);
