import { useEffect, useState } from "react"
import * as ToolService from '../service/ToolService'
import ReactPaginate from "react-paginate"
import { NavLink } from 'react-router-dom'


export default function ToolList() {
    const [toolList, setToolList] = useState([])
    const [valueSearch, setValueSearch] = useState('')
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const findByNameTool = async () => {
        try {
            const res = await ToolService.findByNameTool(valueSearch)
            setToolList(res.data.content)
            setPageCount(res.data.totalPages)
            setCurrentPage(res.data.number)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        findByNameTool()
    }, [])
    const handleSearch = (event) => {
        const nameSearch = event.target.value
        setValueSearch(nameSearch)
    }
    const handlePageClick = async (page) => {
        setCurrentPage(page.selected)
        const rs = await ToolService.findByNameTool(valueSearch, page.selected)
        setToolList(rs.data.content)
    }
    return (
        <>
            <div>
                <h2 className="text-danger text-center"></h2>
                <div>
                    <div className="form-group">
                        <label htmlFor=""></label>
                        <input type="text"
                            className="form-control" onChange={handleSearch} aria-describedby="helpId" placeholder="Tìm kiếm theo tên/hãng sản xuất..." />
                    </div>
                    <div><button onClick={() => {findByNameTool()}} className="btn btn-secondary">Tìm kiếm</button></div>
                </div>
                <div >
                    <NavLink  to='/create' className="btn btn-primary">Thêm mới công cụ</NavLink>
                    </div>           
                     <table className="table">
                    <thead>
                        <tr>
                            <th>Mã công cụ</th>
                            <th>Tên công cụ</th>
                            <th>Hãng sản xuất</th>
                            <th>Số lượng</th>
                            <th>Đơn vị</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            toolList.map((element, index) => (
                                <tr key={index}>
                                    <td scope="row">{element.code}</td>
                                    <td>{element.name}</td>
                                    <td>{element.producer}</td>
                                    <td>{element.quantity}</td>
                                    <td>{element.unit}</td>
                                    <td></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <ReactPaginate 
                    previousLabel="Trước"
                    nextLabel="Sau"
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName='pagination'
                    previousClassName='page-item'
                    previousLinkClassName='page-link'
                    nextClassName= 'page-item'
                    nextLinkClassName='page-link'
                    pageClassName='page-item'
                    pageLinkClassName='page-link'
                    activeClassName='active'
                    activeLinkClassName='page-link'
                    forcePage={currentPage}
                />
            </div>
        </>
    )
}