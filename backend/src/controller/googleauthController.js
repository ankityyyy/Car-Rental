import jwt from "jsonwebtoken";

export const generateTokenAndRedirect = (req, res) => {
  const user = req.user;
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.redirect(`http://localhost:5173?token=${token}`);
};
