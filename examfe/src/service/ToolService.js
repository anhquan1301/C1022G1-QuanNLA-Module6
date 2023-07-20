import axios from 'axios'
export const findByNameTool = (name,page)=>{
    try {
        const rs = axios.get(`http://localhost:8080/tool?name=${name?name:''}&page=${page?page:0}`)
        return rs
    } catch (error) {
        console.log(error);
    }
}
export const toolCreate = (value)=>{
    try {
        const rs = axios.post(`http://localhost:8080/tool`,{ ...value })
        return rs
    } catch (error) {
        console.log(error);
    }
}
