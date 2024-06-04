/* eslint-disable @typescript-eslint/no-unused-vars */
import { quizActions } from "@/modules";
import { useAppDispatch, useAppSelector } from "@/store";
import { QuizBlock } from "@modules";
//import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";

export const QuizPage = () => {
  // const navigate = useNavigate();
  // const locationPath = useLocation();

  const { selectCurrentQuizList, selectCurrentQuizIndex } = quizActions.selectors;
  const { getCurrentQuizList } = quizActions.actions;

  // const getIsFinishStatus = useAppSelector((state) => isFinish(state));
  const currentQuizIndex = useAppSelector((state) => selectCurrentQuizIndex(state));
  const quizList = useAppSelector((state) => selectCurrentQuizList(state));
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!quizList.length) {
      dispatch(getCurrentQuizList());
    }
  }, [dispatch, getCurrentQuizList, quizList.length]);

  useEffect(() => {
    console.log(quizList);
  }, [quizList]);
  // useEffect(() => {
  //   if (getIsFinishStatus && locationPath.pathname === "/quiz") {
  //     console.log(getIsFinishStatus);
  //     setTimeout(() => {
  //       navigate("/");
  //     }, 1000);
  //   }
  // }, [getIsFinishStatus, locationPath.pathname, navigate]);
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
