import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import track from './mapSlice';
import { watchFetchRoute } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    track,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(watchFetchRoute);

export default store;
