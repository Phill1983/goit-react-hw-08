import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/Slice';
import { contactsReducer } from './contacts/slice';
import { filtersReducer } from './filters/slice';

import storage from 'redux-persist/lib/storage'; // localStorage
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Конфіг для збереження тільки токена
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  contacts: contactsReducer,
  filters: filtersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
