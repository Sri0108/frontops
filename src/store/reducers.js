import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";



//Calendar
import calendar from "./calendar/reducer";

//chat
import chat from "./chat/reducer";

//crypto
import crypto from "./crypto/reducer";



//jobs
import JobReducer from "./jobs/reducer";

//tasks
import tasks from "./tasks/reducer";

//Dashboard 
import Dashboard from "./dashboard/reducer";

//Dasboard blog
import DashboardBlog from "./dashboard-blog/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  calendar,
  chat,
  crypto,
  JobReducer,
  tasks,
  Dashboard,
  DashboardBlog,
});

export default rootReducer;
