import { Formik,Form, Field } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import loginService from "../service/login/loginService";
import { useState } from "react";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    return (
        <div className="login-body">
            <div className="padding-login">
                <div className="wrapper bg-white mt-0">
                    <div className="text-center">
                        <img
                            width='150px'
                            src="dieucosmetics-logo.png"
                            alt="" /></div>
                    <div className="h4 text-secondary text-center pt-2">Đăng Nhập Tài Khoản Của Bạn</div>
                    <Formik
                    initialValues={{
                        username:'',
                        password:''
                    }}
                    onSubmit={(value)=>{
                        const loginUser = async()=>{
                            try {
                               const res = await loginService.login(value)
                                navigate('/')
                                console.log(res);
                                localStorage.setItem('token',res.data.token)
                                localStorage.setItem('avatar',res.data.avatar)
                            } catch (error) {
                                const err = error.response.data;
                                if (err.username === "Không được bỏ trống") {
                                    document.getElementById("usernameError").innerText = "Không được bỏ trống"
                                } else if (err.message === "Tên người dùng không tồn tại") {
                                    document.getElementById("usernameError").innerText = "Tên người dùng không tồn tại"
                                } else if (err.username === "Tên đăng nhập ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                    document.getElementById("usernameError").innerText = "Tên đăng nhập ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                } else if (err.username === "Tên đăng nhập không được chứa ký tự đặc biệt") {
                                    document.getElementById("usernameError").innerText = "Tên đăng nhập không được chứa ký tự đặc biệt"
                                } else {
                                    document.getElementById("usernameError").innerText = ""
                                }

                                if (err.password === "Không được bỏ trống") {
                                    document.getElementById("passwordError").innerText = "Không được bỏ trống"
                                } else if (err.password === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                    document.getElementById("passwordError").innerText = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                } else if (err === "" || err.status === 403) {
                                    document.getElementById("passwordError").innerText = "Mật khẩu không chính xác"
                                } else if (err.password === "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự") {
                                    document.getElementById("passwordError").innerText = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự"
                                } else {
                                    document.getElementById("passwordError").innerText = ""
                                }
                            }
                        }
                        loginUser()
                    }}
                    >
                        <Form className="mt-3">
                            <div className="form-group py-2">
                                <div className="input-field"> <span className="far fa-user p-2"></span>
                                    <Field type="text" className="input-login" placeholder="Nhập tài khoản" name="username"/>
                                </div>
                                <div>
                                    <span className="text-dieucosmetics " id="usernameError"></span>
                                </div>
                            </div>
                            <div className="form-group py-1 pb-2">
                                <div className="input-field "> <span className="fas fa-lock p-2"></span>
                                    <Field type={showPassword ? "text" : "password"} placeholder="Nhập mật khẩu" className="input-login" name="password"/>
                                    {
                                        showPassword ? <span type='button' onClick={() => { setShowPassword(!showPassword) }} 
                                        className="bi bi-eye-slash me-2"></span> : 
                                        <span type='button' onClick={() => { setShowPassword(!showPassword) }} 
                                        className="bi bi-eye me-2"></span>
                                    }
                             
                                </div>
                                <div>
                                    <span className="text-dieucosmetics" id="passwordError"></span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <a className="a-login" href="#" id="forgot">Quên mật khẩu?</a>
                            </div>
                            <div className="d-flex justify-content-center mt-2">
                                <NavLink to='/' className="btn btn-block text-center mx-2">Quay lại</NavLink>
                                <button type="submit" className="btn btn-block text-center mx-1">Đăng nhập</button>
                            </div>
                        </Form>
                    </Formik>
                    <div className="text-center pt-3 text-muted">Bạn chưa có tài khoản?
                        <a className="a-login ms-1" href="#">Đăng ký</a>
                    </div>
                </div>
            </div>
        </div>
    )
}