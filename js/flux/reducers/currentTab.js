const { handleActions } = require('redux-actions');

const initialState = 'wall';

const _reducer = (state = initialState, action) => {
  return action.payload;
};

exports.currentTab = handleActions(
  { CHANGE_TAB: _reducer},
  initialState
);
