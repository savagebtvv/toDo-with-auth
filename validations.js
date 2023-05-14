import { body } from "express-validator";

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен состоять как минимум из 5 символов").isLength(
    { min: 5 }
  ),
];

export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен состоять как минимум из 5 символов").isLength(
    { min: 5 }
  ),
];

export const createToDoValidation = [
  body("title", "Слишком короткое название события")
    .isLength({ min: 3 })
    .isString(),
  body("text", "Слишком короткое описание события")
    .isLength({ min: 3 })
    .isString(),
];
