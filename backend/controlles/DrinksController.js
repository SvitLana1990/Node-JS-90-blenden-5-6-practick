const DrinkModel = require("../models/Drink");
const asyncHandler = require("express-async-handler");

class DrinksController {
  add = asyncHandler(async (req, res) => {
    //контролерна валідація - перевірка чи передано обов'язкове поле
    const { title, price } = req.body;

    if (!title || !price) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }

    const drink = await DrinkModel.create({ ...req.body });
    res.status(201).json({
      code: 201,
      message: "sucsess",
      data: drink,
    });
  });

  getAll = asyncHandler(async (req, res) => {
    const drinks = await DrinkModel.find({});
    res.status(200).json({
      code: 200,
      quantity: drinks.length,
      message: "sucsess",
      data: drinks,
    });
  });

  //айді бува валідний існуючий
  //буває валідний неіснуючий
  //буває невалідний

  getOne = asyncHandler(async (req, res) => {
    const drink = await DrinkModel.findById(req.params.id);

    if (!drink) {
      res.status(404).json({
        code: 404,
        message: `Drink with ID ${req.params.id} not found`,
      });
    }

    res.status(200).json({
      code: 200,
      message: "sucsess",
      data: drink,
    });
  });

  updateOne = asyncHandler(async (req, res) => {
    const drink = await DrinkModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      {
        runValidators: true,
        new: true,
      }
    );

    if (!drink) {
      res.status(404).json({
        code: 404,
        message: `Drink with ID ${req.params.id} not found`,
      });
    }

    res.status(200).json({
      code: 200,
      message: "sucsess",
      data: drink,
    });
  });

  deleteOne = asyncHandler(async (req, res) => {
    const drink = await DrinkModel.findByIdAndDelete(req.params.id);

    if (!drink) {
      res.status(404).json({
        code: 404,
        message: `Drink with ID ${req.params.id} not found`,
      });
    }

    res.status(200).json({
      code: 200,
      message: "sucsess",
      data: drink,
    });
  });
}

module.exports = new DrinksController();
