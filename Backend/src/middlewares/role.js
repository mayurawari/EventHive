const role = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(400).send({ message: "You are not authorized." });
    }
  };
};

export default role;
