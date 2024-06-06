/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState } from "react";

interface ITemer {
  minutes: number;
  seconds: number;
}
const initTime: ITemer = {
  minutes: 0,
  seconds: 0,
};
//Timer-hook
export const useTimer = () => {
  const [timer, setTimer] = useState<ITemer>(initTime);

  const [isStartTimer, setIsStart] = useState(false);

  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const initTimer = useCallback((currentTime: ITemer) => setTimer(currentTime), []);
  const timerSwitcher = useCallback((flag: boolean) => setIsStart(flag), []);
  const stopInterval = useCallback(() => {
    timerId && (clearInterval(timerId), setTimerId(null));
  }, [timerId]);

  const runTimer = () => {
    if (isStartTimer) {
      const timerId = setInterval(() => {
        setTimer((prev) => {
          if (prev.seconds === 59) {
            return { minutes: prev.minutes + 1, seconds: 0 };
          }

          return { ...prev, seconds: prev.seconds + 1 };
        });
      }, 1000);
      setTimerId(timerId);
    } else {
      stopInterval();
    }
  };
  // const startTimer = () => {
  //   const timerId = setInterval(() => {
  //     setTimer((prev) => {
  //       if (prev.seconds === 59) {
  //         return { minutes: prev.minutes + 1, seconds: 0 };
  //       }

  //       return { ...prev, seconds: prev.seconds + 1 };
  //     });
  //   }, 1000);
  //   setTimerId(timerId);
  // };
  // const startTimer = ({ minutes, seconds }: ITemer) => {
  //   setTimer({ minutes, seconds });
  //   const timerId = setInterval(() => {
  //     setTimer((prev) => {
  //       if (prev.seconds === 59) {
  //         return { minutes: prev.minutes + 1, seconds: 0 };
  //       }

  //       return { ...prev, seconds: prev.seconds + 1 };
  //     });
  //   }, 1000);
  //   setTimerId(timerId);
  // };

  // useEffect(() => {
  //   if (isStartTimer) {
  //     const timerId = setInterval(() => {
  //       setTimer((prev) => {
  //         if (prev.seconds === 59) {
  //           return { minutes: prev.minutes + 1, seconds: 0 };
  //         }

  //         return { ...prev, seconds: prev.seconds + 1 };
  //       });
  //     }, 1000);
  //     setTimerId(timerId);
  //   } else {
  //     stopInterval();
  //   }

  //   // return () => timerId&&  clearInterval(timerId);
  // }, [isStartTimer, stopInterval]);

  return [timer, initTimer, timerSwitcher, runTimer] as const;
  // return {
  //   current_timer: timer,
  //   init_timer: setTimer,
  //   start_timer: setIsStart,
  // };
};
