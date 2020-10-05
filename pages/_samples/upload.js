import axios from 'axios'

export const File = {
    objectId: '',
}
export const uploadFile = (data) => {
    return axios.post('/post', data)
}
