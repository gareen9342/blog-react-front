import ApiService from '../.apiService'

const guestbookService = {
    postGuestbook: (data) => {
        return ApiService.post(`guestbook/`, data)
    },
    getGuestbooks: () => {
        return ApiService.get(`guestbook/`)
    },
    editGuestbook: (data) => {
        return ApiService.patch(`guestbook/`, data)
    },
}
export default guestbookService
