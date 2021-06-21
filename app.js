axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
  .then(res => {
    console.log(res.data.ticker.price);
  })
  .catch(err => {
    console.log('ERROR', err);
  });
  
const fetchBitcoinPrice = async () => {
  try {
    const res = await axios.get('https://api.cryptonator.com/api/ticker/btc-usd');
    console.log(res.data.ticker.price);
  } catch (e) {
    console.log(e);
  }
};

//Dad joke getter
const createJoke = document.querySelector('#create-joke');
const jokes = document.querySelector('#jokes');

const addNewJoke = async () => {
  const joke = await getDadJoke();
  const newLi = document.createElement('li');
  newLi.append(joke);
  jokes.append(newLi);
}

const getDadJoke = async () => {
  try {
    const config = { headers: { Accept: 'application/json' } }
    const res = await axios. get('https://icanhazdadjoke.com/', config);
    return res.data.joke;
  } catch (e) {
    return 'No jokes available sorry'
  }
  
}

createJoke.addEventListener('click', addNewJoke);

//TV show search
const tvSearchForm = document.querySelector('#tv-search-form');

const tvShowContainer = document.querySelector('.tvshow-container');

tvSearchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const searchTerm = tvSearchForm.elements.tvQuery.value;
  const config = { params: { q: searchTerm } };
  clearImgs();
  const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
  showImages(res.data);
  tvSearchForm.elements.tvQuery.value = null;
})

const showImages = shows => {
  for (let result of shows) {
    if (result.show.image) {
      const img = document.createElement('img');
      tvShowContainer.classList.add('received-imgs')
      img.src = result.show.image.medium;
      tvShowContainer.append(img);
    }
  }
}

const clearImgs = () => {
  if (tvShowContainer.classList.contains('received-imgs')) {
    tvShowContainer.textContent = null;
  }
}

