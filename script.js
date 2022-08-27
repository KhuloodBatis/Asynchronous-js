'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data ,className ='') {
  const html = ` <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('afterbegin', html);
  countriesContainer.style.opacity = 1;
};
//! erro message 
const renderError = function(msg){
    countriesContainer.insertAdjacentText('beforeend',msg)
    countriesContainer.style.opacity = 1;
}


const getCountryAndNeighbour = function (country) {

    //AJAX CALL COUNTRY 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    //   console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    //render Country 
    renderCountry(data);

    //Get nighbour contry (2)
    const [neighbour] = data.borders;

    if(!neighbour) return;

    //AJAX call Country 2

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();
  
    request2.addEventListener('load', function () {
      //   console.log(this.responseText);
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      
   //render Country 
   renderCountry(data2 ,'neighbour');

    });
  });
};

// getCountryAndNeighbour('usa');
// getCountryAndNeighbour('usa');
// getCountryAndNeighbour('saudi');
// getCountryAndNeighbour('Algeria');
// getCountryAndNeighbour('germany');

//!PROMISES
const getJSON = function(url, errorMsg='Somthing went wrong'){
      return  fetch(url).then(response=>{
        console.log(response);

        if(!response.ok)
            throw new Error(`${errorMsg} (${response.status})` );

       return response.json();
    })
}
const request = fetch(`https://restcountries.com/v2/name/portugal`);
console.log(request);


// const getCountryData = function(country){
//     fetch(`https://restcountries.com/v2/name/${country}`)
//     //!throw error
//     .then(response=> {
//         console.log(response);

//         if(!response.ok)
//             throw new Error(`Country not found (${response.status})` );

//     return response.json();
//     })
    
//     .then(data => {renderCountry(data[0])

//         // const neighbour = data[0].borders[0];
//         const neighbour = 'fkfkkkd';

//     if(!neighbour) return ;

//     return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
// })
// .then(response=>{

//     if(!response.ok)
//     throw new Error(`Country not found (${response.status})` );

//    return  response.json()}
//    )
// .then(data=>renderCountry(data, 'neighbour'))
// .catch( err =>{console.log(`${err}😬😬😬😬`);
// renderError(`Somthing went wrong 😬 ${err.message}.Try again!`)

// })
// .finally(() => {
//     countriesContainer.style.opacity = 1;
// });
// };


// btn.addEventListener('click',function(){

//     getCountryData('portugal')
// })

// getCountryData('portugalsfd')

const getCountryData = function(country){

    getJSON(`https://restcountries.com/v2/name/${country}`,
   'Country not found ')
     
   .then(data => {renderCountry(data[0]);

        const neighbour = data[0].borders[0];
        // const neighbour = 'fkfkkkd';

    if(!neighbour) throw new Error('No neighbourfound!');

    return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`,'Country not found');
})

.then(data=>renderCountry(data, 'neighbour'))
.catch( err =>{console.log(`${err}😬😬😬😬`);
renderError(`Somthing went wrong 😬 ${err.message}.Try again!`)

})
.finally(() => {
    countriesContainer.style.opacity = 1;
});
};


btn.addEventListener('click',function(){

    // getCountryData('saudi')
    getCountryData('australia')
})
