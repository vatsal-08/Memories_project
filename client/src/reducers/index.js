import { combineReducers } from "redux";

import posts from "./posts.js";
import auth from "./auth.js";
const reducers = combineReducers({ posts, auth });

export default reducers;
