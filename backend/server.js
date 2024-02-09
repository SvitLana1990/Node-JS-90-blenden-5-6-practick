const path = require("path");
const express = require("express");
const connectDB = require("../config/connectDB");
require("colors");
const asyncHandler = require("express-async-handler");
const errorHandler = require("./middlewares/errorHandler");
const routeNotFound = require("./middlewares/routeNotFound");
const configPath = path.join(__dirname, "..", "config", ".env");
require("dotenv").config({ path: configPath });
const { USER, PORT, MONGODB_STRING } = process.env;
const UserModel = require("./models/User");
const RollesModel = require("./models/Rolles");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", require("../routes/drinksRoutes"));

// регістрація - збереження нового киристувача в базу

app.post(
  "/register",
  asyncHandler(async (req, res) => {
    //1.отримуємо і валідуємо дані від користувача
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }
    //2.шукаємо користувача в базі
    const candidate = await UserModel.findOne({ email });
    //3.якщо знайшли- редірект або помилка
    if (candidate) {
      res.status(400);
      throw new Error("User already exists");
    }
    //4.не знайшли- хешируєм пароль і видаєм роль
    const hashPassword = bcryptjs.hashSync(password, 5);
    const rolles = await RollesModel.findOne({ value: "USER" });

    //5.зберігаємо в базу з захешированим паролем
    const user = await UserModel.create({
      ...req.body,
      password: hashPassword,
      rolles: [rolles.value],
    });
    res.status(201).json({
      code: 201,
      message: "sucsess",
      data: { email: user.email, name: user.name },
    });
  })
);

// аунтефікація - перевірка данних які надав користувач при регістрації з тими даними, що наявні в базі.
app.post(
  "/login",
  asyncHandler(async (req, res) => {
    //1.отримуємо і валідуємо дані від користувача
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }
    // 2.шукаємо користувача в базі і розшифровуєм пароль
    const user = await UserModel.findOne({ email });
    // //3.якщо не знайшли або не розшифрували пароль- "Invalid login or password"
    if (!user || !bcryptjs.compareSync(password, user.password)) {
      res.status(400);
      throw new Error("Invalid login or password");
    }
    // //4.якщо знайшли і розшифрували пароль- видаєм токен
    const token = generateToken({
      students: ["lana", "vlad"],
      teacher: "andrii",
      id: user._id,
      rolles: user.rolles,
    });
    // //5.зберігаємо в базу з токеном
    user.token = token;
    await user.save();
    res.status(200).json({
      code: 200,
      message: "sucsess",
      data: { email: user.email, token: user.token },
    });
  })
);

// авторизація - перевірка прав на доступ
// розлогінення - вихід з системи

app.patch(
  "/logout",
  authMiddleware,
  asyncHandler(async (req, res) => {
    // console.log(req.user);
    //1.отримуємо інформацію про користувача- якось отримуємо id
    const { id } = req.user;
    // console.log(id);
    //2.видаляємо токен
    const user = await UserModel.findById(id);
    user.token = null;
    await user.save();
    res.status(200).json({
      code: 200,
      message: "sucsess",
      data: { email: user.email, token: user.token },
    });
  })
);

app.use("*", routeNotFound);

app.use(errorHandler);

connectDB();

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`.green.italic.bold);
});

// console.log("green".green.italic.bold);
// console.log("yellow".yellow.underline);
// console.log("red".red.bold);

function generateToken(data) {
  const payload = { ...data };
  return jwt.sign(payload, "cat", { expiresIn: "3h" });
}
