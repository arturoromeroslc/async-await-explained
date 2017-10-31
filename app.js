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
