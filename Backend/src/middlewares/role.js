
const role = (...roles) => {
    return (req, res, next) => {
      const userRole = req.user.role; // Assuming user info is attached to req.user
  
      if (!roles.includes(userRole)) {
        return res.status(403).json({ message: 'Access denied' });
      }
  
      next();
    };
  };
  
  export default role;
  