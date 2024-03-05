import { combineReducers } from 'redux';
import users from './users';


const rootReducer = combineReducers({
  users: users,

  // other reducers
});


export default rootReducer;