import axios from 'axios'

export const loadGroupBoxAction = async () => {
    try{
        // const token = 
        const response = axios({
            method : 'get',
            url : 'http://localhost:8080/channels',
            headers : {
                // Authorization : 
            }
        }) 
    } catch (err) {
        console.log(err)
    }
}