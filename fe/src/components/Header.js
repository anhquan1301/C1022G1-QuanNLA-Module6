import { NavLink, Outlet, useNavigate } from 'react-router-dom'
export default function Header() {
  const token = localStorage.getItem('token')
  const avatar = localStorage.getItem('avatar')
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('avatar')
    navigate('/login')
  }
  return (
    <>
      <header className=''>
        <nav className="header-fixed border-bottom border-color">
          <div
            style={{ backgroundColor: "#fff" }}
            className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 border-bottom"
          >
            <a
              href="#"
              className="d-flex align-items-center ms-5 col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
              style={{ marginRight: "-220px" }}>
              <img
                width='150px'
                src="dieucosmetics-logo.png"
                alt="" />
            </a>
            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
              <li>
                <NavLink
                  to='/'
                  className="nav-link  px-4  text-secondary  text-hover "
                >
                  TRANG CHỦ
                </NavLink>
              </li>
              <li>
                <a
                  href="#"
                  className="nav-link  px-4  text-secondary text-hover"
                >
                  GIỚI THIỆU
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="nav-link  px-4  text-secondary text-hover"
                >
                  SẢN PHẨM
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="nav-link  px-4  text-secondary text-hover"
                >
                  KHUYẾN MÃI
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="nav-link  px-4  text-secondary text-hover"
                >
                  HỖ TRỢ
                </a>
              </li>
            </ul>

            <div className="fs-5 search-container">
              <i className="bi bi-search">
                <span className='ms-2 position-absolute' style={{
                  bottom: '3px'
                }}>|</span>
              </i>
              <input type='text' className='form-control search-product ' placeholder='Tìm kiếm sản phẩm' />
            </div>
            <div className="me-5 fs-4 ">
              <div className='float-start'>
                {
                  token === null ? <NavLink to={'/login'} type="button" className=" ms-5 bi bi-person ">
                  </NavLink> :
                    // <div className='fs-6' style={{
                    //   width:'40px',
                    //   height:'40px'
                    // }} >
                    // <img
                    //               src={avatar}
                    //               className="rounded-circle border border-2 border-color"
                    //               alt="avatar"
                    //               width={'100%'}
                    //               height={'100%'}
                    //           />
                    // </div>
                    <div className=" ms-5">
                      {/* Avatar */}
                      <div className="dropdown">
                        <a
                          className="dropdown-toggle d-flex align-items-center hidden-arrow"
                          id="navbarDropdownMenuAvatar"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <div className='fs-6' style={{
                            width: '40px',
                            height: '40px'
                          }} >
                            <img
                              src={avatar}
                              className="rounded-circle border border-2 border-color"
                              alt="avatar"
                              width={'100%'}
                              height={'100%'}
                            />
                          </div>
                        </a>
                        <ul
                          className="dropdown-menu p-0"
                          aria-labelledby="navbarDropdownMenuAvatar"
                        >
                          <li>
                                  <NavLink to='/customer/detail' className="dropdown-item button-buy">
                                      Thông tin cá nhân
                                  </NavLink>
                              </li>
                          <li>
                            <button onClick={handleLogout} className="dropdown-item button-buy" href="#">
                              Đăng xuất
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                }

              </div>
              <div className='float-end cart-container'>
                <i type="button" className=" ms-3 me-5 pe-5 bi bi-cart3 ">
                </i>
                <span className='me-5 pe-5 cart-number'>0</span>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}