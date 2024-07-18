import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { User } from "../models/user_model.js";
import { userSchema } from "../schema/user_schema.js";
import { loginValidator } from '../schema/user_schema.js';


export const signUp = async (req, res, next) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const email = value.email;

    const findIfUserExist = await User.findOne({ email });
    if (findIfUserExist) {
      return res.status(401).send('User has already signed up');
    }

    const hashedPassword = await bcrypt.hash(value.password, 12);
    value.password = hashedPassword;
    delete value.confirmPassword; // Remove confirmPassword field before storing

    await User.create(value);

    // req.session.user = { id: addUser.id };
    return res.status(201).send('Signed Up Successfully');
  } catch (error) {
    next(error);
  }
};

// login user
export const login = async (req, res, next) => {
  try {
    const { error, value } = loginValidator.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const { email, userName, password } = req.body;

    // Find user by email or username
    const user = await User.findOne({
      $or: [
        { email: email },
        { userName: userName }

      ]
    });

    if (!user) {
      return res.status(401).json('No user found');
    }

    // Verify the password
    const correctPassword = bcrypt.compareSync(password, user.password);
    if (!correctPassword) {

      return res.status(401).json('Invalid credentials');
    }

    // Generate a session
    req.session.user = { id: user.id };

    console.log('user', req.session.user);

    // Return response
    res.status(201).json('Login successful');
  } catch (error) {
    next(error);
  }
};

// login user with token
export const token = async (req, res, next) => {
  try {
    const { error, value } = loginValidator.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const { email, userName, password } = req.body;

    // Find user by email or username
    const user = await User.findOne({
      $or: [
        { email: email },
        { userName: userName }

      ]
    });

    if (!user) {
      return res.status(401).json('No user found');
    }

    // Verify the password
    const correctPassword = bcrypt.compareSync(password, user.password);
    if (!correctPassword) {

      return res.status(401).json('Invalid credentials');
    }

    // Generate a token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: '72h' }
    );
    // Return response
    res.status(201).json({
      message: 'User Logged in',
      acessToken: token
    });
  } catch (error) {
    next(error);
  }
};

// Get user
export const getUser = async (req, res, next) => {
  try {
    const userName = req.params.userName.toLowerCase();

    const options = { sort: { startDate: -1 } }
    const userDetails = await User.findOne({ userName }).select("-password")
      .populate({
        path: "education",
        options,
      })
      .populate("userProfile")
      .populate("skills")

      .populate({
        path: "achievements",
        options: { sort: { date: -1 } },
      })
      .populate({
        path: "experiences",
        options,
      })
      .populate({
        path: "volunteering",
        options,
      })
      .populate({
        path: "projects",
        options
      });

    return res.status(200).json({ user: userDetails });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const email = req.query.email?.toLowerCase()
    const userName = req.query.userName?.toLowerCase();

    const filter = {};
    if (email) {
      filter.email = email;
    }
    if (userName) {
      filter.userName = userName;
    }

    const users = await User.find(filter);

    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};



export const logout = async (req, res, next) => {
  try {
    // Destroy user session
    await req.session.destroy();
    // Return response
    res.status(200).json("User logged out");
  } catch (error) {
    next(error);
  }
};