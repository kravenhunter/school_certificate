import { quizActions, QuizList } from "@/modules";
import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";

//Страница результатов тестирования
export const ResultPage = () => {
  const { selectTimer, selectCurrentQuizList } = quizActions.selectors;
  const { getCurrentQuizList, getQuizTimer } = quizActions.actions;
  const quizList = useAppSelector((state) => selectCurrentQuizList(state));
  const getTime = useAppSelector((state) => selectTimer(state));
  const dispatch = useAppDispatch();

  useEffect(() => {
    !quizList.length && dispatch(getCurrentQuizList());
    getTime === "00:00" && dispatch(getQuizTimer());
  }, [dispatch, getCurrentQuizList, getQuizTimer, getTime, quizList.length]);

  return (
    <div className={style["result"]}>
      <h2 className='mb-3'>Время: {getTime}</h2>
      <QuizList quizList={quizList} />

      <div className='flex justify-center pt-3'>
        <Link to={"/"} className='bg-teal-600 rounded-md px-4 py-3 text-white hover:bg-teal-500' replace>
          На главную
        </Link>
      </div>
    </div>
  );
};
