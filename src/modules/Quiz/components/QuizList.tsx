import { IQuiz } from "@/core";
import { CancelIcon, CorrectIcon } from "@components";
import style from "./style.module.scss";
interface IProps {
  quizList: IQuiz[];
}
export const QuizList = ({ quizList }: IProps) => {
  return (
    <ul className={style["quiz__list"]}>
      {quizList.length &&
        quizList.map((el) => (
          <li key={el.id} className='bg-gray-100 hover:bg-gray-200  px-4 py-3 cursor-pointer'>
            <h3>{el.question}</h3>
            {el.answer && (
              <div className={style["quiz__list__answer"]}>
                {el.correct_result.includes(el.answer) ? <CorrectIcon /> : <CancelIcon />}
                <h4>Ответ: {el.answer}</h4>
              </div>
            )}
          </li>
        ))}
    </ul>
  );
};
