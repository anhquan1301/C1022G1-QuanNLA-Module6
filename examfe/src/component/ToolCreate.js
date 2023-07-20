import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as ToolService from '../service/ToolService'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useState } from 'react';
export default function ToolCreate(){
    const navigate = useNavigate()
    const [flagErr,setFlagErr] = useState(false)
    return(
        <>
        <div>
            <div><h2 className="text-danger">Thêm mới sản phẩm</h2></div>
            <div className='col-3'>
                <Formik
                initialValues={{
                    code:'',
                    name:'',
                    producer:'',
                    quantity:0,
                    unit:''
                }}
                validationSchema={Yup.object({
                    code: Yup.string().required("Không được bỏ trống").matches(/^[M][H][-][0-9]{1,5}$/,"Nhập đúng định dạng mã công cụ"),
                    name: Yup.string().required("Không được bỏ trống").matches(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,"Tên công cụ phải nhập đúng định dạng"),
                    producer: Yup.string().required("Không được bỏ trống").matches(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,"Tên hãng sản xuất phải nhập đúng định dạng"),
                    quantity:Yup.number().positive("Số lượng phải là số nguyên dương"),
                    unit: Yup.string().required("Không được bỏ trống")
                })}  
                onSubmit={(value)=>{
                    const create = async()=>{
                        try {
                            await ToolService.toolCreate(value)
                            toast('Thêm mới thành công')
                        } catch (error) {
                            console.log(error);
                            if(error.response.data){
                                setFlagErr(true)
                            }
                        }
                    }
                    create()
                }}
                >
                    <Form>
                        <div className="form-group">
                          <label htmlFor="code">Mã công cụ</label>
                          <Field type="text"
                            className="form-control" name="code" id="code" aria-describedby="helpId" placeholder=""/>
                            {
                                !flagErr ? <ErrorMessage className='text-danger' component='span' name='code'/> : <span className='text-danger'>Mã công cụ đã tồn tại</span>
                            }
                            
                        </div>
                        <div className="form-group">
                          <label htmlFor="name">Tên công cụ</label>
                          <Field type="text"
                            className="form-control" name="name" id="name" aria-describedby="helpId" placeholder=""/>
                            <ErrorMessage className='text-danger' component='span' name='name'/>

                        </div>
                        <div className="form-group">
                          <label htmlFor="producer">Hãng sản xuất</label>
                          <Field type="text"
                            className="form-control" name="producer" id="producer" aria-describedby="helpId" placeholder=""/>
                            <ErrorMessage className='text-danger' component='span' name='producer'/>

                        </div>
                        <div className="form-group">
                          <label htmlFor="quantity">Số lượng</label>
                          <Field type="text"
                            className="form-control" name="quantity" id="quantity" aria-describedby="helpId" placeholder=""/>
                            <ErrorMessage className='text-danger' component='span' name='quantity'/>

                        </div>
                        <div className="form-group">
                          <label htmlFor="unit">Đơn vị</label>
                          <Field type="text"
                            className="form-control" name="unit" id="unit" aria-describedby="helpId" placeholder=""/>
                            <ErrorMessage className='text-danger' component='span' name='unit'/>

                        </div>
                        <div><button type='submit' className='btn btn-secondary'>Thêm mới</button></div>
                    </Form>
                </Formik>
            </div>
        </div>
        
        </>
    )
}
