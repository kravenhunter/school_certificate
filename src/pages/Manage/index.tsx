/* eslint-disable @typescript-eslint/no-unused-vars */
import { IQuiz } from "@/core";
import { AddQuizForm, quizActions } from "@/modules";
import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";

const initItem: IQuiz = {
  id: "",
  correct_result: "",
  question: "",
  variants: [],
  single_choose: true,
  multiple_choose: false,
  short_anwer: false,
  long_anwer: false,
};
export const ManagePanel = () => {
  const { selectFullList, selectCurrentQuizItem } = quizActions.selectors;
  const { getCurrentQuizList, addNewQuiz, getCurrentQuizItem, updateCurrentQuiz } = quizActions.actions;
  const quizList = useAppSelector((state) => selectFullList(state));
  const currentQuizItem = useAppSelector((state) => selectCurrentQuizItem(state));

  const [newQuizItem, setNewitem] = useState<IQuiz>(currentQuizItem ?? initItem);
  const dispatch = useAppDispatch();

  useEffect(() => {
    !quizList.length && dispatch(getCurrentQuizList());
  }, [dispatch, getCurrentQuizList, quizList.length]);
  const sendHandler = (quiz_item: Omit<IQuiz, "id">) => {
    !currentQuizItem && dispatch(addNewQuiz(quiz_item));
    currentQuizItem && dispatch(updateCurrentQuiz({ ...quiz_item, id: currentQuizItem?.id }));
  };
  const clickHandler = (title: string) => {
    console.log(title);

    dispatch(getCurrentQuizItem(title));
  };
  useEffect(() => {
    console.log(currentQuizItem);
  }, [currentQuizItem]);
  return (
    <div className={style["manage"]}>
      <div className={style["manage__block"]}>
        <ul className={style["manage__block__list"]}>
          {quizList.length &&
            quizList.map((el) => (
              <li
                onClick={() => clickHandler(el.question)}
                key={el.id}
                className='bg-gray-100 hover:bg-gray-200  px-4 py-3 cursor-pointer'>
                <h3>{el.question}</h3>
              </li>
            ))}
        </ul>
        <AddQuizForm handler={sendHandler} item={currentQuizItem} />
      </div>
      <div className='flex justify-center'>
        <Link to={"/"} className='bg-teal-600 rounded-md px-4 py-3 text-white hover:bg-teal-500' replace>
          На главную
        </Link>
      </div>
    </div>
  );
};
