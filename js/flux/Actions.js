const ActionTypes = require('./ActionTypes');
const { createAction } = require('redux-actions');

exports.changeTab = createAction(ActionTypes.CHANGE_TAB);
exports.toggleSideMenu = createAction(ActionTypes.TOGGLE_SIDE_MENU);
