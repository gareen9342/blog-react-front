import ApiService from '../.apiService'

const postService = {
    editPost: (data) => {
        return ApiService.patch(`post/${data.id}`, data)
    },
}
export default postService
