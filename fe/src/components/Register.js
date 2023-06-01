import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import loginService from "../service/login/loginService";
import { useState } from "react";


export default function Register() {
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
    const navigate = useNavigate()
    return (
        <>
            <div className="login-body">
                <div className="padding-register">
                    <Formik
                        initialValues={{
                            name: '',
                            dateOfBirth: '',
                            gender: 'false',
                            phoneNumber: '',
                            address: '',
                            email: '',
                            username: '',
                            password: '',
                            confirmPassword: '',
                            roles: ["user"]
                        }}
                        onSubmit={(value) => {
                            const register = async () => {
                                try {
                                     await loginService.register(value)
                                    navigate('/login')
                                } catch (error) {
                                    console.log(error);
                                    // const err = error.response.data;
                                    // if (err.username === "Không được bỏ trống") {
                                    //     document.getElementById("usernameError").innerText = "Không được bỏ trống"
                                    // } else if (err.message === "Tên người dùng không tồn tại") {
                                    //     document.getElementById("usernameError").innerText = "Tên người dùng không tồn tại"
                                    // } else if (err.username === "Tên đăng nhập ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                    //     document.getElementById("usernameError").innerText = "Tên đăng nhập ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                    // } else if (err.username === "Tên đăng nhập không được chứa ký tự đặc biệt") {
                                    //     document.getElementById("usernameError").innerText = "Tên đăng nhập không được chứa ký tự đặc biệt"
                                    // } else {
                                    //     document.getElementById("usernameError").innerText = ""
                                    // }
                                    // if (err.password === "Không được bỏ trống") {
                                    //     document.getElementById("passwordError").innerText = "Không được bỏ trống"
                                    // } else if (err.password === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                    //     document.getElementById("passwordError").innerText = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                    // } else if (err === "" || err.status === 403) {
                                    //     document.getElementById("passwordError").innerText = "Mật khẩu không chính xác"
                                    // } else if (err.password === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                    //     document.getElementById("passwordError").innerText = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                    // } else {
                                    //     document.getElementById("passwordError").innerText = ""
                                    // }
                                }
                            }
                            register()
                        }}
                    >
                        <Form className="">
                            <div className="wrapper-1 bg-white mt-0">
                                <div className="text-center">
                                    <img
                                        width='150px'
                                        src="dieucosmetics-logo.png"
                                        alt="" /></div>
                                <div className="h4 text-secondary text-center pt-2">Đăng Ký Tài Khoản</div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group mt-2">
                                            <label htmlFor="name" className="text-register">Họ và tên :</label>
                                            <div className="input-field-1">
                                                <Field type="text" className="input-login" name="name" id="name" placeholder="Nhập họ và tên" />
                                            </div>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label htmlFor="dateOfBirth" className="text-register">Ngày sinh :</label>
                                            <div className="input-field-1">
                                                <Field type="date" className="input-login" name="dateOfBirth" id="dateOfBirth" />
                                            </div>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label className="text-register">Giới tính :</label>
                                            <div className="mt-2">
                                                <div className="form-check form-check-inline ">
                                                    <Field className="form-check-input" type="radio" name="gender" id="inlineRadio1" value="false" />
                                                    <label className="form-check-label text-register" htmlFor="inlineRadio1">Nam</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <Field className="form-check-input" type="radio" name="gender" id="inlineRadio2" value="true" />
                                                    <label className="form-check-label text-register" htmlFor="inlineRadio2">Nữ</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label htmlFor="email" className="text-register">Email :</label>
                                            <div className="input-field-1">
                                                <Field type="text" className="input-login" name="email" id="email" placeholder="Nhập Email" />
                                            </div>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label htmlFor="phoneNumber" className="text-register">Số điện thoại :</label>
                                            <div className="input-field-1">
                                                <Field type="text" className="input-login" name="phoneNumber" id="phoneNumber" placeholder="Nhập số điện thoại" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group mt-2">
                                            <label htmlFor="username" className="text-register">Tài khoản :</label>
                                            <div className="input-field-1">
                                                <Field type="text" className="input-login" name="username" id="username" placeholder="Nhập tài khoản" />
                                            </div>
                                        </div>

                                        <div className="form-group mt-2">
                                            <label className="text-register">Mật khẩu :</label>
                                            <div className="input-field-1 ">
                                                <Field type={showPassword ? "text" : "password"} placeholder="Nhập mật khẩu" className="input-login" name="password" />
                                                {
                                                    showPassword ? <span type='button' onClick={() => { setShowPassword(!showPassword) }}
                                                        className="bi bi-eye-slash me-2 "></span> :
                                                        <span type='button' onClick={() => { setShowPassword(!showPassword) }}
                                                            className="bi bi-eye me-2"></span>
                                                }

                                            </div>

                                        </div>
                                        <div className="form-group mt-2">
                                            <label className="text-register">Xác nhận mật khẩu :</label>
                                            <div className="input-field-1 ">
                                                <Field type={showPasswordConfirm ? "text" : "password"} placeholder="Nhập mật khẩu xác nhận" className="input-login" name="confirmPassword" />
                                                {
                                                    showPasswordConfirm ? <span type='button' onClick={() => { setShowPasswordConfirm(!showPasswordConfirm) }}
                                                        className="bi bi-eye-slash me-2 "></span> :
                                                        <span type='button' onClick={() => { setShowPasswordConfirm(!showPasswordConfirm) }}
                                                            className="bi bi-eye me-2"></span>
                                                }

                                            </div>

                                        </div>
                                        <div className="form-group mt-2">
                                            <label htmlFor="address" className="text-register" >Địa chỉ :</label>
                                            <div className="input-field-1">
                                                <Field as="textarea" type="text" style={{
                                                    height: '96px'
                                                }} className=" input-login" name="address" id="address" placeholder="Nhập địa chỉ" >
                                                </Field>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mt-4">
                                        <NavLink to='/login' className="btn btn-block text-center mx-2">Hủy</NavLink>
                                        <button type="submit" className="btn btn-block text-center mx-1">Xác nhận</button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}