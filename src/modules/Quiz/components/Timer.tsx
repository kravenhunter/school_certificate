import { convertTimeTString, convertTimeToObject, quizActions, useTimer } from "@/modules";
import { useAppDispatch, useAppSelector } from "@/store";
import cls from "classnames";
import { FC, useEffect } from "react";

import style from "./style.module.scss";

export const Timer: FC = () => {
  const { selectTimer } = quizActions.selectors;
  const { getQuizTimer, saveQuizTimer } = quizActions.actions;
  const getTime = useAppSelector((state) => selectTimer(state));

  const [countDown, flag, initData, changeFlag] = useTimer();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getTime === "" && dispatch(getQuizTimer());
    getTime !== "" && !flag && (initData(convertTimeToObject(getTime)), changeFlag(true));
    flag && dispatch(saveQuizTimer(convertTimeTString(countDown)));
  }, [changeFlag, countDown, dispatch, flag, getQuizTimer, getTime, initData, saveQuizTimer]);

  return (
    <div className={cls(style["quiz__title__time"], "h-8 border-2 border-gray-400  place-content-center px-3")}>
      {convertTimeTString(countDown)}
    </div>
  );
};
