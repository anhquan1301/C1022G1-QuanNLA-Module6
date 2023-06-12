import { NavLink } from "react-router-dom";


export default function Login() {
    return (
        <div className="login-body">
            <div className="padding-login">
            <div className="wrapper bg-white mt-0">
                    <div className="text-center"> <img
                        width='150px'
                        src="dieucosmetics-logo.png"
                        alt="" /></div>
                    <div className="h4 text-muted text-center pt-2">Đăng Nhập Tài Khoản Của Bạn</div>
                    <form className="pt-3">
                        <div className="form-group py-2">
                            <div className="input-field"> <span className="far fa-user p-2"></span>
                                <input type="text" className="input-login" placeholder="Nhập tài khoản" />
                            </div>
                        </div>
                        <div className="form-group py-1 pb-2">
                            <div className="input-field "> <span className="fas fa-lock p-2"></span>
                                <input type="password" placeholder="Nhập mật khẩu" className="input-login" />
                              <span className=" bi bi-eye-slash me-2"></span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end"> 
                        <a className="a-login" href="#" id="forgot">Quên mật khẩu?</a> 
                        </div>
                        <div className="d-flex justify-content-center mt-2">
                        <NavLink to='/' className="btn btn-block text-center mx-2">Quay lại</NavLink>
                        <button className="btn btn-block text-center mx-1">Đăng nhập</button>
                        </div>
                        <div className="text-center pt-3 text-muted">Bạn chưa có tài khoản? 
                        <a className="a-login ms-1" href="#">Đăng ký</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}