import { ITimer } from "@modules";
import { useCallback, useEffect, useState } from "react";

const init: ITimer = {
  minutes: 0,
  seconds: 0,
};
export const useCountdown = () => {
  const [countDown, setCountDown] = useState<ITimer>(init);
  const [flag, setFlag] = useState(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const initData = useCallback((current: ITimer) => setCountDown(current), []);

  const changeFlag = useCallback((current: boolean) => setFlag(current), []);

  const runTimer = useCallback((current?: ITimer) => {
    current && setCountDown(current);
    const timerIdInterval = setInterval(() => {
      setCountDown((prev) => {
        if (prev.seconds === 59) {
          return { minutes: prev.minutes + 1, seconds: 0 };
        }
        return { ...prev, seconds: prev.seconds + 1 };
      });
    }, 1000);
    setTimerId(timerIdInterval);
  }, []);

  useEffect(() => {
    flag && runTimer();
    !flag && timerId && clearInterval(timerId);
  }, [flag, runTimer]);

  return [countDown, flag, initData, changeFlag, runTimer] as const;
};
