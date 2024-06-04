/* eslint-disable @typescript-eslint/no-unused-vars */
import { quizActions } from "@/modules";
import { useAppDispatch, useAppSelector } from "@/store";
import { ChackBox } from "@components";
import cls from "classnames";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Timer } from "./Timer";
import style from "./style.module.scss";
export const QuizBlock = () => {
  const [answer, setAnswer] = useState("");

  const { selectCurrentQuizList, selectCurrentQuizIndex } = quizActions.selectors;
  const { answerToQuizItem, getCurrentQuizIndex } = quizActions.actions;

  const quizList = useAppSelector((state) => selectCurrentQuizList(state));

  const currentQuizIndex = useAppSelector((state) => selectCurrentQuizIndex(state));

  const dispatch = useAppDispatch();

  const chooseHandler = useCallback((variant: string) => setAnswer(variant), []);
  const answerHandler = () => {
    answer.length && (dispatch(answerToQuizItem({ ...quizList[currentQuizIndex], answer: answer })), setAnswer(""));
  };
  useEffect(() => {
    dispatch(getCurrentQuizIndex());
  }, [currentQuizIndex, dispatch, getCurrentQuizIndex]);

  return (
    <>
      {quizList.length && (
        <div className={cls(style["quiz"], "text-black")}>
          <div className={style["quiz__title"]}>
            <h1>Тестирование</h1>

            <Timer />
          </div>
          <div className={cls(style["quiz__count"])}>
            {quizList.map((el, indx) => (
              <span
                key={el.id}
                className={indx === currentQuizIndex ? "bg-red-700" : el.answer ? "bg-black" : "bg-gray-200"}></span>
            ))}
          </div>
          <h2 className='quiz__question'>{quizList[currentQuizIndex].question}</h2>
          <form className={style["quiz__checkboxes"]}>
            {quizList[currentQuizIndex].variants?.map((el, indx) => (
              <Fragment key={el + indx}>
                <ChackBox
                  nameField={indx.toString()}
                  isCheck={el === answer}
                  label={el}
                  type='checkbox'
                  handler={chooseHandler}
                />
              </Fragment>
            ))}

            <button
              onClick={answerHandler}
              className={cls("px-4 py-2 rounded-md w-36 text-white", answer.length ? "bg-red-700" : "bg-gray-400 ")}
              disabled={!answer.length}
              type='button'>
              Ответить
            </button>
          </form>
        </div>
      )}
    </>
  );
};
