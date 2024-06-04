/* eslint-disable @typescript-eslint/no-unused-vars */
import cls from "classnames";
import React, { useState } from "react";
import style from "./style.module.scss";
type TypeInput = "text" | "checkbox" | "radio" | "number" | "date";

interface IProps {
  nameField: string;
  value?: string;
  label: string;
  type: TypeInput;
  isCheck?: boolean;
  handler: (variand: string) => void;
}

export const ChackBox = React.memo(({ nameField, label, value, type, isCheck, handler }: IProps) => {
  const [inputValue, setValue] = useState("");
  const inputHandler = (inputValue: string) => {
    setTimeout(() => {
      setValue(inputValue);
      handler(inputValue);
    }, 300);
  };
  const InputFiled = () => {
    switch (type) {
      case "text":
        return (
          <label>
            {label}
            <input
              type={type}
              className={cls(style["input__label"], "border-2")}
              name={nameField}
              onChange={(e) => inputHandler(e.target.value)}
            />
          </label>
        );

      default:
        return (
          <label className={cls(style["checkbox__label"])}>
            <input type={type} name={nameField} value={value} checked={isCheck} onChange={() => handler(label)} />
            {label}
          </label>
        );
    }
  };

  return <InputFiled />;
});
