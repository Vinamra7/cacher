const bcrypt = require("bcrypt");
const User = require("../models/user.js");

const signUpController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists based on email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "User already exists with this email." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({
      // You can generate a unique ID here or use a library like "uuid" for this purpose
      email,
      memoryAllocated: 0, // Initialize memoryAllocated to 0
      vmsAllotted: [], // Initialize an empty array for vmsAllotted
      password: hashedPassword, // Save the hashed password
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).send({ message: "User signed up successfully!" });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).send({ error: "Error signing up user. Please try again later." });
  }
};


const loginController = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists based on email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials. User not found." });
      }
  
      // Verify the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials. Password incorrect." });
      }
  
      // If the user and password are valid, you can consider the user as authenticated
      // You may choose to handle the authentication response as needed
      res.status(200).json({ message: "Login successful!" });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Error during login. Please try again later." });
    }
  };

module.exports = {signUpController,loginController};
