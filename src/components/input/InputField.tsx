/* eslint-disable @typescript-eslint/no-unused-vars */
import cls from "classnames";
import React from "react";
import style from "./style.module.scss";
type TypeInput = "text" | "checkbox" | "radio" | "number" | "date";
interface IProps {
  classField?: string;
  nameField: string;
  value?: string;
  label: string;
  type: TypeInput;
  isCheck?: boolean;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = React.memo(
  ({ classField = "field__label", nameField, value, label, type, handler }: IProps) => {
    console.log(value);

    return (
      <label className={classField}>
        {label}
        <input
          type={type}
          className={cls(style["input__label"], "border-2")}
          value={value}
          name={nameField}
          onChange={handler}
        />
      </label>
    );
  },
);
