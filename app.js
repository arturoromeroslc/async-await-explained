const appContainer = document.getElementById('app')

const appendNewData = (data) => {
  const createdElement = document.createElement('div');
  createdElement.innerHTML = `
  NAME: <br /><strong>${data.name}</strong><br />
  Birth Year: <br /><strong>${data.birth_year}</strong>
  <hr>
  `
  appContainer.appendChild(createdElement);
}

const asyncAPICall = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => resolve(JSON.parse(xhr.responseText));
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  })
}

//single Promise
asyncAPICall('https://swapi.co/api/people/1/')
  .then(data => {
    appContainer.innerHTML = `
      NAME: <br /><strong>${data.name}</strong><br />
      Birth Year: <br /><strong>${data.birth_year}</strong>
      <hr>
    `
  })

/*
composing Promises
1. Makes an HTTP call, waits for it to complete, and prints the result;
2. then makes other two parallel HTTP calls;
3. When both of them complete, prints their result.

Promise.all = (n) promises run concurrently and we schedule a callback, when (n) promises complete,
so we combine them into a single promie with promise.all
 */
 const callFirstPromise = asyncAPICall('https://swapi.co/api/people/2/')

 callFirstPromise.then((data) => {
   appendNewData(data);
   const callSecondPromise = asyncAPICall('https://swapi.co/api/people/3/')
   const callThirdPromise = asyncAPICall('https://swapi.co/api/people/4/')

   return Promise.all([callSecondPromise, callThirdPromise])
 }).then((arrayOfReturnedPromises) => {
   appendNewData(arrayOfReturnedPromises[0])
   appendNewData(arrayOfReturnedPromises[1])
 })

/*
Introducing ASYNC functions
* An async function is a function shortcut which returns a promise
 */
const returnPromise = () => {
  return Promise.resolve('resolved promise')
}

const returnAsync = async () => {
  return 'return async promise'
}

/*
Now await it, which is the same as .then
 */
const solution = async () => {
  console.log('Inside of the promise async');

  // call the async calls, which is a new promise.
  const call2Promise = asyncAPICall('https://swapi.co/api/people/6/');
  const call3Promise = asyncAPICall('https://swapi.co/api/people/6/');

  // Now await
  const call2PromiseResponse = await call2Promise;
  const call3PromiseResponse = await call3Promise;

  //now that we waited we can now use them.
  appendNewData(call2PromiseResponse);
  appendNewData(call3PromiseResponse);
}

// Call the async function
solution().then(() => console.log('Finished'));
