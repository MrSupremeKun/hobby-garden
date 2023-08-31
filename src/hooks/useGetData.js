import { useEffect, useState } from "react"

const url = process.env.REACT_APP_API_URL
const key = process.env.REACT_APP_API_KEY

export default function useGetData(path) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${url}/${path}?api_key=${key}`)
                const data = await response.json()
                setData(data)
                setLoading(false)
            } catch (err) {
                setError(err)
                setLoading(false)
            }
        }
        getData()
    }, [path])

    return [data, loading, error]
}