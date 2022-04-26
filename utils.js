const fs = require('fs/promises');

const FILE = './talker.json';

const readFile = async () => {
  try {
    const result = await fs.readFile(FILE, 'utf-8');
    return JSON.parse(result);
  } catch (e) {
    return e.message;
  }
};

const writeFile = async (content) => {
  try {
    await fs.writeFile(FILE, content);
  } catch (err) {
    console.error(`Erro ao escrever o arquivo: ${err.message}`);
  }
};

// https://www.youtube.com/watch?v=Hr5pAAIXjkA&t=184s
const generatorPassword = () => {
  let pass = '';
  do {
    pass += Math.random().toString(36).substring(2);
  } while (pass.length < 20);
  pass = pass.substring(0, 16);
  
  return pass;
};

const generateObj = (obj, id) => {
  const { name, age, talk } = obj;
  const newObj = { name, id, age, talk };
  return newObj;
};

module.exports = { readFile, generatorPassword, generateObj, writeFile };
