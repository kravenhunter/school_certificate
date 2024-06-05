/* eslint-disable @typescript-eslint/no-unused-vars */
import { quizActions } from "@/modules";
import { RoutesNavigation } from "@/routes";
import { useAppDispatch, useAppSelector } from "@/store";
import cls from "classnames";
import { useEffect } from "react";
import { useLocation } from "react-router";

export const DefaultLayout = () => {
  const locationPath = useLocation();
  const { selectCurrentQuizList, isFinish } = quizActions.selectors;
  const { fetchData, getQuizFlag } = quizActions.actions;

  const quizList = useAppSelector((state) => selectCurrentQuizList(state));

  const quizStatus = useAppSelector((state) => isFinish(state));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!quizList.length) {
      dispatch(fetchData());
    }
  }, [dispatch, fetchData, quizList.length]);

  useEffect(() => {
    if (quizStatus) {
      dispatch(getQuizFlag());
    }
  }, [dispatch, getQuizFlag, quizStatus]);
  return (
    <div className={cls("min-h-screen", locationPath.pathname !== "/manage" && "grid place-content-center")}>
      <RoutesNavigation />
    </div>
  );
};
