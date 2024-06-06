import { ITimer } from "@modules";

const convertTimeToObject = (time: string) => {
  const timeConvert = time.split(":");
  return {
    minutes: +timeConvert[0],
    seconds: +timeConvert[1],
  };
};
const convertTimeTString = (current: ITimer) => {
  return `${current.minutes < 10 ? `0${current.minutes}` : current.minutes} : ${
    current.seconds < 10 ? `0${current.seconds}` : current.seconds
  }`;
};

export { convertTimeTString, convertTimeToObject };
