const useGetHost: () => string = () => {
    let host = window.location.host
    host = host.slice(0, host.length - 4)
    host = host + 4000

    return host
}

export default useGetHost