// import axios from 'axios'
// import useSWR from 'swr'
// // import { useSWRInfinite } from 'swr'

// const fetcher = (url) =>
//     axios.get(url, { withCredentials: true }).then((result) => result.data)

// const useGuestbook = () => {
//     const uri = `${
//         process.env.NODE_ENV === 'production' ? backUrl : 'http://localhost:80'
//     }/guestbook?page=1`
//     const { data: guestbooks, error, mutate } = useSWR(uri, fetcher)
//     return {
//         guestbooks,
//         isLoading: !error && !guestbooks,
//         loadGuestbookError: error,
//         mutate,
//         uri,
//     }
// }
// export default useGuestbook
