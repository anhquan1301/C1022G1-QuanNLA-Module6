import request from "../../../request"

const detail = () => {
    const token = localStorage.getItem('token')
    try {
        const res = request.get('/customer/detail',
            {
                headers:
                {
                    'Authorization': 'Bearer ' + token
                }
            }
        )
        return res
    } catch (error) {
        console.log(error);
    }
}

export const customerService = {
    detail
}
export default customerService