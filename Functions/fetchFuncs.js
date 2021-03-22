
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

export function postFeedback(url, feedbackToSend) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({feedback: feedbackToSend})
  })
  .then(response => {
      if (response.ok) {
          console.log('feedback successfully submitted');
      } else {
          throw new Error;
      }
  })
  .catch((error) => {
    console.error('Error:', error);
  })
}