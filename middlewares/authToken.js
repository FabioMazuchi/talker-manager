const authToken = (req, res, next) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  
  const { authorization } = req.headers;
  
  if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
  
  next();
};

module.exports = authToken;
