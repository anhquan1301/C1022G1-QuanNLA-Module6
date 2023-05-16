import { useState } from "react";


export default function Cart() {
    const [quantity, setQuantity] = useState(1)
    return (
        <>
            <div className="">
                <div className="p-5">
                    <div className="container bg-white form-cart px-0">
                        <div className="row mx-0" style={{ marginTop: 117 }}>
                            <div className="bg-home p-3 text-secondary text-center">
                                <h2>Giỏ Hàng Của Bạn</h2>
                            </div>
                            <div className="p-0">
                                <table class="table">
                                    <thead>
                                        <tr className="text-center text-secondary align-middle">
                                            <th>Ảnh</th>
                                            <th>Tên sản phẩm</th>
                                            <th>Giá</th>
                                            <th>Số lượng</th>
                                            <th>Tổng</th>
                                            <th>Xóa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="text-center align-middle fs-6 text-secondary">
                                            <td
                                                style={{
                                                    width: '10%'
                                                }}
                                            >
                                                <img
                                                    src="https://product.hstatic.net/200000259653/product/kem-duong-body-1_fa01395e01434f56bd9285fad2940826_2bcddff12e7c4874ba9971770b3bb331_master.jpg"
                                                    width='100%'
                                                />
                                            </td>
                                            <td>
                                                BODY SPA Rejuvenating Body Lotion
                                            </td>
                                            <td
                                                style={{
                                                    width: '10%'
                                                }}
                                            >1.320.000 ₫</td>
                                            <td
                                                style={{
                                                    width: '15%'
                                                }}
                                            >
                                                <div>
                                                    <button onClick={() => setQuantity(quantity - 1)}
                                                        className={quantity === 1 ? "btn-number text-dieucosmetics" : "btn-quantity text-dieucosmetics"}>-</button>
                                                    <button className=" btn-number text-dieucosmetics">{quantity}</button>
                                                    <button onClick={() => setQuantity(quantity + 1)}
                                                        className=" btn-quantity text-dieucosmetics">+</button>
                                                </div>
                                            </td>
                                            <td
                                                style={{
                                                    width: '10%'
                                                }}
                                            >{(quantity * 1320000).toLocaleString(
                                                "vi-VN",
                                                { style: "currency", currency: "VND" }
                                            )}</td>
                                            <td
                                                style={{
                                                    width: '10%'
                                                }}
                                            ><i type='button' class="bi bi-trash text-dieucosmetics fs-3"></i></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="container px-0">
                    <div className="row pb-5">
                    <div className="col-4"></div>
                    <div className="col-4"></div>
                    <div className="col-4 p-5 border border-1 border-color form-cart">
                        <div>
                            <h4 className="text-secondary bg-home text-center py-3">THANH TOÁN</h4>
                        </div>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Giá Sản Phẩm : </th>
                                        <td className="text-end text-secondary" style={{
                                            width:'73%',
                                            height:'40px'
                                        }}>{(quantity * 1320000).toLocaleString(
                                                "vi-VN",
                                                { style: "currency", currency: "VND" }
                                            )}</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Phí ship : </th>
                                        <td className="text-end text-secondary" style={{
                                            width:'73%'
                                        }}>29.000 ₫</td>
                                    </tr>
                                    <hr/>
                                    <tr>
                                        <th>Tổng : </th>
                                        <td className="text-end text-secondary" style={{
                                            width:'73%',
                                        }}>{(quantity * 1320000 + 29000 ).toLocaleString(
                                            "vi-VN",
                                            { style: "currency", currency: "VND" }
                                        )}</td>
                                    </tr>
                                    <tr>
                                        <th style={{
                                            height:'80px'
                                        }} className="w-100"><button className="button-buy">Xác nhận thanh toán</button></th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}