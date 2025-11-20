import User from "../modules/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "Already exit user!" });
    }
    const hatchedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hatchedPassword });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User Created Successfully!", user: newUser });
  } catch (errr) {
    res.status(500).json({ message: "Intrnal server error" });
    console.log("error", errr);
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status({ message: "user not exit!" });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status({ message: "Invalid credential" });
    }
    const token = jwt.sign(
      { _id: user._id, userInfo: user },
      process.env.SECRET_CODE,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ message: "Login Successfully!", token });
  } catch (errr) {
    res.status(500).json({ message: "Intrnal server error" });
    console.log("error", errr);
  }
};
