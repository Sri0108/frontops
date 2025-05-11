import { all, fork } from "redux-saga/effects";

//public
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";
import LayoutSaga from "./layout/saga";
import calendarSaga from "./calendar/saga";
import chatSaga from "./chat/saga";
import cryptoSaga from "./crypto/saga";
import jobsSaga from "./jobs/saga";
import tasksSaga from "./tasks/saga";
import dashboardSaga from "./dashboard/saga";
import dashboardBlogSaga from "./dashboard-blog/saga";

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(calendarSaga),
    fork(chatSaga),
    fork(cryptoSaga),
    fork(jobsSaga),
    fork(tasksSaga),
    fork(dashboardSaga),
    fork(dashboardBlogSaga)
  ]);
}
