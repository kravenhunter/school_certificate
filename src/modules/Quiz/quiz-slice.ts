import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { asyncReducer } from "./quiz-reducer";
import { IQuizState } from "./quiz-types";

const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const initialState: IQuizState = {
  loading: false,
  error: null,
  currentQuizIndexItem: 0,
  currentQuizItem: null,
  currentTime: "",
  full_list: [],
  current_quiz: [],
  is_finish: true,
} satisfies IQuizState as IQuizState;

const quizSlice = createSlice({
  name: "quiz",
  initialState,

  reducers: asyncReducer,
  // reducers: {
  //   ...reducer,
  // },
  selectors: {
    selectFullList: (state) => state.full_list,
    selectTimer: (state) => state.currentTime,
    selectIsLoadingStatus: (state) => state.loading,
    selectCurrentQuizList: (state) => state.current_quiz,
    selectCurrentQuizItem: (state) => state.currentQuizItem,
    selectCurrentQuizIndex: (state) => state.currentQuizIndexItem,
    isFinish: (state) => state.is_finish,
  },
});

//export const { addProduct, removeProduct, fetchData } = quizSlice.actions;
export default quizSlice.reducer;
export const quizActions = {
  selectors: { ...quizSlice.selectors },
  actions: { ...quizSlice.actions },
};
