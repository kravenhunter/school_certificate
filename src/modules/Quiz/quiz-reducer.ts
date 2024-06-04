/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { quizStaticData } from "@/core/index";
import { PayloadAction, ReducerCreators } from "@reduxjs/toolkit";

import { ApiServices } from "@/core";
import { IQuiz } from "@/core/types";
import { WritableDraft } from "immer";
import { IQuizState } from "./quiz-types";
import { shuffleArray, useLocalStorage } from "./utils";

export const asyncReducer = (create: ReducerCreators<IQuizState>) => ({
  fetchData: create.asyncThunk(
    async function (__, { rejectWithValue }) {
      try {
        const result = await ApiServices.getFullQuizList();
        return result;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    },
    {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.full_list = action.payload;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
    },
  ),
  getCurrentQuizList: create.asyncThunk(
    async function (__, { rejectWithValue }) {
      try {
        const result = await ApiServices.getCurrentQuizList();

        if (typeof result === "string") throw new Error(result);

        return result;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    },
    {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.current_quiz = action.payload;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
    },
  ),
  getCurrentQuizItem: create.asyncThunk(
    async function (question_title: string, { rejectWithValue }) {
      try {
        const result = await ApiServices.getCurrentQuizItem(question_title);
        console.log(result);

        if (typeof result === "string") throw new Error(result);

        return result;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    },
    {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.currentQuizItem = action.payload;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
    },
  ),
  addNewQuiz: create.asyncThunk(
    async function (quiz: Omit<IQuiz, "id">, { rejectWithValue }) {
      try {
        const result = await ApiServices.postQuizItem(quiz);
        return result;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    },
    {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.full_list.push(action.payload);
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
    },
  ),
  updateCurrentQuiz: create.asyncThunk(
    async function (quiz: IQuiz, { rejectWithValue }) {
      try {
        const result = await ApiServices.putQuizItem(quiz);
        if (typeof result === "string") throw new Error(result);
        return result;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    },
    {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        const getCurrentQuiz = state.full_list.find((el) => el.id === action.payload.id);
        getCurrentQuiz &&
          ((getCurrentQuiz.question = action.payload.question),
          (getCurrentQuiz.variants = action.payload.variants),
          (getCurrentQuiz.correct_result = action.payload.correct_result));
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
    },
  ),
  removeCurrentQuiz: create.asyncThunk(
    async function (quiz: { key: number; current: IQuiz }, { rejectWithValue }) {
      try {
        await ApiServices.deleteQuizItem(quiz.current.id);
        return { key: quiz.key };
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    },
    {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.full_list.splice(action.payload.key, 1);
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
    },
  ),
  startNewQuiz: create.asyncThunk(
    async function (__, { rejectWithValue }) {
      try {
        const result = await ApiServices.startNewQuiz();
        return result;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    },
    {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.current_quiz = action.payload;
        state.currentQuizItem = action.payload[0];
        state.currentQuizIndexItem = 0;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
    },
  ),
  getCurrentQuizIndex: create.asyncThunk(
    async function (__, { rejectWithValue }) {
      try {
        const result = await ApiServices.getCurrentQuizIndex();

        if (typeof result === "string") throw new Error(result);

        return { key: result.current_index };
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    },
    {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.currentQuizIndexItem = action.payload.key;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
    },
  ),
  answerToQuizItem: create.asyncThunk(
    async function (quiz: IQuiz, { rejectWithValue }) {
      try {
        const result = await ApiServices.answerToQuizItem(quiz);
        if (typeof result === "string") throw new Error(result);

        return { key: result.current_index, current: result.current_quiz };
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    },
    {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        const getCurrentQuiz = state.current_quiz[action.payload.key - 1];
        getCurrentQuiz && (getCurrentQuiz.answer = action.payload.current.answer);
        state.currentQuizIndexItem = action.payload.key;
        // state.currentQuizItem = state.current_quiz[state.currentQuizIndexItem];
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
    },
  ),
  saveQuizTimer: create.asyncThunk(
    async function (timer: string, { rejectWithValue }) {
      try {
        const result = await ApiServices.saveQuizTimer(timer);

        return result;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    },
    {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.currentTime = action.payload;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
    },
  ),
  getQuizTimer: create.asyncThunk(
    async function (__, { rejectWithValue }) {
      try {
        const result = await ApiServices.getQuizTimer();

        return result;
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    },
    {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.currentTime = action.payload;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
    },
  ),
  getQuizFlag: create.asyncThunk(
    async function (__, { rejectWithValue }) {
      try {
        const result = await ApiServices.getQuizFlag();

        return { flag: result };
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    },
    {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.is_finish = action.payload.flag;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
    },
  ),
  changeQuizFlag: create.asyncThunk(
    async function (flag: boolean, { rejectWithValue }) {
      try {
        const result = await ApiServices.updateQuizFlag(flag);

        return { flag: result };
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    },
    {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.is_finish = action.payload.flag;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
    },
  ),
  getTestIndex: create.asyncThunk(
    async function (__, { rejectWithValue }) {
      try {
        const result = await ApiServices.testGetAction();

        if (typeof result === "string") throw new Error(result);

        return { key: result.index };
      } catch (error) {
        return rejectWithValue((error as Error).message);
      }
    },
    {
      pending: (state) => {
        state.loading = true;
      },
      fulfilled: (state, action) => {
        state.loading = false;
        state.currentQuizIndexItem = action.payload.key;
      },
      rejected: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
    },
  ),
});

interface IQuizProps {
  list: IQuiz[];
}

export const reducer = {
  // fetchData(state: WritableDraft<IQuizProps>): void {
  //   const getList = ApiServices.getFullQuizList;

  //   getList && (console.log("getList", getList), (state.list = [...getList]));
  //   !getList && (console.log("resultShuffle", resultShuffle), (state.list = [...resultShuffle]));
  // },
  fetchData(state: WritableDraft<IQuizProps>): void {
    const [readValue] = useLocalStorage<IQuiz[]>("quiz-list");
    const getList = readValue();
    const resultShuffle = shuffleArray(quizStaticData);

    getList && (console.log("getList", getList), (state.list = [...getList]));
    !getList && (console.log("resultShuffle", resultShuffle), (state.list = [...resultShuffle]));
  },
  addProduct(state: WritableDraft<IQuizProps>, actions: PayloadAction<IQuiz>): void {
    state.list.push(actions.payload);
  },

  removeProduct(state: WritableDraft<IQuizProps>, actions: PayloadAction<{ id: string }>) {
    state.list = state.list.filter((el) => el.id !== actions.payload.id);
  },
  // addProduct<T>( state: WritableDraft<IProps<T>>, actions: PayloadAction<T>): void {

  //     state.list.push(actions.payload);
  //   },
};
