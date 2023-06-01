import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import customerService from "../service/login/customer/customerService"
import loginService from './../service/login/loginService';
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { useContext } from "react";
import { AvatarContext } from "./AvatarContext";
export default function CustomerDetail() {
    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
    const [showFormChangePassword, setShowFormChangePassword] = useState(false)
    const [customerDetail, setCustomerDetail] = useState()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { setAvatar } = useContext(AvatarContext)
    useEffect(() => {
        const detail = async () => {
            try {
                const res = await customerService.detail()
                setCustomerDetail(res.data)
                
            } catch (error) {
                console.log(error);
            }
        }
        detail()
    }, [token])
    if (!customerDetail) {
        return null
    }
    setAvatar(customerDetail?.avatar)
    return (
        <>
            <div style={{
                marginTop: 100
            }}>
                <div className="row mx-0 mt-5 p-5">
                    <div>
                        <NavLink to={'/'} className="bi bi-house text-secondary fs-4 text-decoration-none"><span className="ms-2 fw-normal fs-5">Trang chủ</span></NavLink>
                    </div>
                    <div className="container p-5 shadow-cosmetics-1 mt-3 bg-white">
                        <div className="row">
                            <div className="col-3 mt-3">
                                <div className="avatar">
                                    <img src={customerDetail?.avatar}
                                        className="border-avatar rounded-circle" width='100%' height='100%' alt="avatar" />
                                </div>
                            </div>
                            <div className="col-9">
                                <div className="row ms-3 px-3">
                                    <h2 className="text-center text-dieucosmetics">THÔNG TIN CÁ NHÂN</h2>
                                    <div className="col-6 px-5">
                                        <table className=" font-table text-secondary">
                                            <thead>
                                                <tr>
                                                    <th className="th-dieucosmetics">Mã khách hàng :</th>
                                                    <td style={{
                                                        width: '55%'
                                                    }}>{customerDetail?.code}</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th className="th-dieucosmetics">Họ và tên :</th>
                                                    <td>{customerDetail?.name}</td>
                                                </tr>
                                                <tr>
                                                    <th className="th-dieucosmetics">Giới tính :</th>
                                                    <td>{customerDetail?.gender === false ? 'Nam' : 'Nữ'}</td>
                                                </tr>
                                                <tr>
                                                    <th className="th-dieucosmetics">Ngày sinh :</th>
                                                    <td>{format(new Date(customerDetail.dateOfBirth), "dd/MM/yyyy")}</td>
                                                </tr>
                                                <tr>
                                                    <th className="th-dieucosmetics">Địa chỉ :</th>
                                                    <td>{customerDetail?.address}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-6">
                                        <Formik
                                            initialValues={{
                                                oldPassword: '',
                                                newPassword: '',
                                                confirmPasswore: ''
                                            }}
                                            onSubmit={(value) => {
                                                const changePassword = async () => {
                                                    try {
                                                        await loginService.changePassword(value)
                                                        localStorage.removeItem('token')
                                                        localStorage.removeItem('avatar')
                                                        Swal.fire({
                                                            icon: 'success',
                                                            title: 'Thay đổi mật khẩu thành công. Vui lòng đăng nhập lại',
                                                            showConfirmButton: false,
                                                            timer: 1500
                                                        })
                                                        navigate('/login')
                                                    } catch (error) {
                                                        const err = error.response.data
                                                        console.log(err);
                                                        if (err.message === "Mật khẩu hiện tại không đúng") {
                                                            document.getElementById("oldPasswordErr").innerHTML = "Mật khẩu hiện tại không đúng"
                                                        } else if (err.oldPassword === "Không được bỏ trống") {
                                                            document.getElementById("oldPasswordErr").innerHTML = "Không được bỏ trống"
                                                        } else if (err.oldPassword === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                                            document.getElementById("oldPasswordErr").innerHTML = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                                        } else {
                                                            document.getElementById("oldPasswordErr").innerHTML = ""
                                                        }

                                                        if (err.message === "Mật khẩu mới không được trùng với mật khẩu cũ") {
                                                            document.getElementById("newPasswordErr").innerHTML = "Mật khẩu mới không được trùng với mật khẩu cũ"
                                                        } else if (err.newPassword === "Không được bỏ trống") {
                                                            document.getElementById("newPasswordErr").innerHTML = "Không được bỏ trống"
                                                        } else if (err.newPassword === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                                            document.getElementById("newPasswordErr").innerHTML = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                                        } else {
                                                            document.getElementById("newPasswordErr").innerHTML = ""
                                                        }


                                                        if (err.message === "Mật khẩu xác nhận không trùng khớp") {
                                                            document.getElementById("confirmPasswordErr").innerHTML = "Mật khẩu xác nhận không trùng khớp"
                                                        } else if (err.confirmPassword === "Không được bỏ trống") {
                                                            document.getElementById("confirmPasswordErr").innerHTML = "Không được bỏ trống"
                                                        } else if (err.confirmPassword === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                                            document.getElementById("confirmPasswordErr").innerHTML = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                                        } else {
                                                            document.getElementById("confirmPasswordErr").innerHTML = ""
                                                        }

                                                    }
                                                }
                                                changePassword()
                                            }}
                                        >
                                            <Form>
                                                <table className="font-table text-secondary">
                                                    <thead>
                                                        <tr>
                                                            <th className="th-dieucosmetics" style={{ width: '220px' }}>Email :</th>
                                                            <td style={{
                                                        width: '60%'
                                                    }}>{customerDetail?.email}</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th className="th-dieucosmetics">Số điện thoại :</th>
                                                            <td>{customerDetail?.phoneNumber}</td>
                                                        </tr>
                                                        <tr>
                                                            <th className="th-dieucosmetics ">
                                                                <NavLink to={`update`} type="button" className="text-dieucosmetics text-decoration-none">{'Chỉnh sửa thông tin'}</NavLink>
                                                            </th>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <th className="th-dieucosmetics ">
                                                                <span type="button" onClick={() => { setShowFormChangePassword(!showFormChangePassword) }} className="text-dieucosmetics">{showFormChangePassword ? 'Ẩn đổi mật khẩu' : 'Đổi mật khẩu'}</span>
                                                            </th>
                                                            <td></td>
                                                        </tr>

                                                        {
                                                            showFormChangePassword &&
                                                            <>
                                                                <tr>
                                                                    <th className="th-dieucosmetics ">Mật khẩu hiện tại :</th>
                                                                    <td className="input-field fs-6">
                                                                        <Field
                                                                            type={showPassword ? "text" : "password"}
                                                                            placeholder="Nhập mật khẩu hiện tại" className="input-login" name="oldPassword" />
                                                                        {
                                                                            showPassword ? <span type='button' onClick={() => { setShowPassword(!showPassword) }}
                                                                                className="bi bi-eye-slash me-2 "></span> :
                                                                                <span type='button' onClick={() => { setShowPassword(!showPassword) }}
                                                                                    className="bi bi-eye me-2"></span>
                                                                        }</td>
                                                                </tr>
                                                                <tr>
                                                                    <th></th>
                                                                    <td><span className="text-danger fs-6" id="oldPasswordErr"></span></td>
                                                                </tr>
                                                                <tr>
                                                                    <th className="th-dieucosmetics ">Mật khẩu mới :</th>
                                                                    <td className="input-field fs-6">
                                                                        <Field
                                                                            type={showNewPassword ? "text" : "password"}
                                                                            placeholder="Nhập mật khẩu mới" className="input-login" name="newPassword" />
                                                                        {
                                                                            showNewPassword ? <span type='button' onClick={() => { setShowNewPassword(!showNewPassword) }}
                                                                                className="bi bi-eye-slash me-2 "></span> :
                                                                                <span type='button' onClick={() => { setShowNewPassword(!showNewPassword) }}
                                                                                    className="bi bi-eye me-2"></span>
                                                                        }</td>
                                                                </tr>
                                                                <tr>
                                                                    <th></th>
                                                                    <td><span className="text-danger fs-6" id="newPasswordErr"></span></td>
                                                                </tr>
                                                                <tr >
                                                                    <th className="th-dieucosmetics ">Mật khẩu xác nhận :</th>

                                                                    <td className="input-field fs-6">
                                                                        <Field
                                                                            type={showPasswordConfirm ? "text" : "password"}
                                                                            placeholder="Nhập mật khẩu xác nhận" className="input-login" name="confirmPassword" />
                                                                        {
                                                                            showPasswordConfirm ? <span type='button' onClick={() => { setShowPasswordConfirm(!showPasswordConfirm) }}
                                                                                className="bi bi-eye-slash me-2 "></span> :
                                                                                <span type='button' onClick={() => { setShowPasswordConfirm(!showPasswordConfirm) }}
                                                                                    className="bi bi-eye me-2"></span>
                                                                        }
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th></th>
                                                                    <td><span className="text-danger fs-6" id="confirmPasswordErr"></span></td>
                                                                </tr>
                                                                <tr >
                                                                    <th style={{ height: '60px' }}></th>
                                                                    <th className="fs-6"><button type="submit" class="button-buy">Xác nhận</button></th>
                                                                </tr>
                                                            </>
                                                        }
                                                       
                                                    </tbody>
                                                </table>
                                            </Form>
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}