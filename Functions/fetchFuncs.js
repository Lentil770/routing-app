
export function fetchFunc(url, type) {
    fetch(url)
    .then(response => {
      if (response.ok) {
        console.log(`${type}ok!`);
      } else {
      throw new Error
      }
    })
    .catch(err => console.log(`${type} error`, err))
}

