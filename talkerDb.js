const fs = require('fs/promises');
const { join } = require('path');

const path = join(__dirname, 'talker.json');

const readFile = async () => {
  try {
    const response = await fs.readFile(path, 'utf-8');
    return JSON.parse(response);
  } catch (e) {
    console.log(`Erro ao ler arquivo: ${e.message}`);
  }
};

const listAll = async () => readFile();

module.exports = { listAll };
