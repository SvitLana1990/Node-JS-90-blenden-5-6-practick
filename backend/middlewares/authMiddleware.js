const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // 1.отримуємо токен
    const [type, token] = req.headers.authorization.split(" ");
    if (type === "Bearer" && token) {
      // 2.розшифровуємо токен
      const decoded = jwt.verify(token, "cat");
      // 3.віддаю інформацію про користувача далі
      req.user = decoded;
      next();
    }
  } catch (error) {
    res.status(401).json({ code: 401, message: error.message });
  }
};

// {
//   students: [ 'lana', 'vlad' ],
//   teacher: 'andrii',
//   id: '65c669417c7f3d9365b86b0c',
//   iat: 1707504632,
//   exp: 1707515432
// }
