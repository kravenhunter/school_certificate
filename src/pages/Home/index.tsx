/* eslint-disable @typescript-eslint/no-unused-vars */
import { quizActions } from "@/modules";
import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";

import { useNavigate } from "react-router";

export const HomePage = () => {
  const navigate = useNavigate();
  const { changeQuizFlag, startNewQuiz, getQuizFlag, getQuizTimer } = quizActions.actions;
  const { isFinish } = quizActions.selectors;
  const getFlag = useAppSelector((state) => isFinish(state));
  const dispatch = useAppDispatch();
  const startHandler = () => {
    dispatch(changeQuizFlag(false));
    dispatch(startNewQuiz());
    navigate("/quiz");
  };
  const continueTest = () => {
    dispatch(getQuizTimer());
    navigate("/quiz");
  };
  useEffect(() => {
    dispatch(getQuizFlag());
  }, [dispatch, getQuizFlag]);
  return (
    <div className='grid gap-7 max-w-[400px]'>
      <h3 className='text-center'>
        Для начала теста нажмите "Начать тестирование". Если тест не закончен, появится кнопка "Продолжить тест"
      </h3>
      <button
        onClick={startHandler}
        className='text-2xl font-medium px-4 py-3 rounded-md  bg-slate-600 text-white hover:bg-slate-500 '>
        Начать тестирование
      </button>
      {!getFlag && (
        <button
          onClick={continueTest}
          className='text-2xl font-medium px-4 py-3 rounded-md  bg-slate-600 text-white hover:bg-slate-500 '>
          Продолжить тестирование
        </button>
      )}
    </div>
  );
};
