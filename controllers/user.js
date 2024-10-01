import jwt from "jsonwebtoken";
import User from "../models/user.js";
import pkg from "bcryptjs";
const { hash } = pkg;

//Secret for JWT(should ideally be in environmnet variables)

const secret = "your_jwt_secret";

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validate email and password here --------------------

    //hash the password-------------------------------

    const hashedPassword = await hash(password, 10);

    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully!!!!!!!!!" });
  } catch (error) {
    res.status(500).json({ message: "Error in signup", error: error.message });
  }
};

//user signin------------------------------

export const signin = async (req, res) => {
  try {
    const { email, passsword } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(passsword, user.passsword))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //create JWT token --------------------------

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error in sigin", error: err.message });
  }
};
