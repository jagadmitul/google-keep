import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import notesReducer from './notes/notesSlice';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['notes'],
};

const rootReducer = combineReducers({
	notes: notesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);
export default store;
