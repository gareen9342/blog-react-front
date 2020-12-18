import { useSWRInfinite } from 'swr'

const fetcher = (url) =>
    axios.get(url, { withCredentials: true }).then((result) => result.data)

const usePaginatePosts = () => {
    const PAGE_LIMIT = 10

    const { data, error, size, setSize, mutate } = useSWRInfinite(
        () =>
            `$${
                process.env.NODE_ENV === 'production'
                    ? backUrl
                    : 'http://localhost:80'
            }/guestbook?page=${size + 1}?limit=${PAGE_LIMIT}`,
        fetcher
    )

    const guestbooks = data ? [].concat(...data) : []
    const isLoadingInitialData = !data && !error
    const isLoadingMore =
        isLoadingInitialData ||
        (size > 0 && data && typeof data[size - 1] === 'undefined')
    const isEmpty = data?.[0]?.length === 0
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.length < PAGE_LIMIT)

    return {
        guestbooks,
        error,
        isLoadingMore,
        size,
        setSize,
        isReachingEnd,
        mutate,
    }
}
export default usePaginatePosts
