module.exports = (rollesArr) => {
  return (req, res, next) => {
    try {
      const { rolles } = req.user;
      let hasRolle = false;
      rollesArr.forEach((rolle) => {
        if (rolles.includes(rolle)) {
          hasRolle = true;
        }
      });
      if (!hasRolle) {
        return res.status(403).json({ code: 403, message: "Forbidden" });
      }
      next();
    } catch (error) {
      res.status(403).json({ code: 403, message: error.message });
    }
  };
};

// {
//   students: [ 'lana', 'vlad' ],
//   teacher: 'andrii',
//   id: '65c67d72e36e444e5d6d9d1f',
//   rolles: [ 'USER' ],
//   iat: 1707507282,
//   exp: 1707518082
// }
