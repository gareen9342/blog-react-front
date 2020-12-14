import axios from 'axios'
import useSWR from 'swr'
// import { useSWRInfinite } from 'swr'

const fetcher = (url) =>
    axios.get(url, { withCredentials: true }).then((result) => result.data)

const useGuestbook = (lastId) => {
    const { data: guestbooks, error, mutate } = useSWR(
        `${
            process.env.NODE_ENV === 'production'
                ? backUrl
                : 'http://localhost:80'
        }/guestbook?lastId=${lastId || 0}`,
        fetcher
    )
    return {
        guestbooks,
        isLoading: !error && !guestbooks,
        loadGuestbookError: error,
        mutate,
    }
}
export default useGuestbook
