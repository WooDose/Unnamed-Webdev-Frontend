import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
  persistStore,
  persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { logger } from 'redux-logger';
import reducer from './reducers';
import mainSaga from './sagas';


export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const persistedReducer = persistReducer(
    {
      key: 'rootx',
      storage,
      whitelist: ['auth'],
    },
    reducer, 
  );
  const middleware = [sagaMiddleware, logger]
  const store = createStore(
    persistedReducer,
    applyMiddleware(...middleware),
  );

  const persistor = persistStore(store);

  sagaMiddleware.run(mainSaga);

  return { store, persistor };
}