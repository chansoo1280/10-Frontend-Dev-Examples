import React, { useEffect, useState } from "react"

const useLoading = ({ loading = false }: { loading?: boolean }) => {
    const [innerLoading, setLoading] = useState(loading)
    useEffect(() => {
        setLoading(loading)
    }, [loading])
    return { innerLoading }
}
export default useLoading
