import { combineReducers } from 'redux'

import authenticationReducer from './AuthenticationReducer';
import loginReducer from './LoginReducer';
import registerReducers from './RegisterReducer';
import RegistrationReducers from './RegistrationReducer';
import RescueReducer from './RescueReducer';
import UserInformationReducer from './UserInforReducers';

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducers,
    auth: authenticationReducer,
    registration: RegistrationReducers,
    rescue: RescueReducer,
    userInfo: UserInformationReducer
})

export default rootReducer