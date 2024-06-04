import cls from "classnames";

type TypeInput = "button" | "submit" | "reset";
interface IProps {
  classField?: string;
  label: string;
  nameField: string;
  type?: TypeInput;
  handler: () => void;
}

export const ButtonItem = ({
  classField = "w-[150px] h-[40px]",
  handler,
  label,
  nameField,
  type = "button",
}: IProps) => {
  return (
    <button
      onClick={handler}
      name={nameField}
      type={type}
      className={cls("bg-teal-600 rounded-md  text-white hover:bg-teal-500", classField)}>
      {label}
    </button>
  );
};
