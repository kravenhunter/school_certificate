import { useEffect, useState } from "react";
//import { useAppDispatch, useAppSelector } from "@/store";

// const initTimer = {
//     minutes: 0,
//     seconds: 0,
//   };
//   interface IProps{
//       timer_init: ITemer
//     }
interface ITemer {
  minutes: number;
  seconds: number;
}
export const useTimer = ({ minutes, seconds }: ITemer) => {
  const [timer, setTimer] = useState<ITemer>({ minutes, seconds });
  // const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((prev) => {
        if (prev.seconds === 59) {
          return { minutes: prev.minutes + 1, seconds: 0 };
        }

        return { ...prev, seconds: prev.seconds + 1 };
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return [
    `${timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes} : ${
      timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds
    }`,
  ];
};
