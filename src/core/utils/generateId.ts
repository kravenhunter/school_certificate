import { v4 } from "uuid";

export function generateId() {
  const getRandom = Math.floor(Math.random() * 1000);
  return `${v4()}_${getRandom}_${Date.now()}`;
}
