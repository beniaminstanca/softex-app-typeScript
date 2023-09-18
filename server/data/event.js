const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');

async function getAll() {
  const storedData = await readData();
  if (!storedData.offers) {
    throw new NotFoundError('Could not find any offer.');
  }
  return storedData.offers;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.offers || storedData.offers.length === 0) {
    throw new NotFoundError('Could not find any offer.');
  }

  const offer = storedData.offers.find((ta) => ta.id === id);
  if (!offer) {
    throw new NotFoundError('Could not find offer for id ' + id);
  }

  return offer;
}

async function add(data) {
  const storedData = await readData();
  storedData.offers.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.offers || storedData.offers.length === 0) {
    throw new NotFoundError('Could not find any offers.');
  }

  const index = storedData.offers.findIndex((ta) => ta.id === id);
  if (index < 0) {
    throw new NotFoundError('Could not find offers for id ' + id);
  }
  data.prima = storedData.offers[index].prima;
  storedData.offers[index] = { ...data, id };
  
  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.offers.filter((ta) => ta.id !== id);
  await writeData({ ...storedData, offers: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;