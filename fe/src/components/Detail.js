import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import productService from "../service/login/product/productService";
import Swal from "sweetalert2";


export default function Detail() {
    const [activeButton, setActiveButton] = useState(0);
    const [capacityId, setCapacityId] = useState(0);
    const [quantity, setQuantity] = useState(1)
    const [productDetail, setProductDetail] = useState()
    const handleButtonClick = (buttonIndex, id) => {
        setActiveButton(buttonIndex);
        setCapacityId(id)
        setQuantity(1)
    };
    const param = useParams()
    useEffect(() => {
        const detail = async () => {
            try {
                const res = await productService.detail(param.id)
                setProductDetail(res.data)
                setCapacityId(res.data.capacityProductSet[0].capacity.id)
            } catch (error) {
                console.log(error);
            }
        }
        detail()
    }, [param.id])
    if (!productDetail) {
        return null
    }
    console.log(activeButton);
    console.log(productDetail);
    return (
        <>
            <div className=" bg-home">
                <div className="p-5">
                    <div style={{ marginTop: 100 }}>
                        <NavLink to={'/'} className="bi bi-house text-secondary fs-4 text-decoration-none ms-5 ps-2">
                            <span className="ms-2 fw-normal fs-5">Trang chủ</span>
                            </NavLink>
                            <span className="ms-2 fw-normal fs-5 text-secondary">/</span>
                            <NavLink to={'/product'} className={'text-secondary fs-4 text-decoration-none  ps-2'}>
                            <span className="fw-normal fs-5">Sản phẩm</span>
                            </NavLink>
                    </div>
                    <div className="container bg-white shadow-cosmetics-1 mt-3">
                        <div className="row mx-0" >
                            <div id="carouselExampleIndicators" className="carousel slide d-flex col-6">
                                <div className="col-4">
                                    <div className="carousel-indicators-1 mt-5 pt-3">
                                        {
                                            productDetail?.imageSet.map((img, index) => (
                                                <div key={index}>
                                                    <img
                                                        src={img.name}
                                                        data-bs-target="#carouselExampleIndicators"
                                                        data-bs-slide-to={index++}
                                                        className="float-end"
                                                        aria-current="true"
                                                        aria-label={`Slide ${img.id}`}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="col-8 p-0">
                                    <div className="carousel-inner">
                                        {
                                            productDetail?.imageSet.map((img, index) => (
                                                <div className={index === 0 ? "carousel-item active" : "carousel-item"} key={index}>
                                                    <img
                                                        src={img.name}
                                                        alt="New York"  
                                                        className="d-block"
                                                        style={{ width: "100%", height: 500, backgroundSize: 'cover',objectFit: 'contain' }}
                                                    />
                                                </div>
                                            ))
                                        }

                                    </div>

                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mt-5 text-secondary">
                                    <h3>{productDetail?.name}</h3>
                                </div>
                                <div className="d-flex mt-2">
                                    <ul className="px-4">
                                        <li className="fw-bold">Mã Sản Phẩm : <span className="fw-normal text-secondary">{productDetail?.code}</span></li>
                                        <li className="fw-bold">Tình Trạng :
                                            <span className="fw-normal text-secondary ms-1" >
                                                {productDetail?.capacityProductSet[activeButton]?.quantity < 1 ? <span className="text-danger fw-bold">Hết hàng</span> : <span>Còn hàng</span>}
                                            </span>
                                        </li>
                                        <li className="fw-bold">Màu Sắc : <span className="fw-normal text-secondary">{productDetail?.color}</span></li>
                                    </ul>
                                    <ul className="ms-5 text-ul">
                                        <li className="fw-bold">Thương Hiệu : <span className="fw-normal text-secondary">{productDetail?.producer.name}</span></li>
                                        <li className="fw-bold">Phân Khúc : <span className="fw-normal text-secondary">{productDetail?.productType.name}</span></li>
                                    </ul>
                                </div>
                                <hr />
                                <div className="ms-3">
                                    <div className="d-inline">
                                        {productDetail?.capacityProductSet.map((element, index) => (
                                            <span className="fw-bold text-secondary text-decoration-line-through" key={index}>
                                                {capacityId === element.capacity.id &&
                                                    (quantity * element.price).toLocaleString(
                                                        "vi-VN",
                                                        { style: "currency", currency: "VND" }
                                                    )
                                                }
                                            </span>
                                        ))
                                        }
                                    </div>
                                    <div className="d-inline ms-3">
                                        {
                                            productDetail?.capacityProductSet.map((element, index) => (
                                                <span className="fs-5 text-danger fw-bold">
                                                    {capacityId === element.capacity.id &&
                                                        (quantity * element.priceSale).toLocaleString(
                                                            "vi-VN",
                                                            { style: "currency", currency: "VND" }
                                                        )}</span>
                                            ))
                                        }
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <span className="fw-bold">Dung Tích : </span>
                                    {
                                        productDetail?.capacityProductSet.map((set, index) => (
                                            <a type="button" onClick={() => handleButtonClick(index, set.capacity.id)}
                                                className={`capacity-button ms-2 ${capacityId === set.capacity.id ? 'active' : ''}`}>{set.capacity.name}</a>
                                        ))
                                    }
                                </div>
                                {
                                    +productDetail?.capacityProductSet[activeButton].quantity > 0 ?
                                        <>
                                            <div className="mt-4">
                                                <button onClick={quantity !== 1 ? () => setQuantity(quantity - 1) : () => { }}
                                                    className={quantity === 1 ? "btn-number text-dieucosmetics" : "btn-quantity text-dieucosmetics"}>-</button>
                                                <button className=" btn-number text-dieucosmetics">{quantity}</button>
                                                <button onClick={quantity !== +productDetail?.capacityProductSet[activeButton].quantity ? 
                                                () => setQuantity(quantity + 1) :
                                                    () => {
                                                        Swal.fire({
                                                            icon: 'error',
                                                            title: 'Số lượng trong kho đã hết',
                                                            showConfirmButton: false,
                                                            timer: 1500
                                                        })
                                                    }} className=" btn-quantity text-dieucosmetics">+</button>
                                            </div>
                                            <hr />
                                            <div className="mt-2">
                                                <button className="button-buy ">Thêm Vào Giỏ Hàng</button>
                                                <button className="button-buy ms-3">Mua Ngay</button>
                                            </div>
                                        </>
                                        :
                                        <div className="mt-4 fs-5">
                                            <span className="fw-bold text-danger">Xin lỗi! Sản phẩm đã hết hàng</span>
                                        </div>
                                }
                            </div>
                        </div>
                        <div className="row pb-5">
                            <div className="container">
                                <div className="bg-home">
                                    <h3 className="text-center text-secondary py-3">MÔ TẢ SẢN PHẨM</h3>
                                </div>
                                <div className="col-11 m-auto mt-4">
                                    <p className="text-secondary" dangerouslySetInnerHTML={{ __html: productDetail?.description }}></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section class="service-policy-area section-space mt-2 container px-0 ">
                <div ><h2 className='text-center bg-home text-secondary py-3'>SẢN PHẨM LIÊN QUAN</h2></div>
                <hr className='mx-5' />
                <div className='container'>
                    <div id="carouselExampleControls" class="carousel carousel-dark slide " data-bs-ride="carousel">
                        <div class="carousel-inner ">
                            <div class="carousel-item active">
                                <div class="row d-flex justify-content-center">
                                    <div class="col-lg-2 mx-4 px-0">
                                        <div class="card-1" >
                                            <img src="https://product.hstatic.net/200000259653/product/chong-nang-body-2_9ce4407a74d94687aa1860068fc1a5af_7306aa9c14dd4b499e95a77014fe9ff7_grande.jpg" class="card-img-top" alt="..." />
                                            <div class="card-body">
                                                <h6>Serum Trẻ Hoá Da Chống Lão Hóa Image MD...</h6>
                                                <p className='text-danger'>1.320.000 đ</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 mx-4 px-0">
                                        <div class="card-1" >
                                            <img src="https://product.hstatic.net/200000259653/product/kem-duong-mat-chong-lao-hoa-2_f7b95f7999bc4e50abb8650126b12f3f_cee4831ca0c842009188675d9a2b573e_grande.jpg" class="card-img-top" alt="..." />
                                            <div class="card-body">
                                                <h6>Serum Trẻ Hoá Da Chống Lão Hóa Image MD...</h6>
                                                <p className='text-danger'>1.320.000 đ</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 mx-4 px-0">
                                        <div class="card-1" >
                                            <img src="https://product.hstatic.net/200000259653/product/kem-duong-da-mat-phuc-hoi-da_a2a09e1e1d3442cd852c80acfe6d7ba3_be734af94af14ebdb3f8cf4b4d4596eb_grande.jpg" class="card-img-top" alt="..." />
                                            <div class="card-body">
                                                <h6>Serum Trẻ Hoá Da Chống Lão Hóa Image MD...</h6>
                                                <p className='text-danger'>1.320.000 đ</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 mx-4 px-0">
                                        <div class="card-1" >
                                            <img src="https://product.hstatic.net/200000259653/product/kem-duong-body_132c28acd8e3451bb141261fd12808fa_a295287c6f3a47d4bf94f99f4d0b3ea4_grande.jpg" class="card-img-top" alt="..." />
                                            <div class="card-body">
                                                <h6>Serum Trẻ Hoá Da Chống Lão Hóa Image MD...</h6>
                                                <p className='text-danger'>1.320.000 đ</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <div class="row d-flex justify-content-center">
                                    <div class="col-lg-2 mx-4 px-0">
                                        <div class="card-1" >
                                            <img src="https://product.hstatic.net/200000259653/product/serum-chong-lao-hoa_2c0b7f40c4984738a8946c2a853d32b9_88ec0f99be5044729866eeb294f4f622_large.jpg" class="card-img-top" alt="..." />
                                            <div class="card-body">
                                                <h6>Serum Trẻ Hoá Da Chống Lão Hóa Image MD...</h6>
                                                <p className='text-danger'>1.320.000 đ</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 mx-4 px-0">
                                        <div class="card-1" >
                                            <img src="https://product.hstatic.net/200000259653/product/serum-lam-trang-sang-da-3_f513b111401b4a09b788d0c6ddd9fc19_2d5e307c490f4150bead8f63b213d867_grande.jpg" class="card-img-top" alt="..." />
                                            <div class="card-body">
                                                <h6>Serum Trẻ Hoá Da Chống Lão Hóa Image MD...</h6>
                                                <p className='text-danger'>1.320.000 đ</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 mx-4 px-0">
                                        <div class="card-1" >
                                            <img src="https://product.hstatic.net/200000259653/product/mat-na-phuc-hoi-da_f65d27202f5e47309d32bbc07f125485_f86d4189753d4911bb8691bed4df6d9b_large.jpg" class="card-img-top" alt="..." />
                                            <div class="card-body">
                                                <h6>Serum Trẻ Hoá Da Chống Lão Hóa Image MD...</h6>
                                                <p className='text-danger'>1.320.000 đ</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 mx-4 px-0">
                                        <div class="card-1" >
                                            <img src="https://product.hstatic.net/200000259653/product/serum-ngua-lao-hoa-da-kho_9f86e353465c47e0aa9000a5acc17d4e_4603e1d0bae242cda3576d7c64ce9287_master.jpg" class="card-img-top" alt="..." />
                                            <div class="card-body">
                                                <h6>Serum Trẻ Hoá Da Chống Lão Hóa Image MD...</h6>
                                                <p className='text-danger'>1.320.000 đ</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}