import axios from 'axios'
import useSWR from 'swr'

const fetcher = (url) =>
    axios.get(url, { withCredentials: true }).then((result) => result.data)

const useGuestbook = () => {
    const { data, error, mutate } = useSWR(
        `${
            process.env.NODE_ENV === 'production'
                ? backUrl
                : 'http://localhost:80'
        }/guestbook`,
        fetcher
    )
    return {
        guestbooks: data,
        isLoading: !error && !data,
        loadGuestbookError: error,
        mutate,
    }
}
export default useGuestbook
