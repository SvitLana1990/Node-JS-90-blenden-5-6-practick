// /api/v1/drinks
// /api/v1/books
// /api/v1/users
const drinkJoiSchema = require("../backend/Schemas/drinkJoiSchema");
const Drinks = require("../backend/controlles/DrinksController");
const authMiddleware = require("../backend/middlewares/authMiddleware");
const rollesMiddleware = require("../backend/middlewares/rollesMiddleware");
const validateDrinkMiddleware = require("../backend/middlewares/validateDrinkMiddleware");
const validateId = require("../backend/middlewares/validateId");
const drinksRoutes = require("express").Router();
//додати напій
drinksRoutes.post(
  "/drinks",
  validateDrinkMiddleware(drinkJoiSchema),
  Drinks.add
);

//отриматі всі
drinksRoutes.get(
  "/drinks",
  authMiddleware,
  rollesMiddleware(["ADMIN", "MODERATOR", "USER"]),
  Drinks.getAll
);

//отримати один
drinksRoutes.get("/drinks/:id", validateId, Drinks.getOne);

//оновити напій
drinksRoutes.patch("/drinks/:id", validateId, Drinks.updateOne);

//видалити напій
drinksRoutes.delete("/drinks/:id", validateId, Drinks.deleteOne);

module.exports = drinksRoutes;

// const user = {
//   name: "Artem",
//   status: "Online",
// };

// user.verified = true;
// user.name = "Artem";
// user.status = "Onlite";

// console.log(user);
