/* eslint-disable @typescript-eslint/no-unused-vars */
import { Timer, quizActions } from "@/modules";
import { useAppDispatch, useAppSelector } from "@/store";
import { ChackBox, InputField } from "@components";
import cls from "classnames";
import { Fragment, useCallback, useEffect, useState } from "react";
import style from "./style.module.scss";

//Компонент  ответа на вопрос
export const QuizBlock = () => {
  const [answer, setAnswer] = useState("");

  const { selectCurrentQuizList, selectCurrentQuizIndex } = quizActions.selectors;
  const { answerToQuizItem, getCurrentQuizIndex, changeQuizFlag } = quizActions.actions;
  const [isDisableButton, setIsDisableButton] = useState(true);
  const quizList = useAppSelector((state) => selectCurrentQuizList(state));

  const currentQuizIndex = useAppSelector((state) => selectCurrentQuizIndex(state));

  const dispatch = useAppDispatch();

  const chooseHandler = useCallback((variant: string, type: "single" | "multiple") => {
    switch (type) {
      case "single":
        setAnswer(variant);
        break;
      case "multiple":
        setAnswer((prev) => {
          return (prev += prev.length === 0 ? variant : ", " + variant);
        });
        break;

      default:
        break;
    }
  }, []);

  const answerHandler = () => {
    if (answer.length) {
      if (currentQuizIndex === quizList.length - 1) {
        dispatch(changeQuizFlag(true));
      }
      dispatch(answerToQuizItem({ ...quizList[currentQuizIndex], answer: answer }));
      setAnswer("");
    }
  };
  useEffect(() => {
    dispatch(getCurrentQuizIndex());
  }, [currentQuizIndex, dispatch, getCurrentQuizIndex]);
  useEffect(() => {
    if (!answer.length || answer.length === 73) {
      setIsDisableButton(true);
    } else {
      setIsDisableButton(false);
    }
  }, [answer.length]);

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
            {quizList[currentQuizIndex].single_choose &&
              quizList[currentQuizIndex].variants?.map((el, indx) => (
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
            {quizList[currentQuizIndex].multiple_choose &&
              quizList[currentQuizIndex].variants?.map((el, indx) => (
                <label key={el + indx}>
                  <input
                    onChange={() => chooseHandler(el, "multiple")}
                    type='checkbox'
                    className='w-[15px] h-[15px]'
                    name={indx.toString()}
                  />
                  {el}
                </label>
              ))}
            {quizList[currentQuizIndex].short_anwer && (
              <div className={style["quiz__checkboxes__text"]}>
                <InputField
                  classField='grid'
                  type='text'
                  label={`Короткий ответ (не более 73 сииволов). Введено: ${answer.length}/73`}
                  value={answer}
                  nameField='answer'
                  handler={(e) => chooseHandler(e.target.value, "single")}
                />
              </div>
            )}
            {quizList[currentQuizIndex].long_anwer && (
              <div className={style["quiz__checkboxes__text"]}>
                <label>
                  Дайте развернутый ответ. Количество симовлов неограниченно.
                  <textarea
                    className='border-2 border-gray-300'
                    onChange={(e) => chooseHandler(e.target.value, "single")}
                    name='answer'
                    value={answer}></textarea>
                </label>
              </div>
            )}

            <button
              onClick={answerHandler}
              className={cls("px-4 py-2 rounded-md w-36 text-white", !isDisableButton ? "bg-red-700" : "bg-gray-400 ")}
              disabled={isDisableButton}
              type='button'>
              Ответить
            </button>
          </form>
        </div>
      )}
    </>
  );
};
