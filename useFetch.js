import { useEffect, useRef, useState } from "react";


export const useFetch = ( url ) => {

    const isMounted = useRef(true);
    const [state, setState] = useState({ data:null, loading: true, error: null });
    useEffect(() => {
        isMounted.current=true;
        return () => {
            isMounted.current=false;
        }
    }, [])

    useEffect(() => {

        setState({ data:null, loading: true, error: null });
        
        fetch(url)
            .then( resp => resp.json() )
            .then( data => {
                if (isMounted.current){
                    setState({
                        loading: false,
                        error: null,
                        data                    
                    });    
                } else {
                    console.log('No se llamo');
                }
                
            })
            .catch( ()=> {
                setState({
                    data:null, 
                    loading: false, 
                    error: 'No se pudo cargar la info'
                });
            });

        return () => {            
        }
    }, [url])

    return state;

}
