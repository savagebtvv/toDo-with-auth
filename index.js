import express from "express";
import mongoose from "mongoose";
import { toDoController, userController } from "./controllers/imports.js";
import { checkAuth, handleValidationResult } from "./utils/imports.js";
import {
  registerValidation,
  loginValidation,
  createToDoValidation,
} from "./validations.js";

mongoose
  .connect(
    "mongodb+srv://savagebtvv:www@cluster0.niqhlyw.mongodb.net/userToDo?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database is ok!"))
  .catch((err) => console.log("Database error!", err));

const app = express();
app.use(express.json());

//user routes
app.post(
  "/toDo/register",
  registerValidation,
  handleValidationResult,
  userController.reg
);

app.post(
  "/toDo/login",
  loginValidation,
  handleValidationResult,
  userController.log
);

app.get("/toDo/Me", checkAuth, userController.getMe);

//toDo routes
app.post("/toDo", checkAuth, createToDoValidation, toDoController.create);

app.patch(
  "/toDo/:id",
  checkAuth,
  createToDoValidation,
  handleValidationResult,
  toDoController.update
);

app.get("/toDo", toDoController.getAll);

app.delete("/toDo/:id", checkAuth, toDoController.remove);

app.listen(2023, (err) => {
  if (err) {
    return console.log("Server start error! - ", err);
  }
  console.log("Server has been started!");
});
