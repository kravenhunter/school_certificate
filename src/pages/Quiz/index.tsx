import { quizActions } from "@/modules";
import { useAppDispatch, useAppSelector } from "@/store";
import { QuizBlock } from "@modules";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";

//Страница Тестирования
export const QuizPage = () => {
  const { selectCurrentQuizList, selectCurrentQuizIndex } = quizActions.selectors;
  const { getCurrentQuizList } = quizActions.actions;

  const currentQuizIndex = useAppSelector((state) => selectCurrentQuizIndex(state));
  const quizList = useAppSelector((state) => selectCurrentQuizList(state));
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!quizList.length) {
      dispatch(getCurrentQuizList());
    }
  }, [dispatch, getCurrentQuizList, quizList.length]);

  return (
    <div className={style["quiz__wrapper"]}>
      {currentQuizIndex < quizList.length ? (
        <QuizBlock />
      ) : (
        <div className={style["quiz__wrapper__message"]}>
          <h1>Тест окончен</h1>
          <Link to={"/"} className='bg-teal-600 rounded-md px-4 py-3 text-white hover:bg-teal-500' replace>
            На главную
          </Link>
        </div>
      )}
    </div>
  );
};
