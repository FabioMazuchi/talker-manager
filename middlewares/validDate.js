const validDate = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  
  // https://www.guj.com.br/t/resolvido-como-validar-data-com-java-script/276656
  const regex = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

  if (!watchedAt) {
    return res
      .status(400)
      .json({ message: 
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  
  if (!regex.test(watchedAt)) {
     return res.status(400)
     .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  
  next();
};

module.exports = validDate;