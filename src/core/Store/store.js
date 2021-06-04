import AsyncStorage from '@react-native-async-storage/async-storage'
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import rootReducer from '../Reducers/index';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth'] // only navigation will be persisted
  };

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer,applyMiddleware(thunk))
const persistor = persistStore(store)

export { store, persistor }