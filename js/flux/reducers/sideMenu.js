const { handleActions } = require('redux-actions');

const initialState = {
  closed: true,
};

/*
	If your state is a plain object, make sure you never mutate it! For example, 
	instead of returning something like Object.assign(state, newData) from your 
	reducers, return Object.assign({}, state, newData). This way you don’t override 
	the previous state. You can also write return { ...state, ...newData } if you 
	enable ES7 object spread proposal with Babel stage 1.
*/
const _reducer = (state = initialState, action) => {
  // return Object.assign({}, state, {closed: action.payload});
  return {...state, closed: action.payload };
};

exports.sideMenu = handleActions(
  // here i can add any other action that may modify the side menu state
  { TOGGLE_SIDE_MENU: _reducer},
  initialState
);
