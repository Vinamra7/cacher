const bcrypt = require("bcrypt");
const User = require("../models/user.js");

const signUpController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists based on email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ error: "User already exists with this email." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({
      // You can generate a unique ID here or use a library like "uuid" for this purpose
      email,
      memoryAllocated: 0, // Initialize memoryAllocated to 0 // Initialize an empty array for vmsAllotted
      password: hashedPassword, // Save the hashed password
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).send({ message: "User signed up successfully!" });
  } catch (error) {
    console.error("Error signing up user:", error);
    res
      .status(500)
      .send({ error: "Error signing up user. Please try again later." });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists based on email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid credentials. User not found." });
    }

    // Verify the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: "Invalid credentials. Password incorrect." });
    }

    // If the user and password are valid, you can consider the user as authenticated
    // You may choose to handle the authentication response as needed
    res.status(200).json({ message: "Login successful!",user:user.email });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ error: "Error during login. Please try again later." });
  }
};

const getMemoryAllocatedController = async (req,res) =>{
  const {email} = req.body;
  try{
    const user = await User.findOne({ email:email});
    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid credentials. User not found." });
    }
    res.status(200).json({ memoryAllocated:user.memoryAllocated});
  }catch{
    console.error("Error getting allocated memory:", err);
    res.status.send({ error: "Internal Server Error" });
  }

}

// const increaseAllocationController = async (req, res) => {
//   const { email, capacity } = req.body;

//   try {
//     // Find the user with the provided email
//     const user = await User.findOne({ email });
//     // If the user doesn't exist, return an error response
//     if (!user) {
//       return res.status(404).send({ error: "User not found." });
//     }

//     // Update the user's memoryAllocated value based on the provided capacity
//     // You may want to add validation checks for the capacity if necessary
//     user.memoryAllocated = capacity;
//     // Save the updated user to the database

//     await user.save();
//     res
//       .status(200)
//       .send({ message: "Memory allocation updated successfully.", user });
//   } catch (error) {
//     console.error("Error updating memory allocation:", error);
//     res.status(500).send({ error: "Error updating memory allocation. Please try again later." });
//   }
// };


module.exports = {
  signUpController,
  loginController,
  getMemoryAllocatedController
};
