import data from './data.json';

export async function fetchData() {
  return data[0];
}