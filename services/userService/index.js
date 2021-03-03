import ApiService from '../.apiService'

const postService = {
    changePassword: (data) => {
        return ApiService.patch(`user/change-password`, data)
    },
    resetPassword: (data) => {
        return ApiService.post(`user/reset-password`, data)
    },
    
}
export default postService
