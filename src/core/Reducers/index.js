import { combineReducers } from 'redux'

import authenticationReducer from './AuthenticationReducer';
import loginReducer from './LoginReducer';
import registerReducers from './RegisterReducer';

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducers,
    auth: authenticationReducer
})

export default rootReducer