import { backUrl } from '../config/config'
import axios from 'axios'

const ApiService = () => {}

ApiService.get = async (uri, data) => {
    let result = {}
    await axios
        .get(
            `${
                process.env.NODE_ENV === 'production'
                    ? backUrl
                    : 'http://localhost:80'
            }/${uri}`,
            { withCredentials: true }
        )
        .then((res) => {
            result = res
        })
        .catch((err) => console.error(err))
    return result
}

ApiService.patch = async (uri, data) => {
    let result = {}
    await axios
        .patch(
            `${
                process.env.NODE_ENV === 'production'
                    ? backUrl
                    : 'http://localhost:80'
            }/${uri}`,
            data,
            { withCredentials: true }
        )
        .then((res) => {
            result = res.data
        })
        .catch((err) => console.error(err))
    return result
}

ApiService.post = async (uri, data) => {
    let result = {}
    await axios
        .post(
            `${
                process.env.NODE_ENV === 'production'
                    ? backUrl
                    : 'http://localhost:80'
            }/${uri}`,
            data,
            { withCredentials: true }
        )
        .then((res) => {
            result = res.data
        })
        .catch((err) => {
            if (err.response && err.response.data.message) {
                // alert(err.response.data.message) // some reason error message
            }
            // console.error(err)
        })
    return result
}

ApiService.delete = async (uri, data) => {
    let result = {}
    await axios
        .delete(
            `${
                process.env.NODE_ENV === 'production'
                    ? backUrl
                    : 'http://localhost:80'
            }/${uri}`,
            { withCredentials: true }
        )
        .then((res) => {
            result = res.data
        })
        .catch((err) => {
            if (err.response && err.response.data) {
                alert(err.response.data.message) // some reason error message
            }
            console.error(err)
        })
    return result
}
export default ApiService
