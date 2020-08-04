import { chat } from './chat';
import { auth } from './auth';
import { player } from './player';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  chat, auth, player
});