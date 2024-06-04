/* eslint-disable @typescript-eslint/no-unused-vars */
import { asyncThunkCreator, buildCreateSlice, nanoid } from "@reduxjs/toolkit";
const createSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

interface Item {
  id: string;
  text: string;
}

interface TodoState {
  loading: boolean;
  todos: Item[];
}

export const sliceItem = createSlice({
  name: "counter",
  initialState: {
    loading: false,
    todos: [],
  } satisfies TodoState as TodoState,
  reducers: (create) => ({
    increment: create.reducer<number>((state, action) => {
      state.todos.splice(action.payload, 1);
    }),
    deleteTodo: create.reducer<number>((state, action) => {
      state.todos.splice(action.payload, 1);
    }),
    addTodo: create.preparedReducer(
      (text: string) => {
        const id = nanoid();
        return { payload: { id, text } };
      },
      // action type is inferred from prepare callback
      (state, action) => {
        state.todos.push(action.payload);
      },
    ),
    fetchTodo: create.asyncThunk(
      async (id: string, thunkApi) => {
        const res = await fetch(`myApi/todos?id=${id}`);
        return (await res.json()) as Item;
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.loading = false;
        },
        fulfilled: (state, action) => {
          state.loading = false;
          state.todos.push(action.payload);
        },
      },
    ),
  }),
  // reducers: {
  //   increment(state) {
  //     state.data++;
  //   },
  //   decrement(state) {
  //     state.data--;
  //   },
  //   incrementByAmount(state, action: PayloadAction<number>) {
  //     state.data += action.payload;
  //   },
  // },
  selectors: {
    selectValue: (sliceState) => sliceState.todos,
  },
});

// export const { increment, decrement, incrementByAmount } = sliceItem.actions;
// export const { selectValue } = sliceItem.selectors;
export default sliceItem.reducer;
export const counterActions = {
  selectors: { ...sliceItem.selectors },
  actions: { ...sliceItem.actions },
};
