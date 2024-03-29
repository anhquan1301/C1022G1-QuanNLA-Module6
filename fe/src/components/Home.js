import { useEffect, useState } from "react"
import productService from "../service/login/product/productService"
import {  useNavigate } from "react-router-dom"
export default function Home() {
    const [productSaleList, setProductSaleList] = useState([])
    
    const getProductSaleList = async () => {
        try {
            const res = await productService.productSaleList()
            console.log(res);
            setProductSaleList(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getProductSaleList()
        document.title = "Trang Chủ";
    }, [])

    const navigate = useNavigate()
    const handleDetailProduct = (id)=>{
        navigate('/product/detail/' + id)
    }
    console.log(productSaleList);
    return (
        <>
            <div style={{ marginTop: 117 }}>
                {/* Carousel */}
                <div id="demo" className="carousel slide" data-bs-ride="carousel">
                    {/* Indicators/dots */}
                    <div className="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#demo"
                            data-bs-slide-to={0}
                            className="active"
                        />
                        <button type="button" data-bs-target="#demo" data-bs-slide-to={1} />
                        <button type="button" data-bs-target="#demo" data-bs-slide-to={2} />
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                src="dieucosmetics.png"
                                alt="New York"
                                className="d-block"
                                style={{ width: "100%", height: 600, backgroundSize: 'cover' }}
                            />


                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://theme.hstatic.net/1000373343/1000671881/14/slideshow_1.jpg?v=81"
                                alt=""
                                className="d-block"
                                style={{ width: "100%", height: 600, backgroundSize: 'cover' }}
                            />

                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://theme.hstatic.net/1000373343/1000671881/14/slideshow_3.jpg?v=81"
                                alt=""
                                className="d-block"
                                style={{ width: "100%", height: 600, backgroundSize: 'cover' }}
                            />
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#demo"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" />
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#demo"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" />
                    </button>
                </div>
            </div>
            <section className="service-policy-area section-space container">
                <div className='container mt-5'>
                    <div className="d-flex">
                        <div className="col-lg-2 mx-4 px-0">
                            <a href="">
                                <img src="https://theme.hstatic.net/200000384051/1000742014/14/home_brand_image_1.jpg?v=1609"
                                    className="d-block w-100  h-100 img-producer" alt="..." />
                            </a>
                        </div>
                        <div className="col-lg-2 mx-4 px-0">
                            <a href="">
                                <img src="https://theme.hstatic.net/200000384051/1000742014/14/home_brand_image_2.jpg?v=1609"
                                    className="d-block w-100 h-100 img-producer" alt="..." />
                            </a>
                        </div>
                        <div className="col-lg-2 mx-4 px-0">
                            <a href="">
                                <img src="https://theme.hstatic.net/200000384051/1000742014/14/home_brand_image_3.jpg?v=1609"
                                    className="d-block w-100 h-100 img-producer" alt="..." />
                            </a>
                        </div>
                        <div className="col-lg-2 mx-4 px-0">
                            <a href="">
                                <img src="https://theme.hstatic.net/200000384051/1000742014/14/home_brand_image_4.jpg?v=1609"
                                    className="d-block w-100 h-100 img-producer" alt="..." />
                            </a>
                        </div>
                        <div className="col-lg-2 mx-4 px-0">
                            <a href="">
                                <img src="https://theme.hstatic.net/200000384051/1000742014/14/home_brand_image_7.jpg?v=1609"
                                    className="d-block w-100 h-100 img-producer" alt="..." />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="service-policy-area section-space container">
                <div ><h2 className='text-center bg-home text-secondary py-3'>SẢN PHẨM KHUYẾN MÃI</h2></div>
                <div className='container'>
                    <div id="carouselExampleControls" className="carousel carousel-dark slide " data-bs-ride="carousel">
                        <div className="carousel-inner ">
                            <div className="carousel-item active">
                                <div className="row d-flex justify-content-center mt-3">
                                    {
                                        productSaleList.slice(0,4).map((element, index) => (
                                            <div className="col-lg-2 mx-4 px-0" key={index}>
                                                <div type='button' onClick={()=>handleDetailProduct(element.id)} className="card-1" >
                                                    <img src={element.imageName} className="card-img-top" alt="..." />
                                                    <div className="card-body">
                                                        <div>{
                                                            element.name.length > 20 ? <h6>{element.name.slice(0, 20)}...</h6> : <h6>{element.name}</h6>
                                                        }</div>
                                                        <p>
                                                                <span className='text-decoration-line-through'>{
                                                                    +element.capacityProductPrice === 0 ? "": 
                                                                    (+element.capacityProductPrice).toLocaleString(
                                                                        "vi-VN",
                                                                        { style: "currency", currency: "VND" }
                                                                    )
                                                                }</span>
                                                                <span className='text-danger fs-6 float-end fw-bold'>{
                                                                    (+element.capacityProductPriceSale).toLocaleString(
                                                                        "vi-VN",
                                                                        { style: "currency", currency: "VND" }
                                                                    )
                                                                }</span>
                                                            </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row d-flex justify-content-center mt-3">
                                {
                                        productSaleList.slice(4).map((element, index) => (
                                            <div className="col-lg-2 mx-4 px-0" key={index}>
                                                <div type='button' onClick={()=>handleDetailProduct(element.id)} className="card-1" >
                                                    <img src={element.imageName} className="card-img-top" alt="..." />
                                                    <div className="card-body">
                                                        <div>{
                                                            element.name.length > 20 ? <h6>{element.name.slice(0, 20)}...</h6> : <h6>{element.name}</h6>
                                                        }</div>
                                                        <p>
                                                                <span className='text-decoration-line-through'>{
                                                                    +element.capacityProductPrice === 0 ? "": 
                                                                    (+element.capacityProductPrice).toLocaleString(
                                                                        "vi-VN",
                                                                        { style: "currency", currency: "VND" }
                                                                    )
                                                                }</span>
                                                                <span className='text-danger fs-6 float-end fw-bold'>{
                                                                    (+element.capacityProductPriceSale).toLocaleString(
                                                                        "vi-VN",
                                                                        { style: "currency", currency: "VND" }
                                                                    )
                                                                }</span>
                                                            </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </section>
            <hr className='mx-5 hr-dieucosmetics' />

            <div className="container px-0 mt-5">
                <div className="row mx-0 mt-2 mb-5 ms-5">
                    <div className="col-4">
                        <h4 style={{ color: 'GrayText', marginTop: 20 }}>
                            Tất cả đều là Mỹ phẩm Thảo dược và nó được bào chế, sử dụng các thành phần mỹ phẩm thảo dược được phép khác nhau, là các sản phẩm 100% từ Thảo dược nguyên chất và an toàn.
                        </h4>
                    </div>
                    <div className="col-4">
                        <img
                            className="w-100 h-100 shadow"
                            src="https://file.hstatic.net/200000259653/file/1_b43b5110a90346c6b860cd09ab127476.jpg"
                            alt=""
                        />
                    </div>
                    <div className="col-4">
                        <h4 style={{ textAlign: "center", color: 'GrayText', paddingTop: 20 }}>
                            KEM DƯỠNG MẶT THẢO DƯỢC
                        </h4>
                        <h6 style={{
                            color: 'black',
                            lineHeight: 2,
                            fontFamily: '"Cormorant Infant", "serif"'
                        }}>
                            Chứa thành phần dưỡng chất của Aloe Vera, Vitamin E và Vitamin B5, do đó nó làm dịu và làm mềm làn da của bạn và mang lại cho bạn một làn da sáng tự nhiên trên khuôn mặt của bạn.
                        </h6>
                    </div>
                </div>
                <div className="shadow-cosmetics-1">
                    <div className="row mx-0 bg-home text-white ">
                        <div className="row container mx-0 px-0">
                            <div className="column col-6 px-0 figure" id="zoomIn">
                                <img className="w-100 h-100 " src="https://theme.hstatic.net/200000384051/1000742014/14/home_about_img.jpg?v=1609" />
                            </div>
                            <div className="col-6 mt-2">
                                <h3 style={{ textAlign: "center", color: 'GrayText', paddingTop: 30 }}>BST MỸ PHẨM CHÍNH HÃNG DieuCosmetics</h3>
                                <h6 style={{
                                    color: 'black',
                                    lineHeight: 2,
                                    paddingTop: 20,
                                    paddingLeft: 30,
                                    paddingRight: 30,
                                    fontFamily: '"Cormorant Infant", "serif"'
                                }}>
                                    Hướng đến trang điểm cá nhân với thiết kế đơn giản, tiện dụng, nhỏ gọn, tiện lợi mang theo, chất lượng tốt, giá rẻ. Với các thành phần dưỡng chất đến từ collagen cá, tinh dầu bơ, mật ong, tinh chất các loài hoa: hoa anh đào, hoa citron,… bột ngọc trai, vitamin E, chiết xuất trà xanh, tinh dầu bơ hạt mỡ,….Tích hợp thành phần chống nắng, dưỡng da, kiềm dầu, cân bằng độ ẩm, hạn chế các hoạt động của mụn và ổ viêm gây mụn, se khít lỗ chân lông, tái tạo lớp biểu bì.
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className="row mx-0 ">
                        <div className="row container mx-0 px-0 ">
                            <div className="col-6 mt-2 px-0" >
                                <h3 style={{ textAlign: "center", color: 'GrayText', paddingTop: 30 }}>PHÂN PHỐI ĐA DẠNG CÁC DÒNG SẢN PHẨM</h3>
                                <h6 style={{
                                    color: 'black',
                                    lineHeight: 2,
                                    paddingTop: 10,
                                    paddingLeft: 30,
                                    paddingRight: 30,
                                    fontFamily: '"Cormorant Infant", "serif"'
                                }}>
                                    DieuCosmetics hiện đang phân phối các dòng mỹ phẩm trang điểm: Kem lót, kem nền, phấn nước cushion, kem che khuyết điểm, phấn phủ, bút kẻ chân mày, phấn má hồng, chì kẻ mắt, mascara, phấn mắt, kem chống nắng, son môi. Một vài sản phẩm skin care: Serum dưỡng dài mi, các sản phẩm nước tẩy trang (dạng nước, dạng dầu, dạng kem), sữa rửa mặt. Dịu nhẹ, thích hợp với da nhạy cảm, mụn dầu của các cô gái Á Đông. Giúp bạn thoải mái trang điểm mà không lo đổ dầu, nổi mụn hay kích ứng, lâu trôi.                            </h6>
                            </div>
                            <div className="col-6 px-0 column figure" id="zoomIn">
                                <img className="w-100 h-100 " src="https://file.hstatic.net/200000259653/file/3_c36448acd2764e8a8d49c4fd740a8523.jpg" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <hr className='mx-5 hr-dieucosmetics mt-5' />

            <div className="container mt-5 bg-home py-5 mb-5">
                <div className="row ">
                    <div className="col-lg-3 col-md-6 col-sm-6">

                        <div className="service-policy-item">
                            <div className="icons">
                                <img src="https://demo.hasthemes.com/floda-preview/floda/assets/img/icon/free_shipping.png" alt="" />
                            </div>
                            <div className="policy-terms">
                                <h5>Miễn Phí Giao Hàng</h5>
                                <p>Miễn phí giao hàng toàn quốc</p>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">

                        <div className="service-policy-item">
                            <div className="icons">
                                <img src="https://demo.hasthemes.com/floda-preview/floda/assets/img/icon/support247.png" alt="" />
                            </div>
                            <div className="policy-terms">
                                <h5>Hỗ Trợ 24/7</h5>
                                <p>Hỗ trợ 24h trong 1 ngày</p>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">

                        <div className="service-policy-item">
                            <div className="icons">
                                <img src="https://demo.hasthemes.com/floda-preview/floda/assets/img/icon/money_back.png" alt="" />
                            </div>
                            <div className="policy-terms">
                                <h5>Hoàn Trả Lại Tiền</h5>
                                <p>Hoàn trả lại tiền trong vòng 30 ngày</p>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">

                        <div className="service-policy-item">
                            <div className="icons">
                                <img src="https://demo.hasthemes.com/floda-preview/floda/assets/img/icon/promotions.png" alt="" />
                            </div>
                            <div className="policy-terms">
                                <h5>Giảm Giá Đặt Hàng</h5>
                                <p>Giảm giá 5% trên mỗi đơn hàng</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}