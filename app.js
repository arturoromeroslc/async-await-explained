const asyncAPICall = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => resolve(JSON.parse(xhr.responseText));
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  })
}

asyncAPICall('https://swapi.co/api/people/1/')
  .then(data => {
    console.log(data);
    document.getElementById('app').innerHTML = `
      NAME: <br /><strong>${data.name}</strong><br />
      Birth Year: <br /><strong>${data.birth_year}</strong>
    `
  })
  .catch(err => console.log(err))
