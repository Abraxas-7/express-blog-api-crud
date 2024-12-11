function errorMiddleware(err, req, res, next) {
  res.status(500).json({
    error: "Si è verificato un errore interno nel server. Riprova più tardi.",
  });
}

module.exports = errorMiddleware;
