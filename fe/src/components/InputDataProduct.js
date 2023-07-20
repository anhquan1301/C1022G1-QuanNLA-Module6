// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import { Field, Form, Formik } from "formik";
// import { NavLink } from "react-router-dom";
// import productService from "../service/login/product/productService";
// import { useState } from "react";
// import { useEffect } from "react";
// export default function InputDataProduct() {
//   const [producerList, setProducerList] = useState([])
//   const [productypeList, setProductType] = useState([])
//   const [capacityList, setCapacityList] = useState([])
//   const role = localStorage.getItem('role')
//   const findAllProducer = async () => {
//     try {
//       const rs = await productService.findAllProducer()
//       setProducerList(rs.data)
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   const findAllProductType = async () => {
//     try {
//       const rs = await productService.findAllProductType()
//       setProductType(rs.data)
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   const findAllCapacity = async () => {
//     try {
//       const rs = await productService.fildAllCapacity()
//       setCapacityList(rs.data)
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     findAllProducer()
//     findAllProductType()
//     findAllCapacity()
//   }, [])

//   return (
//     <>
//       {
//         role !== "ROLE_ADMIN" ? 
//         <div>
//         <img src="https://web4s.vn/uploads/plugin/news/581/403-forbidden.png" width={'100%'} height={'100%'}/>
//         </div> : 
//         <div style={{
//           marginTop: 150
//         }} className="mb-5 ">
//           <div>
//             <NavLink to={'/'} className="bi bi-house text-secondary fs-4 text-decoration-none ms-5 "><span className="ms-2 fw-normal fs-5">Trang chủ</span></NavLink>
//           </div>
//           <div className="container p-5 shadow-cosmetics-1 mt-3 bg-white">
//             <Formik>
//               <Form className="row">
//                 <div>
//                   <h3 className="text-center text-secondary bg-home py-2">Thêm mới sản phẩm</h3>
//                 </div>
//                 <div className="col-4">
//                   <div className="">
//                     <div className="form-group">
//                       <label htmlFor="">Phân khúc :</label>
//                       <div className="input-field">
//                         <Field component='select' type="text" className="input-login" name="" id="" placeholder="">
//                         <option>---Chọn---</option>
//                           {
//                             productypeList.map((element, index) => (
//                               <option value={element.id} key={index}>
//                                 {element.name}
//                               </option>
//                             ))
//                           }
//                         </Field>
//                       </div>
//                     </div>
//                     <div className="form-group">
//                       <label htmlFor="">Tên sản phẩm : </label>
//                       <div className="input-field">
//                         <input type="text" className="input-login" name="" id="" placeholder="" />
//                       </div>
//                     </div>
//                     <div className="form-group">
//                       <label htmlFor="">Số lượng :</label>
//                       <div className="input-field">
//                         <input type="text" className="input-login" name="" id="" placeholder="" />
//                       </div>
//                     </div>
  
//                   </div>
  
//                 </div>
//                 <div className="col-4">
//                   <div className="">
//                     <div className="form-group">
//                       <label htmlFor="">Dung tích : </label>
//                       <div className="input-field">
//                       <Field component='select' type="text" className="input-login" name="" id="" placeholder="">
//                       <option>---Chọn---</option>
//                           {
//                             capacityList.map((element, index) => (
//                               <option value={element.id} key={index}>
//                                 {element.name}
//                               </option>
//                             ))
//                           }
//                         </Field>
//                       </div>
//                     </div>
//                     <div className="form-group">
//                       <label htmlFor="">Ngày nhập :</label>
//                       <div className="input-field">
//                         <input type="date" className="input-login" name="" id="" placeholder="" />
//                       </div>
//                     </div>
//                     <div className="form-group">
//                       <label htmlFor="">Giá sản phẩm :</label>
//                       <div className="input-field">
//                         <input type="text" className="input-login" name="" id="" placeholder="" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-4">
//                   <div className="">
//                     <div className="form-group">
//                       <label htmlFor="">Thương hiệu : </label>
//                       <div className="input-field">
//                       <Field component='select' type="text" className="input-login" name="" id="" placeholder="">
//                         <option>---Chọn---</option>
//                           {
//                             producerList.map((element, index) => (
//                               <option value={element.id} key={index}>
//                                 {element.name}
//                               </option>
//                             ))
//                           }
//                         </Field>
//                       </div>
//                     </div>
  
//                     <div className="form-group">
//                       <label htmlFor="">Màu sắc : </label>
//                       <div className="input-field">
//                         <input type="text" className="input-login" name="" id="" placeholder="" />
//                       </div>
//                     </div>
//                     <div className="form-group">
//                       <label htmlFor="">Giá khuyến mãi (Không bắt buộc): </label>
//                       <div className="input-field">
//                         <input type="text" className="input-login" name="" id="" placeholder="" />
//                       </div>
//                     </div>
  
//                   </div>
  
//                 </div>
  
//                 <div className="col-12">
//                   <div className="form-group">
//                     <label htmlFor="">Mô tả chi tiết: </label>
//                     <Field name="description">
//                       {({ field, form }) => (
//                         <CKEditor
//                           editor={ClassicEditor}
//                           data={field.value}
//                           onReady={editor => {
//                             editor.editing.view.change(writer => {
//                               writer.setStyle(
//                                 "height",
//                                 "200px",
//                                 editor.editing.view.document.getRoot()
//                               )
//                             })
//                           }}
//                           onChange={(event, editor) => {
//                             const data = editor.getData();
//                             // form.setFieldValue('description', data);
//                           }}
//                           onBlur={(event, editor) => {
//                             const data = editor.getData();
//                             // form.setFieldValue('description', data);
//                             // form.setFieldTouched('description', true);
//                           }}
//                         />
//                       )}
//                     </Field>
//                   </div>
//                 </div>
//                 <div className="col-6">
//                   <div className="form-group">
//                     <label htmlFor="">Hình ảnh : </label>
//                     <div className="">
//                       <label htmlFor="image" type='button' class="bi bi-upload text-white btn bg-secondary"> Tải ảnh lên</label>
//                       <input type="file" hidden className="" name="" id="image" placeholder="" />
//                     </div>
//                     <div>
//                       <img className="" src="https://content.hostgator.com/img/weebly_image_sample.png" alt="" />
//                     </div>
//                   </div>
//                 </div>
//               </Form>
//             </Formik>
//           </div>
//         </div>
//       }
//     </>
//   )
// }