import { IQuiz } from "@/core";
import { CancelIcon, CorrectIcon } from "@components";
import style from "./style.module.scss";
interface IProps {
  quizList: IQuiz[];
}
//Компонент списка вопросов
export const QuizList = ({ quizList }: IProps) => {
  const checkMultipleVariant = (correcnt: string, answer: string) => {
    let ckechFlag = false;
    answer.split(",").forEach((el) => {
      const check = correcnt.includes(el);
      if (!check) {
        ckechFlag = check;
        return;
      }
      ckechFlag = check;
    });
    return ckechFlag;
  };
  return (
    <ul className={style["quiz__list"]}>
      {quizList.length &&
        quizList.map((el) => (
          <li key={el.id} className='bg-gray-100 hover:bg-gray-200  px-4 py-3 cursor-pointer'>
            <h3>{el.question}</h3>
            {el.answer && (
              <>
                <div className={style["quiz__list__answer"]}>
                  <h4>
                    Вариант: {el.single_choose && " Единый  выбор"}
                    {el.multiple_choose && " Множественный выбор"}
                    {el.short_anwer && " Короткий ответ"}
                    {el.long_anwer && " Развернутый ответ"}
                  </h4>
                </div>
                <div className={style["quiz__list__answer"]}>
                  <CorrectIcon /> <h4>Правильный ответ: {el.correct_result}</h4>
                </div>
                {el.single_choose && (
                  <div className={style["quiz__list__answer"]}>
                    {el.correct_result.includes(el.answer) ? <CorrectIcon /> : <CancelIcon />}
                    <h4>Ваш ответ: {el.answer}</h4>
                  </div>
                )}

                {el.multiple_choose && (
                  <div className={style["quiz__list__answer"]}>
                    {checkMultipleVariant(el.correct_result, el.answer) ? <CorrectIcon /> : <CancelIcon />}
                    <h4>Ваш ответ: {el.answer}</h4>
                  </div>
                )}
                {el.short_anwer && (
                  <div className={style["quiz__list__answer"]}>
                    <h4>Ваш ответ (проверяется преподователем): {el.answer}</h4>
                  </div>
                )}
                {el.long_anwer && (
                  <div className={style["quiz__list__answer"]}>
                    <h4>Ваш ответ (проверяется преподователем): {el.answer}</h4>
                  </div>
                )}
              </>
            )}
          </li>
        ))}
    </ul>
  );
};
