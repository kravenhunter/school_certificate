/* eslint-disable @typescript-eslint/no-unused-vars */
import cls from "classnames";
import React from "react";
import style from "./style.module.scss";
type TypeInput = "text" | "checkbox" | "radio" | "number" | "date";

interface IProps {
  nameField: string;
  value?: string;
  label: string;
  type: TypeInput;
  isCheck?: boolean;
  handler: (variant: string, type: "single" | "multiple") => void;
}

export const ChackBox = React.memo(({ nameField, label, value, type, isCheck, handler }: IProps) => {
  return (
    <label className={cls(style["checkbox__label"])}>
      <input type={type} name={nameField} value={value} checked={isCheck} onChange={() => handler(label, "single")} />
      {label}
    </label>
  );
});
