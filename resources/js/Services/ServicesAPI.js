import { fetchAPI } from "./FetchAPI";

const fetchUserSettings = (id) => {
    return fetchAPI(route('setting.show', id))
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.log(error.message)
        })
}

export { fetchUserSettings }