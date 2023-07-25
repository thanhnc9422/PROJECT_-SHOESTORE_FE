import { configureStore } from "@reduxjs/toolkit";
import { combineReducers, createStore } from "redux";
import userSlice from "../redux/userSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
 // Thêm các key của các reducer mà bạn muốn lưu trữ vào local storage
};
// const store = createStore(rootReducer);
// export default store;

const persistedReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
    reducer: {
        user: persistedReducer,
    },
  });

  const persistor = persistStore(store);
  export { store, persistor };

  