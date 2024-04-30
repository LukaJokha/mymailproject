import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
  });

  req.session.userId = newUser._id;

  res.json({
    user: { email: newUser.email, id: newUser._id },
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).lean();

  if (user && (await bcrypt.compare(password, user.password))) {
    const { password, ...rest } = user;
    req.session.userId = rest._id.toString();
    return res.json({ user: rest });
  }
  res.status(401).json({ message: "Invalid username or password" });
};
