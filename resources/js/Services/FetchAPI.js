const fetchAPI = async (url, body) => {
    let response = await fetch(url, body);
    let data = await response.json();

    return data;
}

export {fetchAPI};