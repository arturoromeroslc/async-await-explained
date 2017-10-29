const appContainer = document.getElementById('app')
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
    console.log(data);
    appContainer.innerHTML = `
      NAME: <br /><strong>${data.name}</strong><br />
      Birth Year: <br /><strong>${data.birth_year}</strong>
    `
  })
  .catch(err => console.log(err))

/*
composing Promises
1. Makes an HTTP call, waits for it to complete, and prints the result;
2. then makes other two parallel HTTP calls;
3. When both of them complete, prints their result.
 */

 const callFirstPromise = asyncAPICall('https://swapi.co/api/people/2/')

 callFirstPromise.then((data) => {
   console.log(data);
   const createdElement = document.createElement('div');
   createdElement.innerHTML = `
   NAME: <br /><strong>${data.name}</strong><br />
   Birth Year: <br /><strong>${data.birth_year}</strong>`
   appContainer.appendChild(createdElement)
   console.log(appContainer);
   console.log(createdElement);
 })
