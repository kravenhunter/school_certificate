/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
type TypeInput = "text" | "checkbox" | "radio" | "number" | "date";

interface IProps {
  nameField: string;
  label: string;
  isCheck?: boolean;
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioBox = React.memo(({ nameField, label, isCheck, handler }: IProps) => {
  return (
    <>
      <label>
        <input
          type='radio'
          className='w-[15px] h-[15px]'
          name={nameField}
          checked={isCheck}
          value={label}
          onChange={handler}
        />
        {label}
      </label>
    </>
  );
});
