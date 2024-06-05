// import counterReducer from "@/modules/Test/testSlice";
import { QuizReduce } from "@/modules";
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  // здесь регистрируем все нажи редюсеры
  reducer: {
    quiz: QuizReduce,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
