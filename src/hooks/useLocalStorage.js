import { useEffect, useState } from 'react';

export default function useLocalStorage(key, initialValue) {
    //you can edit this function like this https://blog.logrocket.com/using-localstorage-react-hooks/
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue != null) return JSON.parse(jsonValue);
        if (typeof initialValue === 'function') {
            return initialValue();
        }
        else {
            return initialValue;
        }
    })

    useEffect(()=> {
        localStorage.setItem(key, JSON.stringify(value))
        console.log(value);
    },[key, value])
   
    return [value,setValue];
}
