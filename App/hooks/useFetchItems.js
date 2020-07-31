import { useState, useEffect } from "react"

export const useFetchItems = (getItems) => {

    const [state, setState] = useState({
        data: [],
        loading: true,
    });

    useEffect(() => {
        getItems()
            .then(items => {
                setState({
                    data: items,
                    loading: false
                });
            })

    }, []);

    return state;

}
