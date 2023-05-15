
export default function Home() {
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
                    {/* The slideshow/carousel */}
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                src="https://file.hstatic.net/200000259653/file/beaux-slider-bg3_e8a7791f2e494ae_cd6b728ecdfe4ce1bc3bed52000a01e4.jpg"
                                alt="New York"
                                className="d-block"
                                style={{ width: "100%", height: 600, backgroundSize: 'cover' }}
                            />

                            {/* <div className="carousel-caption">
                                <h2 className="text-slide text-start">KHU NGHỈ DƯỠNG ẨM THỰC </h2>
                                <h2 className="text-slide text-start">
                                    TỌA LẠC TẠI BÃI BIỂN ĐÀ NẴNG{" "}
                                </h2>
                                <h2 className="text-slide text-start">
                                    MỘT TRONG 6 BÃI BIỂN ĐẸP NHẤT THẾ GIỚI{" "}
                                </h2>
                            </div> */}
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://tronhouse.com/assets/data/editor/source/bi-quyet-chup-hinh-my-pham-gay-an-tuong-voi-nguoi-xem/chup-hinh-my-pham-8.jpg"
                                alt=""
                                className="d-block"
                                style={{ width: "100%", height: 600, backgroundSize: 'cover' }}
                            />
                            {/* <div className="carousel-caption">
                                <h2 className="text-slide text-start">KHU NGHỈ DƯỠNG ẨM THỰC </h2>
                                <h2 className="text-slide text-start">
                                    TỌA LẠC TẠI BÃI BIỂN ĐÀ NẴNG{" "}
                                </h2>
                                <h2 className="text-slide text-start">
                                    MỘT TRONG 6 BÃI BIỂN ĐẸP NHẤT THẾ GIỚI{" "}
                                </h2>
                            </div> */}
                        </div>
                        <div className="carousel-item">
                            <img
                                src="https://ressmedia.com/wp-content/uploads/2021/07/ANH-2-22.jpg"
                                alt=""
                                className="d-block"
                                style={{ width: "100%", height: 600, backgroundSize: 'cover' }}
                            />
                            {/* <div className="carousel-caption">
                                <h2 className="text-slide text-start">KHU NGHỈ DƯỠNG ẨM THỰC </h2>
                                <h2 className="text-slide text-start">
                                    TỌA LẠC TẠI BÃI BIỂN ĐÀ NẴNG{" "}
                                </h2>
                                <h2 className="text-slide text-start">
                                    MỘT TRONG 6 BÃI BIỂN ĐẸP NHẤT THẾ GIỚI{" "}
                                </h2>
                            </div> */}
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
            <section class="service-policy-area section-space container">
                <div ><h2 className='text-center bg-home text-secondary py-3'>HOT TRONG THÁNG QUA</h2></div>
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
            <div className="container px-0">
                <div className="row mx-0 mt-2 mb-5 ms-5">
                    <div className="col-4">
                        <h3 style={{ color: 'GrayText', marginTop: 20 }}>
                        Tất cả đều là Mỹ phẩm Thảo dược và nó được bào chế, sử dụng các thành phần mỹ phẩm thảo dược được phép khác nhau, là các sản phẩm 100% từ Thảo dược nguyên chất và an toàn.
                        </h3>
                    </div>
                    <div className="col-4">
                        <img
                            className="w-100 h-100 shadow"
                            src="https://file.hstatic.net/200000259653/file/1_b43b5110a90346c6b860cd09ab127476.jpg"
                            alt=""
                        />
                    </div>
                    <div className="col-4">
                        <h3 style={{ textAlign: "center", color: 'GrayText', paddingTop: 20}}>
                            KEM DƯỠNG MẶT THẢO DƯỢC
                        </h3>
                        <h6 style={{
                                color: 'black',
                                lineHeight: 2,
                                fontFamily: '"Cormorant Infant", "serif"'
                            }}>
                           Chứa thành phần dưỡng chất của Aloe Vera, Vitamin E và Vitamin B5, do đó nó làm dịu và làm mềm làn da của bạn và mang lại cho bạn một làn da sáng tự nhiên trên khuôn mặt của bạn.
                        </h6>
                    </div>
                </div>
                <div className="row mx-0 bg-home text-white shadow">
                    <div className="row container mx-0 px-0">
                        <div className="col-6 px-0">
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

                <div className="row mx-0 shadow">
                    <div className="row container mx-0 px-0 ">
                        <div className="col-6 mt-2 px-0">
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
                        <div className="col-6 px-0">
                            <img className="w-100 h-100 " src="https://file.hstatic.net/200000259653/file/3_c36448acd2764e8a8d49c4fd740a8523.jpg" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="container mt-5 bg-home py-5">
                <div class="row ">
                    <div class="col-lg-3 col-md-6 col-sm-6">

                        <div class="service-policy-item">
                            <div class="icons">
                                <img src="https://demo.hasthemes.com/floda-preview/floda/assets/img/icon/free_shipping.png" alt="" />
                            </div>
                            <div class="policy-terms">
                                <h5>Miễn Phí Giao Hàng</h5>
                                <p>Miễn phí giao hàng toàn quốc</p>
                            </div>
                        </div>

                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">

                        <div class="service-policy-item">
                            <div class="icons">
                                <img src="https://demo.hasthemes.com/floda-preview/floda/assets/img/icon/support247.png" alt="" />
                            </div>
                            <div class="policy-terms">
                                <h5>Hỗ Trợ 24/7</h5>
                                <p>Hỗ trợ 24h trong 1 ngày</p>
                            </div>
                        </div>

                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">

                        <div class="service-policy-item">
                            <div class="icons">
                                <img src="https://demo.hasthemes.com/floda-preview/floda/assets/img/icon/money_back.png" alt="" />
                            </div>
                            <div class="policy-terms">
                                <h5>Hoàn Trả Lại Tiền</h5>
                                <p>Hoàn trả lại tiền trong vòng 30 ngày</p>
                            </div>
                        </div>

                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-6">

                        <div class="service-policy-item">
                            <div class="icons">
                                <img src="https://demo.hasthemes.com/floda-preview/floda/assets/img/icon/promotions.png" alt="" />
                            </div>
                            <div class="policy-terms">
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