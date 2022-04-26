const validTalk = (req, res, next) => {
  const teste = Object.keys(req.body).includes('talk');
  
  if (!teste) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  next();
};

module.exports = validTalk;