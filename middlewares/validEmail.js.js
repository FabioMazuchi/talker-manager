const validEmail = (req, res, next) => {
  const { email } = req.body;
  
  const regex = /\S+@\S+\.\S+/;
  
  const test = regex.test(email);

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  
  if (!test) {
    return res.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

module.exports = validEmail;
