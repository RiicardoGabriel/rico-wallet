async function getCoins() {
  const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export default getCoins;
