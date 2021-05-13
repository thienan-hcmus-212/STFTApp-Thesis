import { combineReducers } from 'redux'

import authenticationReducer from './AuthenticationReducer';
import loginReducer from './LoginReducer';
import registerReducers from './RegisterReducer';
import RegistrationReducers from './RegistrationReducer';

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducers,
    auth: authenticationReducer,
    registration: RegistrationReducers
})

export default rootReducer