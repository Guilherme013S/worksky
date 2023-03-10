import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice/authSlice";
import createAndEditAdSlice from "./slices/createAndEditAdSlice/createAndEditAdSlice";
import dashboardReducer from "./slices/dashboardSlice/dashboardSlice";
import menuReducer from "./slices/menuSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		menu: menuReducer,
		dashboard: dashboardReducer,
		createAndEditForm: createAndEditAdSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
