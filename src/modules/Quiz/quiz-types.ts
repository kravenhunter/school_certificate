import { IQuiz } from "@/core/types";

export interface IQuizState {
  loading: boolean;
  error: string | null | undefined;
  currentQuizItem: IQuiz | null;
  currentQuizIndexItem: number;
  currentTime: string;
  full_list: IQuiz[];
  current_quiz: IQuiz[];
  is_finish: boolean;
}
