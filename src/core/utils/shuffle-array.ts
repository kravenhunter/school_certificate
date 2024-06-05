import { IQuiz } from "@/core";

function shuffle(args: IQuiz[]) {
  let start = args.length;

  while (--start) {
    const random = Math.floor(Math.random() * (start + 1));

    [args[start], args[random]] = [args[random], args[start]];
  }
  return args;
}

export function shuffleArray(args: IQuiz[]) {
  let result: IQuiz[] = [];
  for (let index = 0; index < 3; index++) {
    result = shuffle(args);
  }
  return result;
}
