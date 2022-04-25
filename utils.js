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

module.exports = readFile;
