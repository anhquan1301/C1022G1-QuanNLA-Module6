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
export const productService = {
    detail,
    findByName,
    findAllProductType,
    findAllProducer
}
export default productService