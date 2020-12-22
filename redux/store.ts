import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";
import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { createLogger } from "redux-logger";

const persistConfig = {
  key: process.env.REACT_APP_NAME || "infocasas",
  storage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(createLogger())
);

export const persistor = persistStore(store);
