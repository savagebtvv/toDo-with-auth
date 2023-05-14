import toDoModel from "../models/toDoModel.js";

export const getAll = async (req, res) => {
  try {
    const toDos = await toDoModel
      .find()
      .populate("user", "-passwordHash")
      .exec();

    res.json(toDos);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить события",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new toDoModel({
      title: req.body.title,
      text: req.body.text,
      user: req.userId,
    });

    const toDo = await doc.save();
    const { user, _id, ...userData } = toDo._doc;
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать событие",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const toDoId = req.params.id;
    postModel.findOneAndDelete({ _id: postId }).then((doc, err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Не удалось удалить событие",
        });
      }
      if (!doc) {
        return res.status(404).json({
          message: "Статья не найдена",
        });
      }
      res.json({
        success: true,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось удалить статью",
    });
  }
};

export const update = async (req, res) => {
  try {
    const toDoId = req.params.id;
    await toDoModel.updateOne(
      {
        _id: toDoId,
      },
      {
        title: req.body.title,
        text: req.body.text,
      }
    );

    res.json({
      status: "updated",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить событие",
    });
  }
};
