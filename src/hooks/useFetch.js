import { useEffect, useState } from "react";

/**
 * A custom hook created for making a fetch request. 
 * It can be used to make fetch requests within other components.
 * @param {*} uri 
 * When the request is successful and data is retrieved, it will be passed to the component from this hook. 
 * If something goes wrong, then this hook will return the error.
 */
export default function useFetch(uri) {
  const [data, setData] = useState();
  const [error, setError] = useState();

    if(!uri) return;
    fetch(uri)
      .then((response) => {
        return response.json();
      })
      .then(setData)
      .catch(setError);

  return {
    data,
    error
  };
}