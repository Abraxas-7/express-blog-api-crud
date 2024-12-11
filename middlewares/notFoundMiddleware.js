function notFoundMiddleware(req, res, next) {
  res.status(404).json({
    error: "La risorsa richiesta non esiste. Controlla l'endpoint.",
  });
}

module.exports = notFoundMiddleware;
