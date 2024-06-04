/* eslint-disable @typescript-eslint/no-unused-vars */
import { quizActions } from "@/modules";
import { useAppDispatch } from "@/store";

import { useNavigate } from "react-router";

export const HomePage = () => {
  const navigate = useNavigate();
  const { changeQuizFlag, startNewQuiz } = quizActions.actions;

  const dispatch = useAppDispatch();
  const startHandler = () => {
    dispatch(changeQuizFlag(false));
    dispatch(startNewQuiz());
    navigate("/quiz");
  };

  return (
    <button
      onClick={startHandler}
      className='text-3xl font-medium px-4 py-3 rounded-md  bg-slate-600 text-white hover:bg-slate-500 '>
      Начать тестирование
    </button>
  );
};
