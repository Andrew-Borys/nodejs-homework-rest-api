const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { createError, sendMail } = require("../../helpers");
const gravatar = require("gravatar");
const idGenerate = require("bson-objectid");

const singup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = idGenerate();
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Confirmation your email!",
    html: `<a target="_blanck" href="http://localhost:3000/users/verify/${verificationToken}">Click to confirm email!<a/>`,
  };

  res.status(201).json({
    user: {
      email: result.email,
      subscription: "starter",
    },
  });

  await sendMail(mail);
};

module.exports = singup;
