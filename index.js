'use strict';

//const apiKey = '9cab89f3865349fca4aea6ce986471e4';

const searchURL = 'https://api.github.com/users/';



function displayResults(responseJson) {
  // if there are previous results, remove them
  //console.log(responseJson);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.length; i++){
    // for each object in the articles
    //array, add a list item to the results 
    //list with the article title, source, author,
    //description, and image
    $('#results-list').append(
      `<li>
      <p>REPO: ${responseJson[i].name}</p>
      <p>LINK:<a href="${responseJson[i].html_url}" target="_blank"> ${responseJson[i].html_url}</a></p>
      </li>`
    )};
  //display the results section  
  $('#results-list').removeClass('hidden');
};

function getRepo(query) {
 const url = searchURL + query + "/repos";

 // console.log(url);

  let auth = btoa('noirviper' + ":" + 'f8464773b47d6f49284f40d31f822b08966a4da3')

  const options = {
    headers: {
      'Authorization': "Basic" + auth,
      'User-Agent':'request'}
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getRepo(searchTerm);
  });
}

$(watchForm);