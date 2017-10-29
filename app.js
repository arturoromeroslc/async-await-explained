const asyncAPICall = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  })
}

asyncAPICall('https://swapi.co/api/people/1/').then(function (data) {
  console.log(data);
})
