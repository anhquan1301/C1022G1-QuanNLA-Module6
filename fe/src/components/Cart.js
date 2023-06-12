import { useContext, useEffect, useState } from "react";
import customerService from "../service/login/customer/customerService"
import cartService from "../service/login/cart/cartService";
import Swal from "sweetalert2";
import { Form, Formik } from "formik";
import { NavLink } from "react-router-dom";
import { QuantityContext } from "./QuantityContext";
import PaymentInfo from "./PaymentInfo";

export default function Cart() {
    const [customerDetail, setCustomerDetail] = useState()
    const token = localStorage.getItem('token')
    const [cartList, setCartList] = useState([])
    const [valueCart, setValueCart] = useState({
        id: 0,
        quantity: ''
    })
    const [showVNpay, setShowVNPay] = useState(false)
    const [quantityCheckbox, setQuantityCheckbox] = useState([])
    const { setIconQuantity } = useContext(QuantityContext)
    const detail = async () => {
        try {
            const res = await customerService.detail()
            setCustomerDetail(res.data)

        } catch (error) {
            console.log(error);
        }
    }
    const getCartList = async () => {
        try {
            const res = await cartService.findAllCart()
            setCartList(res.data.content)
        } catch (error) {
            console.log(error);
        }
    }
    const updateCart = () => {
        try {
            cartList.map(async (item) => {
                if (item?.quantity > item?.capacityProductQuantity) {
                    const value = {
                        id: item.cartId,
                        quantity: item.capacityProductQuantity
                    }
                    await cartService.updateCart(value)
                    getCartList()
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    const updateCartQuantity = async (value) => {
        try {
            await cartService.updateCart(value)
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = async (id) => {
        try {
            await cartService.deleteCart(id)
            setQuantityCheckbox(quantityCheckbox.filter(ids => ids != id));
            getCartList()
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        updateCart()
    }, [cartList.some(element => element.quantity > element.capacityProductQuantity)])
    useEffect(() => {
        getCartList()
    }, [])
    useEffect(() => {
        detail()
    }, [token])
    useEffect(() => {
        updateCartQuantity(valueCart)
    }, [valueCart]);
    const handleIncrease = (cartId) => {
        const updatedCartList = cartList.map((item) => {
            if (item?.cartId === cartId) {
                setValueCart({
                    id: cartId,
                    quantity: +item.quantity + 1
                })
                return {
                    ...item,
                    quantity: +item.quantity + 1,
                };
            }
            return item;
        });
        setCartList(updatedCartList);
    }
    const handleReduce = (cartId) => {
        const updatedCartList = cartList.map((item) => {
            if (isNaN(+item.quantity) || +item.quantity < 1) {
                return {
                    ...item,
                    quantity: +valueCart.quantity,
                };
            }
            if (item?.cartId === cartId) {
                setValueCart({
                    id: cartId,
                    quantity: +item.quantity - 1
                })
                return {
                    ...item,
                    quantity: +item.quantity - 1,
                };
            }
            return item;
        });
        setCartList(updatedCartList);
    }
    const handleChangeQuantity = (cartId, quantity) => {
        const updatedCartList = cartList.map((item) => {
            if (item?.cartId === cartId) {
                if (+quantity > item.capacityProductQuantity) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Số lượng trong kho có ' + item.capacityProductQuantity + ' sản phẩm',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    return {
                        ...item,
                        quantity: +quantity,
                    };
                }
                if (isNaN(+quantity) || +quantity < 1) {
                    return {
                        ...item,
                        quantity: +valueCart.quantity,
                    };
                }
                setValueCart({
                    id: cartId,
                    quantity: quantity
                })
                return {
                    ...item,
                    quantity: +quantity,
                };
            }
            return item;
        });
        setCartList(updatedCartList);
    }
    const handleFormPay = (event, cartId) => {
        if (event.target.checked) {
            setQuantityCheckbox([...quantityCheckbox, cartId])
        } else {
            setQuantityCheckbox(quantityCheckbox.filter(id => id !== cartId));
        }

    }
    const handlePayMent = async (totalPay, cartIds, phoneNumber, customerName, address) => {
        const value = {
            totalPay: totalPay
        }
        try {
            const res = await cartService.handleVNPay(value)
            window.location.href = res.data.url;
            localStorage.setItem('cartIds', JSON.stringify(cartIds))
            localStorage.setItem('phoneNumber', phoneNumber)
            localStorage.setItem('customerName', customerName)
            localStorage.setItem('address', address)
        } catch (error) {
            console.log(error);
        }
    }
    const handleVNPaymentMethod = () => {
        setShowVNPay(!showVNpay)
    }
    setIconQuantity(cartList.length)

    return (
        <>
            <div className="">
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
                    <div className="container bg-white shadow-cosmetics-1 px-0 mt-3">
                        <div className="row mx-0" >
                            <div className="bg-home p-3 text-secondary text-center">
                                <h2>GIỎ HÀNG CỦA BẠN</h2>
                            </div>
                            <div className="p-0">
                                {
                                    customerDetail === undefined || cartList.length === 0 ?
                                        <div className="d-flex justify-content-center p-5 "><img src="https://bizweb.dktcdn.net/100/455/309/themes/862138/assets/empty-cart.png?1668669829889" /></div> :
                                        <table className="mt-3">
                                            <thead>
                                                <tr className="text-center text-secondary align-middle ">
                                                    <th>Chọn sản phẩm</th>
                                                    <th>Ảnh</th>
                                                    <th>Tên sản phẩm</th>
                                                    <th>Dung tích</th>
                                                    <th>Đơn giá</th>
                                                    <th>Số lượng</th>
                                                    <th>Tổng</th>
                                                    <th>Xóa</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartList.map((element, index) => (
                                                    <tr className="text-center align-middle fs-6" key={index}>
                                                        <td>
                                                            <input className="form-check-input border border-2 border-color fs-5"
                                                                type="checkbox"
                                                                onClick={(event) => handleFormPay(event, element.cartId)}
                                                            />
                                                        </td>
                                                        <td
                                                            style={{
                                                                width: '10%'
                                                            }}
                                                        >
                                                            <img
                                                                src={element.imageName}
                                                                width='100%'
                                                            />
                                                        </td>
                                                        <td>
                                                            {
                                                                element.productName.length > 30 ? <span>{element.productName.slice(0, 30)}...</span> : <span>{element.productName}</span>
                                                            }
                                                        </td>
                                                        <td>
                                                            {element.capacityName}
                                                        </td>
                                                        <td
                                                            style={{
                                                                width: '10%'
                                                            }}
                                                        >{(+element.price).toLocaleString(
                                                            "vi-VN",
                                                            { style: "currency", currency: "VND" }
                                                        )}
                                                        </td>
                                                        <td
                                                            style={{
                                                                width: '15%'
                                                            }}
                                                        >
                                                            <div>
                                                                <button onClick={element.quantity === 1 ? () => { } : () => handleReduce(element.cartId)}
                                                                    className={element.quantity <= 1 ? "btn-number-cart text-dieucosmetics" : "btn-quantity text-dieucosmetics"}>-</button>
                                                                <input onChange={(e) => handleChangeQuantity(element.cartId, e.target.value)} className="btn-number-cart text-dieucosmetics text-center" value={element.quantity} />
                                                                <button onClick={element.quantity >= element.capacityProductQuantity ? () => {
                                                                    Swal.fire({
                                                                        icon: 'error',
                                                                        title: 'Số lượng trong kho có ' + element.capacityProductQuantity + ' sản phẩm',
                                                                        showConfirmButton: false,
                                                                        timer: 1500
                                                                    })
                                                                } : () => handleIncrease(element.cartId)}
                                                                    className=" btn-quantity text-dieucosmetics">+</button>
                                                            </div>
                                                        </td>
                                                        <td
                                                            style={{
                                                                width: '10%'
                                                            }}
                                                        >{(+element.price * +element.quantity).toLocaleString(
                                                            "vi-VN",
                                                            { style: "currency", currency: "VND" }
                                                        )}</td>
                                                        <td
                                                            style={{
                                                                width: '10%'
                                                            }}
                                                        ><i type='button' onClick={() => {
                                                            Swal.fire({
                                                                color: '#d4969a',
                                                                text: 'XÓA SẢN PHẨM NÀY KHỎI GIỎ HÀNG ?',
                                                                imageUrl: `${element.imageName}`,
                                                                imageHeight: '150px',
                                                                icon: 'warning',
                                                                showCancelButton: true,
                                                                confirmButtonColor: '#3085d6',
                                                                cancelButtonColor: '#d33',
                                                                cancelButtonText: 'Không',
                                                                confirmButtonText: 'Có'
                                                            }).then((result) => {
                                                                if (result.isConfirmed) {
                                                                    handleDelete(element.cartId)
                                                                    Swal.fire({
                                                                        title: 'Xóa sản phẩm thành công',
                                                                        icon: 'success',
                                                                        showConfirmButton: false,
                                                                        timer: 1500
                                                                    }
                                                                    )
                                                                }
                                                            })
                                                        }} className="bi bi-trash text-dieucosmetics fs-3"></i></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                }
                            </div>
                        </div>

                    </div>
                </div>
                <div className="container px-0">
                    <div className="row pb-5 px-2">

                        <div className="col-8  p-5 border border-1 border-color form-cart text-secondary">
                            <div>
                                <h4 className="text-secondary bg-home text-center py-3">THÔNG TIN KHÁCH ĐẶT HÀNG</h4>
                            </div>
                            <div className="px-5">
                                {
                                    token === null ? <h3 className="text-danger text-center mt-5">Vui lòng đăng nhập!</h3>
                                        :
                                        <table className="w-100">
                                            <thead>
                                                <tr>
                                                    <th style={{
                                                        width: '30%',
                                                    }}>Họ và tên :</th>
                                                    <td style={{
                                                        height: '50px',
                                                    }}>{customerDetail?.name}</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>Số điện thoại :</th>
                                                    <td style={{
                                                        height: '50px',
                                                    }}>{customerDetail?.phoneNumber}</td>
                                                </tr>
                                                <tr>
                                                    <th>Địa chỉ giao hàng :</th>
                                                    <td style={{
                                                        height: '50px',
                                                    }}>{customerDetail?.address}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                }
                            </div>
                        </div>
                        <div className="col-4 p-5 border border-1 border-color form-cart text-secondary">
                            <div>
                                <h4 className="text-secondary bg-home text-center py-3">THANH TOÁN</h4>
                            </div>
                            <div>

                                <table className="w-100">
                                    <thead>
                                        <tr>
                                            <th>Giá đơn hàng : </th>
                                            <td style={{
                                                height: '40px',
                                            }} className="text-end text-secondary fw-bold" >{cartList
                                                .filter(elements => quantityCheckbox.includes(elements.cartId))
                                                .map((element) => (+element.price * +element.quantity))
                                                .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                                                .toLocaleString(
                                                    "vi-VN",
                                                    { style: "currency", currency: "VND" }
                                                )}</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>Phí giao hàng : </th>
                                            <td style={{
                                                height: '40px',
                                            }} className="text-end text-secondary fw-bold" >39.000 ₫</td>
                                        </tr>
                                        <tr>
                                            <th>Chọn phương thức: </th>
                                            <td style={{
                                                width: '150px',
                                                height: '40px',
                                            }} className="text-end text-secondary fw-bold" >
                                                <img type='button' onClick={handleVNPaymentMethod} className={ showVNpay ? "border border-3 border-color" : "border border-3"} width={'40%'} src="https://play-lh.googleusercontent.com/o-_z132f10zwrco4NXk4sFqmGylqXBjfcwR8-wK0lO1Wk4gzRXi4IZJdhwVlEAtpyQ" /></td>
                                        </tr>
                                        <hr />
                                        <tr>
                                            <th className="fs-5">Tổng : </th>
                                            <td className="text-end text-secondary text-danger fw-bold fs-5" >{(cartList
                                                .filter(elements => quantityCheckbox.includes(elements.cartId))
                                                .map((element) => (+element.price * +element.quantity))
                                                .reduce((accumulator, currentValue) => accumulator + currentValue, 0) + 39000).toLocaleString(
                                                    "vi-VN",
                                                    { style: "currency", currency: "VND" }
                                                )}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td
                                                style={{
                                                    height: '80px',
                                                }}
                                            >   {
                                                    quantityCheckbox.length === 0 ?
                                                        <span className="button-done-buy float-end">Xác nhận</span> :
                                                        <button onClick={showVNpay ? () => handlePayMent(cartList
                                                            .filter(elements => quantityCheckbox.includes(elements.cartId))
                                                            .map((element) => (+element.price * +element.quantity))
                                                            .reduce((accumulator, currentValue) => accumulator + currentValue, 0) + 39000, quantityCheckbox, customerDetail?.phoneNumber, customerDetail?.name, customerDetail?.address) : () => {
                                                                Swal.fire({
                                                                    title: 'Bạn chưa chọn phương thức thanh toán',
                                                                    icon: 'error',
                                                                    showConfirmButton: false,
                                                                    timer: 1500
                                                                })
                                                            }}
                                                            className="button-buy float-end" >Xác nhận</button>
                                                }
                                            </td>
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