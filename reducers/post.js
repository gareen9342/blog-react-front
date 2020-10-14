// import { DRAFT_STATE } from 'immer/dist/internal'
import {
    UPLOAD_POST_REQUEST,
    UPLOAD_POST_SUCCESS,
    UPLOAD_POST_FAILURE,
    ADD_CATEGORY_REQUEST,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAILURE,
    LOAD_MAINPOST_REQUEST,
    LOAD_MAINPOST_SUCCESS,
    LOAD_MAINPOST_FAILURE,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UNLIKE_POST_FAILURE,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,
    DELETE_COMMENT_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    DELETE_POST_REQUEST,
    LOAD_POSTLIST_SUCCESS,
    LOAD_POSTLIST_FAILURE,
    LOAD_POSTLIST_REQUEST,
    LOAD_SINGLE_POST_SUCCESS,
    LOAD_SINGLE_POST_FAILURE,
    LOAD_SINGLE_POST_REQUEST,
    LOAD_HASHTAG_POSTS_SUCCESS,
    LOAD_HASHTAG_POSTS_FAILURE,
    LOAD_HASHTAG_POSTS_REQUEST,
} from '../types/post'
import produce from '../util/produce'

const initialState = {
    uploadPostLoading: false,
    uploadPostDone: false,
    uploadPostError: null,
    addCategoryLoading: false,
    addCategoryDone: false,
    addCategoryError: null,
    loadSinglePostLoading: false,
    loadSinglePostDone: false,
    loadSinglePostError: null,
    likePostLoading: false,
    likePostDone: false,
    likePostError: null,
    unlikePostLoading: false,
    unlikePostDone: false,
    unlikePostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
    deleteCommentLoading: false,
    deleteCommentDone: false,
    deleteCommentError: null,
    deletePostLoading: false,
    deletePostDone: false,
    deletePostError: null,
    loadPostListLoading: false,
    loadPostListDone: false,
    loadPostListError: null,
    hashtagPostListLoading: false,
    hashtagPostListDone: false,
    hashtagPostListError: null,
    singlePost: {},
    categoryPostList: {},
    hashtagPostList: [],
}

// 이전 상태를 액션을 ㄴ통해 다음 상태로 만들어 내는 함수 (불변성은 지키면서)

const reducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case UPLOAD_POST_REQUEST:
                draft.uploadPostLoading = true
                draft.uploadPostDone = false
                draft.uploadPostError = null
                break
            case UPLOAD_POST_SUCCESS:
                draft.uploadPostLoading = false
                draft.uploadPostDone = true
                break
            case UPLOAD_POST_FAILURE:
                draft.uploadPostDone = true
                draft.uploadPostError = action.error
                break
            case ADD_CATEGORY_REQUEST:
                draft.addCategoryLoading = true
                draft.addCategoryDone = false
                draft.addCategoryError = null
                break
            case ADD_CATEGORY_SUCCESS:
                draft.addCategoryLoading = false
                draft.addCategoryDone = true
                break
            case ADD_CATEGORY_FAILURE:
                draft.addCategoryDone = true
                draft.addCategoryError = action.error
                break
            case LOAD_SINGLE_POST_REQUEST:
                draft.loadSinglePostLoading = true
                draft.loadSinglePostDone = false
                draft.loadSinglePostError = null
                break
            case LOAD_SINGLE_POST_SUCCESS:
                draft.loadSinglePostLoading = false
                draft.loadSinglePostDone = true
                draft.singlePost = action.data
                break
            case LOAD_SINGLE_POST_FAILURE:
                draft.loadSinglePostDone = true
                draft.loadSinglePostError = action.error
                break
            case LIKE_POST_REQUEST:
                draft.likePostLoading = true
                draft.likePostDone = false
                draft.likePostError = null
                break
            case LIKE_POST_SUCCESS: {
                draft.singlePost.Likers.push({
                    id: action.data.userId,
                })
                draft.likePostLoading = false
                draft.likePostDone = true
                break
            }
            case LIKE_POST_FAILURE:
                draft.likePostDone = true
                draft.likePostError = action.error
                break
            case UNLIKE_POST_REQUEST:
                draft.unlikePostLoading = true
                draft.unlikePostDone = false
                draft.unlikePostError = null
                break
            case UNLIKE_POST_SUCCESS: {
                draft.singlePost.Likers = draft.singlePost.Likers.filter(
                    (y) => y.id !== action.data.userId
                )
                draft.unlikePostLoading = false
                draft.unlikePostDone = true
                break
            }
            case UNLIKE_POST_FAILURE:
                draft.unlikePostDone = true
                draft.unlikePostError = action.error
                break
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true
                draft.addCommentDone = false
                draft.addCommentError = null
                break
            case ADD_COMMENT_SUCCESS:
                draft.singlePost.Comments.push(action.data)
                draft.addCommentLoading = false
                draft.addCommentDone = true
                break
            case ADD_COMMENT_FAILURE:
                draft.addCommentDone = true
                draft.addCommentError = action.error
                break
            case DELETE_COMMENT_REQUEST:
                draft.deleteCommentLoading = true
                draft.deleteCommentDone = false
                draft.deleteCommentError = null
                break
            case DELETE_COMMENT_SUCCESS: {
                draft.singlePost.Comments = draft.singlePost.Comments.filter(
                    (y) => y.id !== +action.data.commentId
                )
                draft.deleteCommentLoading = false
                draft.deleteCommentDone = true
                break
            }
            case DELETE_COMMENT_FAILURE:
                draft.deleteCommentDone = true
                draft.deleteCommentError = action.error
                break
            case DELETE_POST_REQUEST:
                draft.deletePostLoading = true
                draft.deletePostDone = false
                draft.deletePostError = null
                break
            case DELETE_POST_SUCCESS: {
                // if (draft.singlePost.id === action.data.postId) {
                //     draft.singlePost = null
                // }
                draft.deletePostLoading = false
                draft.deletePostDone = true
                break
            }
            case DELETE_POST_FAILURE:
                draft.deletePostDone = true
                draft.deletePostError = action.error
                break
            case LOAD_POSTLIST_REQUEST:
                draft.loadPostListLoading = true
                draft.loadPostListDone = false
                draft.loadPostListError = null
                break
            case LOAD_POSTLIST_SUCCESS: {
                draft.categoryPostList = action.data.posts
                // draft.singlePost = action.data.post
                draft.loadPostListLoading = false
                draft.loadPostListDone = true
                break
            }
            case LOAD_POSTLIST_FAILURE:
                draft.loadPostListDone = true
                draft.loadPostListError = action.error
                break
            case LOAD_HASHTAG_POSTS_REQUEST:
                draft.hashtagPostListLoading = true
                draft.hashtagPostListDone = false
                draft.hashtagPostListError = null
                break
            case LOAD_HASHTAG_POSTS_SUCCESS: {
                draft.hashtagPostList = action.data
                draft.loadPostListLoading = false
                draft.loadPostListDone = true
                break
            }
            case LOAD_HASHTAG_POSTS_FAILURE:
                draft.hashtagPostListDone = true
                draft.hashtagPostListError = action.error
                break
            default:
                break
        }
    })

export default reducer
