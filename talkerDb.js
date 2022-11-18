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

const wrhiteFile = async (content) => {
  try {
    await fs.writeFile(path, JSON.stringify(content));
  } catch (e) {
    console.log(`Erro ao escrever no arquivo: ${e.message}`);
  }
};

const listAll = async () => readFile();

const findById = async (id) => {
  const talkers = await readFile();
  return talkers.find((talker) => talker.id === id);
};

const addTalker = async (body) => {
  const talkers = await readFile();
  const id = talkers.length + 1;
  talkers.push({ id, ...body });
  await wrhiteFile(talkers);
  return { id, ...body };
};

module.exports = { listAll, findById, addTalker };
