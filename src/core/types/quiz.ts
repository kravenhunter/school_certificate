export interface IQuiz {
  id: string;
  question: string;
  variants: string[];
  correct_result: string;
  answer?: string;
  single_choose: boolean;
  multiple_choose: boolean;
  short_anwer: boolean;
  long_anwer: boolean;
}
export interface IQuizStore {
  current_index: number;
  current__quiz: IQuiz[];
}
