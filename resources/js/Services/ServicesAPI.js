import { fetchAPI } from "./FetchAPI";

const fetchCreateRole = (data = {}) => {
    return fetchAPI("http://localhost/admin/role", data)
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error(error.message)
        })
}

export { fetchCreateRole}