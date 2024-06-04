/* eslint-disable @typescript-eslint/no-unused-vars */
import { ButtonItem, InputField, RadioBox } from "@components";

// import CorrectIcon from "@assets/images/correct.svg";//
import React, { useCallback, useEffect, useState } from "react";

import { IQuiz } from "@/core";
import style from "./style.module.scss";

const initItem: Omit<IQuiz, "id"> = {
  correct_result: "",
  question: "",
  variants: [],
  single_choose: true,
  multiple_choose: false,
  short_anwer: false,
  long_anwer: false,
};
interface IProps {
  item: IQuiz | null;
  handler: (quiz_item: Omit<IQuiz, "id">) => void;
}
export const AddQuizForm = React.memo(({ item, handler }: IProps) => {
  const [newQuizItem, setNewitem] = useState<Omit<IQuiz, "id">>(item ?? initItem);
  const [variant, setVariant] = useState("");

  const inputsHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "multiple_choose":
        setNewitem((prev) => {
          return { ...prev, multiple_choose: true, single_choose: false, short_anwer: false, long_anwer: false };
        });
        break;
      case "single_choose":
        setNewitem((prev) => {
          return { ...prev, multiple_choose: false, single_choose: true, short_anwer: false, long_anwer: false };
        });
        break;
      case "short_anwer":
        setNewitem((prev) => {
          return { ...prev, multiple_choose: false, single_choose: false, short_anwer: true, long_anwer: false };
        });
        break;
      case "long_anwer":
        setNewitem((prev) => {
          return { ...prev, multiple_choose: false, single_choose: false, short_anwer: false, long_anwer: true };
        });
        break;
      case "question":
        setNewitem((prev) => {
          return { ...prev, question: event.target.value.trim() };
        });
        break;
      case "answer":
        setNewitem((prev) => {
          return { ...prev, correct_result: event.target.value.trim() };
        });
        break;
      case "variants":
        setVariant(event.target.value.trim());
        break;
      default:
        break;
    }
  }, []);
  const addVariants = useCallback(() => {
    if (variant.length) {
      setNewitem((prev) => {
        return { ...prev, variants: [...prev.variants, variant.trim()] };
      });
      setVariant("");
    }
  }, [variant]);
  const clearVariantsHandler = useCallback(
    () =>
      setNewitem((prev) => {
        return { ...prev, variants: [] };
      }),
    [],
  );
  const submitHandler = () => {
    handler(newQuizItem);
  };
  const clearFromHandler = () => {
    setNewitem(initItem);
  };
  useEffect(() => {
    item && setNewitem(item);
  }, [item]);
  return (
    <form className={style["quiz__form"]}>
      <InputField
        type='text'
        label='Вопрос'
        value={newQuizItem.question}
        nameField='question'
        handler={inputsHandler}
      />
      <InputField
        type='text'
        label='Правильный ответ(или ответы через запятую)'
        value={newQuizItem.correct_result}
        nameField='answer'
        handler={inputsHandler}
      />
      <ul className={style["quiz__form__settings"]}>
        <li>
          <RadioBox
            label='Едынй выбор'
            nameField='single_choose'
            isCheck={newQuizItem.single_choose}
            handler={inputsHandler}
          />
        </li>

        <li>
          <RadioBox
            label='Множественный выбор'
            nameField='multiple_choose'
            isCheck={newQuizItem.multiple_choose}
            handler={inputsHandler}
          />
        </li>
        <li>
          <RadioBox
            label='Короткий ответ'
            nameField='short_anwer'
            isCheck={newQuizItem.short_anwer}
            handler={inputsHandler}
          />
        </li>
        <li>
          <RadioBox
            label='Развёрнутый ответ'
            nameField='long_anwer'
            isCheck={newQuizItem.long_anwer}
            handler={inputsHandler}
          />
        </li>
      </ul>
      {newQuizItem.single_choose && (
        <>
          <div className={style["quiz__form__variants"]}>
            <InputField
              type='text'
              label='Вариант ответа'
              value={variant}
              nameField='variants'
              handler={inputsHandler}
            />
            <ButtonItem label='Добавить вариант' nameField='variants' handler={addVariants} />
          </div>
          <p className='font-medium'>Добавленные варианты:</p>
          <ul className='grid gap-2'>
            {newQuizItem?.variants.length > 0 && newQuizItem.variants.map((el, inx) => <li key={inx}>{el}</li>)}
            <li>
              <ButtonItem label='Очистить' nameField='clear' handler={clearVariantsHandler} />
            </li>
          </ul>
        </>
      )}
      <div className='flex justify-center gap-3 pt-3'>
        <ButtonItem label='Сохранить вопрос' classField='w-[160px] h-[50px]' nameField='save' handler={submitHandler} />
        <ButtonItem
          label='Очистить форму'
          classField='w-[160px] h-[50px]'
          nameField='save'
          handler={clearFromHandler}
        />
      </div>
    </form>
  );
});
