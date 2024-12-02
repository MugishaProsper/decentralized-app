import User from '../models/user.models.js';
import bcrypt from 'bcryptjs';
import { validateUserRegistration } from '../utils/validators.js'; // Custom validation function
import { generateTokenAndSetCookie } from '../utils/generate.token.js';

export const register = async (req, res) => {
  const { fullName, username, email, password } = req.body;

  // Validate input
  const validationError = validateUserRegistration({ fullName, username, email, password });
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({ fullName, username, email, password: hashedPassword });

    const { password: _, ...userWithoutPassword } = newUser.toJSON();
    return res.status(201).json(userWithoutPassword);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where : { email }});
    if(!user){
      return res.status(404).json({ message : "User not found" })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      return res.status(403).json({ message : "Incorrect password" })
    }
    return generateTokenAndSetCookie(user, res);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('auth_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only in production for HTTPS
      sameSite: 'Strict',
    })
    return res.status(200).json({ message : 'logout successful'})
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "Server error" });
  }
}