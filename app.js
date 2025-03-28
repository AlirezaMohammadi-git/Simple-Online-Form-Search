

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

/*
################################################################################################################
################################################################################################################
############################# For better underestanding read this article ######################################
################################################################################################################
############### https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions ##############
################################################################################################################
*/
const cityList = [];

const searchInput = document.querySelector('.search_input')
const suggestions = document.querySelector('.suggestion')

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)


fetchData()

function fetchData() {
  fetch(endpoint)
    .then(response => response.json())
    // because data is an array itself, we need to add them one by one
    .then(data => cityList.push(...data))
}

function findMatches(wordToMatch, citiesList = []) {
  return citiesList.filter(place => {
    // what does gi mean? visit link below :
    // https://www.w3schools.com/jS/js_regexp.asp
    const regex = new RegExp(wordToMatch, 'gi')
    console.log(place.city.match(regex))
    return place.city.match(regex) || place.state.match(regex)
  })
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {

  const myarray = findMatches(this.value, cityList)
  const html = myarray.map(place => {
    const regix = new RegExp(this.value, 'gi');
    const city = place.city.replace(regix, `<span class="hl">${this.value}</span>`);
    const state = place.state.replace(regix, `<span class="hl">${this.value}</span>`);
    return `<li> <span class="name">${city}, ${state}</span> <span class="population">${numberWithCommas(place.population)} </li>`
  }).join('');

  suggestions.innerHTML = html;
}

// just for better understanding...
list = ['car', 'hello', 'website', 'javascript', 'Microsoft', 'HP Victus laptop', 'Franky', 'police Officer']
function simplifiedFindMatches(text, list) {

  return list.filter(item => {
    // "g" => globaly
    // "i" => case insensetive
    const regex = new RegExp(text, 'gi')
    return item.match(regex);
  })

}
// simplifiedFindMatches('a', list).forEach(element => {
//   console.log(element)
// });