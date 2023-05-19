import { useState } from "react";



export default function Detail() {
    const [activeButton, setActiveButton] = useState(1);
    const [quantity, setQuantity] = useState(1)
    const handleButtonClick = (buttonIndex) => {
        setActiveButton(buttonIndex);
    };
    return (
        <>
            <div className=" bg-home">
                <div className="p-5">
                    <div className="container bg-white shadow">
                        <div className="row mx-0" style={{ marginTop: 117 }}>
                            <div className="col-2">
                                <div className="carousel-indicators-1 mt-5 pt-3">
                                    <div>
                                        <img
                                            src="https://product.hstatic.net/200000259653/product/kem-duong-body-1_fa01395e01434f56bd9285fad2940826_2bcddff12e7c4874ba9971770b3bb331_master.jpg"
                                            data-bs-target="#demo"
                                            data-bs-slide-to={0}
                                            className=" float-end"
                                        />
                                        {/* <img src="https://myphamngoainhap.vn/upload/2021/image-skincare-body-1.jpg" data-bs-target="#demo" data-bs-slide-to={2} /> */}
                                    </div>
                                    <div >
                                        <img
                                            src="https://product.hstatic.net/200000259653/product/kem-duong-body_132c28acd8e3451bb141261fd12808fa_a295287c6f3a47d4bf94f99f4d0b3ea4_master.jpg"
                                            data-bs-target="#demo"
                                            data-bs-slide-to={1}
                                            className="float-end"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 p-0">
                                <div id="demo" className="carousel slide " data-bs-ride="carousel">

                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img
                                                src="https://product.hstatic.net/200000259653/product/kem-duong-body-1_fa01395e01434f56bd9285fad2940826_2bcddff12e7c4874ba9971770b3bb331_master.jpg"
                                                alt="New York"
                                                className="d-block"
                                                style={{ width: "100%", height: 500, backgroundSize: 'cover' }}
                                            />


                                        </div>
                                        <div className="carousel-item">
                                            <img
                                                src="https://product.hstatic.net/200000259653/product/kem-duong-body_132c28acd8e3451bb141261fd12808fa_a295287c6f3a47d4bf94f99f4d0b3ea4_master.jpg"
                                                alt=""
                                                className="d-block"
                                                style={{ width: "100%", height: 500, backgroundSize: 'cover' }}
                                            />

                                        </div>
                                        {/* <div className="carousel-item">
                                <img
                                    src="https://cdn.shopify.com/s/files/1/0250/9661/8038/products/BODY_SPA_exfoliating_body_scrub_PDP_R01a_600x600_crop_center.jpg?v=1679342717"
                                    alt=""
                                    className="d-block"
                                    style={{ width: "100%", height: 600, backgroundSize: 'cover' }}
                                />
                            </div> */}
                                    </div>

                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mt-5 text-secondary">
                                    <h3> Kem Dưỡng Body Trẻ Hóa Da Toàn Thân Image BODY SPA Rejuvenating Body Lotion</h3>
                                </div>
                                <div className="d-flex mt-2">
                                    <ul className="px-4">
                                        <li className="fw-bold">Mã Sản Phẩm : <span className="fw-normal text-secondary">MH-0001</span></li>
                                        <li className="fw-bold">Tình Trạng : <span className="fw-normal text-secondary">Còn hàng</span></li>
                                        <li className="fw-bold">Màu Sắc : <span className="fw-normal text-secondary">Trắng</span></li>
                                    </ul>
                                    <ul className="ms-5 text-ul">
                                        <li className="fw-bold">Thương Hiệu : <span className="fw-normal text-secondary">IMAGE</span></li>
                                        <li className="fw-bold">Phân Khúc : <span className="fw-normal text-secondary">Kem body</span></li>
                                    </ul>
                                </div>
                                <hr />
                                <div className="ms-3">
                                    <span className="fw-bold text-secondary text-decoration-line-through">{activeButton === 1 ? 
                                    (quantity * 1920000).toLocaleString(
                                        "vi-VN",
                                        { style: "currency", currency: "VND" }
                                    ) : (quantity * 3180000).toLocaleString(
                                        "vi-VN",
                                        { style: "currency", currency: "VND" }
                                    )}</span>
                                    <span className="fs-5 ms-3 text-danger fw-bold"> {activeButton === 1 ? 
                                    (quantity * 1320000).toLocaleString(
                                        "vi-VN",
                                        { style: "currency", currency: "VND" }
                                    ) : (quantity * 2370000).toLocaleString(
                                        "vi-VN",
                                        { style: "currency", currency: "VND" }
                                    )}</span>
                                </div>
                                <hr />
                                <div>
                                    <span className="fw-bold">Dung Tích : </span>
                                    <a type="button" onClick={() => handleButtonClick(1)}
                                        className={`capacity-button mx-2 ${activeButton === 1 ? 'active' : ''}`}>170g</a>
                                    <a type="button" onClick={() => handleButtonClick(2)}
                                        className={`capacity-button ${activeButton === 2 ? 'active' : ''}`}>454g</a>
                                </div>
                                <div className="mt-4">
                                    <button onClick={() => setQuantity(quantity - 1)} className={quantity === 1 ? "btn-number text-dieucosmetics" : "btn-quantity text-dieucosmetics"}>-</button>
                                    <button className=" btn-number text-dieucosmetics">{quantity}</button>
                                    <button onClick={() => setQuantity(quantity + 1)} className=" btn-quantity text-dieucosmetics">+</button>
                                </div>
                                <hr />
                                <div className="mt-2">
                                    <button className="button-buy ">Thêm Vào Giỏ Hàng</button>
                                    <button className="button-buy ms-3">Mua Ngay</button>
                                </div>
                            </div>
                        </div>
                        <div className="row pb-5">
                            <div className="container">
                                <div className="bg-home">
                                    <h3 className="text-center text-secondary py-3">MÔ TẢ SẢN PHẨM</h3>
                                </div>
                                <div className="col-11 m-auto mt-4">
                                    <p className="text-secondary">1. Công dụng chính của sản phẩm tẩy da chết body Image.
                                        Không chỉ được tạo thành từ các thành phần được chiết xuất từ thiên nhiên, Image Skincare Body Spa Exfoliating Body Scrub còn được người tiêu dùng lựa chọn là bởi những công dụng tuyệt vời mà nó mang lại như sau:
                                        <br />
                                        Làm mềm và loại bỏ các lớp da chết sần sùi, xỉn màu trên bề mặt da
                                        Dưỡng ẩm cho da mềm mại tự nhiên, ngăn ngừa khô sần, bong tróc hiệu quả
                                        Gia tăng khả năng hấp thụ các dưỡng chất có trong các loại mỹ phẩm dưỡng da khác
                                        Làm sáng da tự nhiên.
                                        <br />
                                        2. Giải pháp cho:
                                        <br />
                                        Mọi loại da.
                                        <br />
                                        3. Thành phần chính có trong tẩy da chết toàn thân Image Body Spa.
                                        15% AHAs (Glycolic, Latic, Malic):
                                        <br />
                                        Đảm nhận nhiệm vụ tẩy tế bào chết. Hỗ trợ trị và ngừa mụn, điều trị thâm do sẹo mụn, xóa các nếp nhăn li ti trên da. Đồng thời làm căng mịn và ẩm mượt làn da. Hơn thế nữa, AHA còn giúp tăng cường sự phát triển của biểu bì, nâng cao chất lượng của các sợi elastin và collagen. Làm giảm thâm sạm do thay đổi nội tiết tố hoặc hư tổn do ánh nắng mặt trời.
                                        <br />
                                        Dầu hạnh nhân:
                                        <br />
                                        Chứa hàm lượng vitamin E dồi dào. Là chất chống oxy hóa tự nhiên, giúp bảo vệ cấu trúc tế bào để tránh thiệt hại các gốc tự do. Đồng thời làm giảm sự xuất hiện các vết rạn da do mang thai. Làm mờ hiệu quả nếp  nhăn và vết sẹo mụn trứng cá trên da.
                                        Chiết xuất hạt nho:
                                        Chống oxy hóa mạnh mẽ, giữ vai trò hỗ trợ dưỡng ẩm. Giúp giảm thiểu tình trạng da bị khô ráp, bong tróc. Ngăn ngừa sớm sự hình thành nếp nhăn, dấu hiệu lão hóa. Ngoài ra, dầu hạt nho có khả năng thu nhỏ lỗ chân lông, giúp kiểm soát tiết dầu, giảm nhờn hiệu quả.  Giúp làn da nhanh sáng khỏe, mịn màng tự nhiên.</p>
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
                                        <div class="card" >
                                            <img src="https://product.hstatic.net/200000259653/product/chong-nang-body-2_9ce4407a74d94687aa1860068fc1a5af_7306aa9c14dd4b499e95a77014fe9ff7_grande.jpg" class="card-img-top" alt="..." />
                                            <div class="card-body">
                                                <h6>Serum Trẻ Hoá Da Chống Lão Hóa Image MD...</h6>
                                                <p className='text-danger'>1.320.000 đ</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 mx-4 px-0">
                                        <div class="card" >
                                            <img src="https://product.hstatic.net/200000259653/product/kem-duong-mat-chong-lao-hoa-2_f7b95f7999bc4e50abb8650126b12f3f_cee4831ca0c842009188675d9a2b573e_grande.jpg" class="card-img-top" alt="..." />
                                            <div class="card-body">
                                                <h6>Serum Trẻ Hoá Da Chống Lão Hóa Image MD...</h6>
                                                <p className='text-danger'>1.320.000 đ</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 mx-4 px-0">
                                        <div class="card" >
                                            <img src="https://product.hstatic.net/200000259653/product/kem-duong-da-mat-phuc-hoi-da_a2a09e1e1d3442cd852c80acfe6d7ba3_be734af94af14ebdb3f8cf4b4d4596eb_grande.jpg" class="card-img-top" alt="..." />
                                            <div class="card-body">
                                                <h6>Serum Trẻ Hoá Da Chống Lão Hóa Image MD...</h6>
                                                <p className='text-danger'>1.320.000 đ</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 mx-4 px-0">
                                        <div class="card" >
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
                                        <div class="card" >
                                            <img src="https://product.hstatic.net/200000259653/product/serum-chong-lao-hoa_2c0b7f40c4984738a8946c2a853d32b9_88ec0f99be5044729866eeb294f4f622_large.jpg" class="card-img-top" alt="..." />
                                            <div class="card-body">
                                                <h6>Serum Trẻ Hoá Da Chống Lão Hóa Image MD...</h6>
                                                <p className='text-danger'>1.320.000 đ</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 mx-4 px-0">
                                        <div class="card" >
                                            <img src="https://product.hstatic.net/200000259653/product/serum-lam-trang-sang-da-3_f513b111401b4a09b788d0c6ddd9fc19_2d5e307c490f4150bead8f63b213d867_grande.jpg" class="card-img-top" alt="..." />
                                            <div class="card-body">
                                                <h6>Serum Trẻ Hoá Da Chống Lão Hóa Image MD...</h6>
                                                <p className='text-danger'>1.320.000 đ</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 mx-4 px-0">
                                        <div class="card" >
                                            <img src="https://product.hstatic.net/200000259653/product/mat-na-phuc-hoi-da_f65d27202f5e47309d32bbc07f125485_f86d4189753d4911bb8691bed4df6d9b_large.jpg" class="card-img-top" alt="..." />
                                            <div class="card-body">
                                                <h6>Serum Trẻ Hoá Da Chống Lão Hóa Image MD...</h6>
                                                <p className='text-danger'>1.320.000 đ</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-2 mx-4 px-0">
                                        <div class="card" >
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