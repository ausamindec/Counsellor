function errorHandler(err, req, res, next) {
  return res.status(422).json({ success: false, error: err.message });
}

module.exports = errorHandler;
