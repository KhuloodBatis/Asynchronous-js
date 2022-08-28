'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
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
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

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

    if (!neighbour) return;

    //AJAX call Country 2

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      //   console.log(this.responseText);
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      //render Country
      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('usa');
// getCountryAndNeighbour('usa');
// getCountryAndNeighbour('saudi');
// getCountryAndNeighbour('Algeria');
// getCountryAndNeighbour('germany');

//!PROMISES
const getJSON = function (url, errorMsg = 'Somthing went wrong') {
  return fetch(url).then(response => {
    console.log(response);

    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};
// const request = fetch(`https://restcountries.com/v2/name/portugal`);
// console.log(request);

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

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found ')
    .then(data => {
      renderCountry(data[0]);

      const neighbour = data[0].borders[0];
      // const neighbour = 'fkfkkkd';

      if (!neighbour) throw new Error('No neighbourfound!');

      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })

    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.log(`${err}😬😬😬😬`);
      renderError(`Somthing went wrong 😬 ${err.message}.Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', function () {
//   // getCountryData('saudi')
//   getCountryData('australia');
// });

// The Complete JavaScript Course 30
// Asynchronous JavaScript
// Coding Challenge #1
// In this challenge you will build a function 'whereAmI' which renders a country
// only based on GPS coordinates. For that, you will use a second API to geocode
// coordinates. So in this challenge, you’ll use an API on your own for the first time 😁
// Your tasks:
// PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
// and a longitude value ('lng') (these are GPS coordinates, examples are in test
// data below).
// 2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
// to convert coordinates to a meaningful location, like a city and country name.
// Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
// will be done to a URL with this format:
// https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
// promises to get the data. Do not use the 'getJSON' function we created, that
// is cheating 😉
// 3. Once you have the data, take a look at it in the console to see all the attributes
// that you received about the provided location. Then, using this data, log a
// message like this to the console: “You are in Berlin, Germany”
// 4. Chain a .catch method to the end of the promise chain and log errors to the
// console
// 5. This API allows you to make only 3 requests per second. If you reload fast, you
// will get this error with code 403. This is an error with the request. Remember,
// fetch() does not reject the promise in this case. So create an error to reject
// the promise yourself, with a meaningful error message
// PART 2
// 6. Now it's time to use the received data to render a country. So take the relevant
// attribute from the geocoding API result, and plug it into the countries API that
// we have been using.
// 7. Render the country and catch any errors, just like we have done in the last
// lecture (you can even copy this code, no need to type the same code)
// The Complete JavaScript Course 31
// Test data:
// § Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
// § Coordinates 2: 19.037, 72.873
// § Coordinates 3: -33.933, 18.474
// GOOD LUCK 😀

//! 1

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city} ,${data.country}`);
//       return fetch(`https://restcountries.com/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message}🔴`));
// };

// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

//////////////////////////////////////////

/////!
//! Event loop

// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 100);
// Promise.resolve('Resolve promis 1').then(res => console.log(res));

// Promise.resolve('Resolve promis 2').then(res => {
//   for (let i = 0; i < 100000000000000; i++) {}
//   console.log(res);
// });
// console.log('Test end ');
//! bulidin simple promise

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('lotter draw is happening 🧼');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You win 💵');
//     } else {
//       reject(new Error('You lost your money 💩'));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// //!Promisifying setTimeout
// const wait = function (second) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, second * 1000);
//   });
// };
// wait(2)
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => console.log('I waited for 1 seconds'));

// Promise.resolve('abc').then(res => console.log(res));
// Promise.reject(new Error('Problem!')).catch(err => console.error(err));

//! Promisifying The Gelocation API

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );

// console.log('Getting Position');

// const getPostion = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => console.log(position),
//     //   err => console.error(err)
//     // );

//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPostion().then(pos => console.log(pos));

// const whereAmI = function () {
//   getPostion()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city},${data.country}`);
//       return fetch(`https://restcountries.com/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);
//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message}🔴`));
// };

// btn.addEventListener('click', whereAmI);

//!!challenge

// The Complete JavaScript Course 32
// Coding Challenge #2
// For this challenge you will actually have to watch the video! Then, build the image
// loading functionality that I just showed you on the screen.
// Your tasks:
// Tasks are not super-descriptive this time, so that you can figure out some stuff by
// yourself. Pretend you're working on your own 😉
// PART 1
// 1. Create a function 'createImage' which receives 'imgPath' as an input.
// This function returns a promise which creates a new image (use
// document.createElement('img')) and sets the .src attribute to the
// provided image path
// 2. When the image is done loading, append it to the DOM element with the
// 'images' class, and resolve the promise. The fulfilled value should be the
// image element itself. In case there is an error loading the image (listen for
// the'error' event), reject the promise
// 3. If this part is too tricky for you, just watch the first part of the solution
// PART 2
// 4. Consume the promise using .then and also add an error handler
// 5. After the image has loaded, pause execution for 2 seconds using the 'wait'
// function we created earlier
// 6. After the 2 seconds have passed, hide the current image (set display CSS
// property to 'none'), and load a second image (Hint: Use the image element
// returned by the 'createImage' promise to hide the current image. You will
// need a global variable for that 😉)
// 7. After the second image has loaded, pause execution for 2 seconds again
// 8. After the 2 seconds have passed, hide the current image
// Test data: Images in the img folder. Test the error handler by passing a wrong
// image path. Set the network speed to “Fast 3G” in the dev tools Network tab,
// otherwise images load too fast
// GOOD LUCK 😀

// const wait = function (second) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, second * 1000);
//   });
// };
// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image not found'));
//     });
//   });
// };
// let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Img 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     console.log('Img 2 loaded');
//     return wait(200);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.log(err));

//!trt and catch
// const getPostion = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => console.log(position),
//     //   err => console.error(err)
//     // );

//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const wherAMI2 = async function (country) {
//   try {
//     const pos = await getPostion();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     const resGo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     const dataGeo = await resGo.json();
//     console.log(dataGeo);

//     const res = await fetch(
//       `https://restcountries.com/v2/name/${dataGeo.country}`
//     );
//     // console.log(res);
//     const data = await res.json();
//     console.log(data);
//     renderCountry(data[0]);
//   } catch (err) {
//     console.error(`${err}`);
//     renderError(`Somthing went wrong ${err.message}`);
//   }
// };

// wherAMI2();
// console.log('FIRST');

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }
//!catch error
//!Return value from async Function
const getPostion = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => console.log(position),
    //   err => console.error(err)
    // );

    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const wherAMI2 = async function (country) {
  try {
    const pos = await getPostion();
    const { latitude: lat, longitude: lng } = pos.coords;

    const resGo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    const dataGeo = await resGo.json();
    console.log(dataGeo);

    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    // console.log(res);
    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
    return `You are in ${dataGeo.city} , ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err}`);
    renderError(`Somthing went wrong ${err.message}`);
    //reject promise returnd from async function
    throw err;
  }
};

console.log('1: will get location');
// const city = wherAMI2();// return awlayes promise
// console.log(city);
// wherAMI2()
//   .then(city => console.log(`2:${city}`))
//   .catch(err => console.log(`2: ${err.message}`))
//   .finally(() => console.log(`3: Finished getting location`));

//!conver
// (async function () {
//   try {
//     await wherAMI2();
//     console.log(`2:${city}`);
//   } catch (err) {
//     console.log(`2: ${err.message}`);
//   }
//   console.log(`3: Finished getting location`);
// })();

//!Running Promises Parallel

const getJSON2 = function (url, errorMsg = 'Somthing went wrong') {
  return fetch(url).then(response => {
    // console.log(response);

    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

//! how get 3 contries in same time ;
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON2(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON2(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON2(`https://restcountries.com/v2/name/${c3}`);

    // console.log([data1.capital, data2.capital, data3.capital]);

    const data = await Promise.all([
      getJSON2(`https://restcountries.com/v2/name/${c1}`),
      getJSON2(`https://restcountries.com/v2/name/${c2}`),
      getJSON2(`https://restcountries.com/v2/name/${c3}`),
    ]);

    // console.log(data); //return object

    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.log(err);
  }
};

// get3Countries('portugal', 'canada', 'tanzania');

//! promise.res

(async function () {
  const res = await Promise.race([
    getJSON2(`https://restcountries.com/v2/name/italy`),
    getJSON2(`https://restcountries.com/v2/name/egypt`),
    getJSON2(`https://restcountries.com/v2/name/mexico`),
  ]);
  // console.log(res[0]);
})();

//! nother example

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, 1000);
  });
};

// Promise.race([
//   getJSON2(`https://restcountries.com/v2/name/tanzania`),
//   timeout(5),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.log(err));

//! allSettled VS all VS any

// Promise.allSettled([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another Success'),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.log(err));

//! all

// Promise.all([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another Success'),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.log(err));

//!any[ES2021]

// Promise.any([
//   Promise.resolve('Success'),
//   Promise.reject('ERROR'),
//   Promise.resolve('Another Success'),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.log(err));

//!! challenge

//   The Complete JavaScript Course 33
// Coding Challenge #3
// Your tasks:
// PART 1
// 1. Write an async function 'loadNPause' that recreates Challenge #2, this time
// using async/await (only the part where the promise is consumed, reuse the
// 'createImage' function from before)
// 2. Compare the two versions, think about the big differences, and see which one
// you like more
// 3. Don't forget to test the error handler, and to set the network speed to “Fast 3G”
// in the dev tools Network tab
// PART 2
// 1. Create an async function 'loadAll' that receives an array of image paths
// 'imgArr'
// 2. Use .map to loop over the array, to load all the images with the
// 'createImage' function (call the resulting array 'imgs')
// 3. Check out the 'imgs' array in the console! Is it like you expected?
// 4. Use a promise combinator function to actually get the images from the array 😉
// 5. Add the 'parallel' class to all the images (it has some CSS styles)
// Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-
// 3.jpg']. To test, turn off the 'loadNPause' function
// GOOD LUCK 😀

const wait = function (second) {
  return new Promise(function (resolve) {
    setTimeout(resolve, second * 1000);
  });
};
const imgContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};
let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Img 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     console.log('Img 2 loaded');
//     return wait(200);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.log(err));
//!part1
const loadNPause = async function () {
  try {
    //img 1
    let img = await createImage('img/img-1.jpg');
    console.log('Img 1 loaded');
    await wait(2);
    img.style.display = 'none';
    //img 2
    img = await createImage('img/img-2.jpg');
    console.log('Img 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.error();
    err;
  }
};

// loadNPause();

//! part 2

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    // console.log(imgs);

    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);


























