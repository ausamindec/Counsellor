const cookietoken = (user, res) => {
  const token = user.getJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_DAY * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  user.password = undefined;
  res
    .status(200)
    .cookie(process.env.COOKIE_TOKEN_NAME, token, options)
    .json({ success: true, user });
};

module.exports = cookietoken;
