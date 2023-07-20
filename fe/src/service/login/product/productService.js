import request from "../../../request"

const detail = (id)=>{
    try {
        return request.get(`/product/detail?id=${id}`)
    } catch (error) {
        console.log(error);
    }
}
const findByName = ({name,productTypeId,producerId,minPrice,maxPrice},page,sortType)=>{
    console.log({ name,productTypeId,producerId,minPrice,maxPrice});
    try {
        return request.get(`/product?name=${name?name:''}&productTypeId=${productTypeId?productTypeId:''}&producerId=${producerId?producerId:''}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page ? page : 0}&sortType=${sortType}`)
    } catch (error) {
        console.log(error);
    }
}
const findAllProductType = ()=>{
    try {
        return request.get(`/product-type`)
    } catch (error) {
        console.log(error);
    }
}
const findAllProducer = ()=>{
    try {
        return request.get(`/producer`)
    } catch (error) {
        console.log(error);
    }
}
const fildAllCapacity = ()=>{
    try {
        return request.get(`/capacity`)
    } catch (error) {
        console.log(error);
    }
}
const productSaleList = ()=>{
    try {
        return request.get(`/product/sale-list`)
    } catch (error) {
        console.log(error);
    }
}
const productCreate = (value)=>{
    const token = localStorage.getItem('token')
    console.log(value);
    try {
        return request.post(`/product/create`,{ ...value }, {
            headers : {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error);
    }
}
const deleteProduct = (id)=>{
    const token = localStorage.getItem('token')
    try {
        return request.delete(`/product/delete?id=${id}`, {
            headers : {
                'Authorization': `Bearer ${token}`
            }
        })
    } catch (error) {
        console.log(error);
    }
}
export const productService = {
    detail,
    findByName,
    findAllProductType,
    findAllProducer,
    productSaleList,
    fildAllCapacity,
    productCreate,
    deleteProduct
}
export default productService