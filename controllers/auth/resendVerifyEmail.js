const { User } = require("../../models/user");
const { createError, sendMail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(404);
  }
  if (user.verify) {
    throw createError(404, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Confirmation your email!",
    html: `<a target="_blanck" href="http://localhost:3000/users/verify/${user.verificationToken}">Click to confirm email!<a/>`,
  };
  await sendMail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
