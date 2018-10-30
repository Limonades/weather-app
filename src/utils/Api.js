export const callApi = (url, options) =>
  fetch(url, options).then(response => {
    if (response.status === 200) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
