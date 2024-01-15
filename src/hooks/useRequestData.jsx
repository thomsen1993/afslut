import { useState } from 'react'
import axios from 'axios'

const useRequestData = () => {

    const [ isLoading, setisLiading ] = useState(false)
    const [ data, setData ] = useState(null)
    const [ error, setError ] = useState(null)

    const makeRequest = async (apiurl, method = "GET", bodydata = null, headers = null, params = null) => {

        setisLiading(true)

        setTimeout (async () => {
            
            try {

                let response

                switch (method) {
                    case "GET":
                        response = await axios.get(apiurl, {headers: headers, params: params})
                        break;
                    case "POST":
                        response = await axios.post(apiurl, bodydata, {headers: headers, params: params})
                        break;
                    case "PUT":
                        response = await axios.put(apiurl, bodydata, {headers: headers, params: params})
                        break;
                    case "PATCH":
                        response = await axios.patch(apiurl, bodydata, {headers: headers, params: params})
                        break;
                    case "DELETE":
                        response = await axios.delete(apiurl, {headers: headers, params: params})
                        break;
                
                    default:
                        throw new Error("Invalid method")
                }
                
                
                
                //if (response && response.data != undefined) {
                if (response.data) {
                    
                    setData(response.data)
                    setError(null)
                    
                } else {
                    
                    throw new Error ("Tomt response/ingen data")
                    
                }
                
            } catch (error) {
                setError("Der er opstået en fejl: " + error.message)
            setData(null)
            
            } finally {
                
                setisLiading(false)
                
            }
        })

    }

    return{ data, isLoading, error, makeRequest }
  
}

export default useRequestData