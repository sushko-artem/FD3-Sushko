import { nanoid } from "nanoid";

export function generateID(arr: unknown) {
  if (Array.isArray(arr)) {
    return arr.map((el) => {
      el.id = nanoid();
    });
  } else {
    throw new Error("Invalid type of argument");
  }
}
