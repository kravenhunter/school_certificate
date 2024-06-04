/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAppDispatch, useAppSelector } from "@/store";

import { quizActions } from "@/modules";
import { useTimer } from "@modules";
import cls from "classnames";
import { useEffect } from "react";
import style from "./style.module.scss";

const initTimer = {
  minutes: 0,
  seconds: 0,
};
const convertTime = (time: string) => {
  const timeConvert = time.split(":");
  return {
    minutes: +timeConvert[0],
    seconds: +timeConvert[1],
  };
};
export const Timer = () => {
  const { selectTimer, selectCurrentQuizIndex, selectCurrentQuizList } = quizActions.selectors;
  const { saveQuizTimer } = quizActions.actions;

  const dispatch = useAppDispatch();
  const getTime = useAppSelector((state) => selectTimer(state));
  const quizList = useAppSelector((state) => selectCurrentQuizList(state));
  const currentQuizIndex = useAppSelector((state) => selectCurrentQuizIndex(state));

  const [timer] = useTimer(getTime === "00:00" ? initTimer : convertTime(getTime));

  useEffect(() => {
    if (currentQuizIndex < quizList.length) {
      dispatch(saveQuizTimer(timer));
    }
  }, [currentQuizIndex, dispatch, quizList.length, saveQuizTimer, timer]);

  return (
    <div className={cls(style["quiz__title__time"], "h-8 border-2 border-gray-400  place-content-center px-3")}>
      {timer}
    </div>
  );
};
