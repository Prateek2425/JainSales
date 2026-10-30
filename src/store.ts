import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  persistReducer,
  persistStore,
} from 'redux-persist';

import authReducer from './screen/auth/authSlice';
import dashboardReducer from './screen/dashboard/dashboardSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,

  // Persist only auth
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer,
);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;