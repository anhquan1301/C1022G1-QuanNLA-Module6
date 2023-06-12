import { NavLink, Outlet } from 'react-router-dom'
export default function Header() {

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
                  className="nav-link  px-4  text-dark text-hover"
                >
                  TRANG CHỦ
                </NavLink>
              </li>
              <li>
                <a
                  href="#"
                  className="nav-link  px-4  text-dark text-hover"
                >
                  GIỚI THIỆU
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="nav-link  px-4  text-dark text-hover"
                >
                  SẢN PHẨM
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="nav-link  px-4  text-dark text-hover"
                >
                  KHUYẾN MÃI
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="nav-link  px-4  text-dark text-hover"
                >
                  HỖ TRỢ
                </a>
              </li>
            </ul>

            <div className="fs-5 search-container">
              <i class="bi bi-search">
                <span className='ms-2 position-absolute' style={{
                  bottom: '3px'
                }}>|</span>
              </i>
              <input type='text' className='form-control search-product ' placeholder='Tìm kiếm sản phẩm' />
            </div>
            <div className="me-5 fs-4 ">
              <div className='float-start'>
                <NavLink to={'/login'} type="button" className=" ms-5 bi bi-person ">
                </NavLink>
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