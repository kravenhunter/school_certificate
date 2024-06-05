import { IQuiz } from "@/core";
import { AddQuizForm, quizActions } from "@/modules";
import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";

// Страница управления вопросами

export const ManagePanel = () => {
  const { selectFullList, selectCurrentQuizItem } = quizActions.selectors;
  const { fetchData, clearCurrentItem, addNewQuiz, getCurrentQuizItem, updateCurrentQuiz } = quizActions.actions;
  const quizList = useAppSelector((state) => selectFullList(state));
  const currentQuizItem = useAppSelector((state) => selectCurrentQuizItem(state));

  const dispatch = useAppDispatch();

  const sendHandler = (quiz_item: Omit<IQuiz, "id">) => {
    if (!currentQuizItem) {
      dispatch(addNewQuiz(quiz_item));
    } else {
      dispatch(updateCurrentQuiz({ ...quiz_item, id: currentQuizItem?.id }));
    }
  };
  const clickHandler = (title: string) => dispatch(getCurrentQuizItem(title));
  const clearForm = () => dispatch(clearCurrentItem());

  useEffect(() => {
    !quizList.length && dispatch(fetchData());
  }, [dispatch, fetchData, quizList.length]);

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
        <div className={style["manage__block__form"]}>
          <AddQuizForm handler={sendHandler} clearhandler={clearForm} item={currentQuizItem} />
        </div>
      </div>
      <div className='flex justify-center'>
        <Link to={"/"} className='bg-teal-600 rounded-md px-4 py-3 text-white hover:bg-teal-500' replace>
          На главную
        </Link>
      </div>
    </div>
  );
};
