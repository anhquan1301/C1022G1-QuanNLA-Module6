import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Field, Form, Formik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import productService from "../service/login/product/productService";
import { useState } from "react";
import { useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../FireBase";
import Swal from "sweetalert2";
export default function ProductCreate() {

  const [producerList, setProducerList] = useState([])
  const [productypeList, setProductType] = useState([])
  const [capacityList, setCapacityList] = useState([])
  const role = localStorage.getItem('role')
  const [listData, setListData] = useState([])
  const [listImage, setListImage] = useState([])
  const [selectedFile, setSelectedFile] = useState([]);
  const [listImgFirebase, setListImgFirebase] = useState([]);
  const navigate = useNavigate();
  const findAllProducer = async () => {
    try {
      const rs = await productService.findAllProducer()
      setProducerList(rs.data)
    } catch (error) {
      console.log(error);
    }
  }
  const findAllProductType = async () => {
    try {
      const rs = await productService.findAllProductType()
      setProductType(rs.data)
    } catch (error) {
      console.log(error);
    }
  }
  const findAllCapacity = async () => {
    try {
      const rs = await productService.fildAllCapacity()
      setCapacityList(rs.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    findAllProducer()
    findAllProductType()
    findAllCapacity()

  }, [])
  useEffect(() => {
    document.title = "Thêm Mới Sản Phẩm";
}, [])
  const handleListData = (values, resetForm) => {
    const capacity = capacityList.filter(element => +element.id === +values.capacity)
    const newData = {
      capacity: capacity[0],
      quantity: values.quantity,
      price: values.price,
      priceSale: values.priceSale
    };
    const updatedListData = [...listData, newData];
    setListData(updatedListData);
    resetForm({ values: { ...values, capacity: '', quantity: '', price: '', priceSale: '' } });
  }
  const handleDeleteDataProduct = (id) => {
    setListData(listData.filter(element => element.capacity.id != id))
  }
  const handleFileSelect = (event) => {
    const files = event.target.files;
    const fileList = Array.from(files)
    fileList.forEach((file) => {
      const isExistingFile = selectedFile.some((selected) =>
        selected.name === file.name && selected.size === file.size
      );
      if (isExistingFile) {
        return Swal.fire({
          icon: 'error',
          title: 'Bạn đã chọn ảnh này',
          showConfirmButton: false,
          timer: 1500
        });
      }
      if (file instanceof File || file instanceof Blob) {
        const extension = file.name
        const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(extension);
        if (!isImage) {
          return Swal.fire({
            icon: 'error',
            title: 'Sai định dạng ảnh',
            showConfirmButton: false,
            timer: 1500
          })
        }
        setSelectedFile([...selectedFile, ...fileList]);
        const reader = new FileReader();
        reader.onload = () => {
          const imageUrl = reader.result;
          setListImage((prevListImage) => [...prevListImage, imageUrl]);
        };
        reader.readAsDataURL(file);
      } else {
        console.error('Invalid file or blob');
      }
    })
  };
  const handleSubmitAsync = async () => {
    return new Promise((resolve, reject) => {
      if (selectedFile.length === 0) {
        return Swal.fire({
          icon: 'error',
          title: 'Bạn chưa chọn ảnh',
          showConfirmButton: false,
          timer: 1500
        })
      }
      const uploadPromises = selectedFile.map((file) => {
        return new Promise(async (resolve, reject) => {
          const extension = file.name;
          const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(extension);
          if (!isImage) {
            return Swal.fire({
              icon: 'error',
              title: 'Sai định dạng ảnh',
              showConfirmButton: false,
              timer: 1500
            })
          }
          const storageRef = ref(storage, `files/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
            },
            (error) => {
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            }
          );
        });
      });
      Promise.all(uploadPromises)
        .then((urls) => {
          resolve(urls);
          setListImgFirebase((prevListImage) => [...prevListImage, ...urls]);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  const handleRemoveImage = (index) => {
    const updatedList = [...listImage];
    updatedList.splice(index, 1);
    setListImage(updatedList);
    const updatedListSelectedFile = [...selectedFile];
    updatedListSelectedFile.splice(index, 1);
    setSelectedFile(updatedListSelectedFile);
  }

  return (
    <>
      {
        role !== "ROLE_ADMIN" ?
          <div>
            <img src="https://web4s.vn/uploads/plugin/news/581/403-forbidden.png" width={'100%'} height={'100%'} />
          </div> :
          <div style={{
            marginTop: 150
          }} className="mb-5 ">
            <div>
              <NavLink to={'/'} className="bi bi-house text-secondary fs-4 text-decoration-none ms-5 ps-5">
                <span className="ms-2 fw-normal fs-5">Trang chủ</span>
                </NavLink>
            </div>
            <div className="container p-5 shadow-cosmetics-1 mt-3 bg-white">
              <Formik
                initialValues={{
                  productTypeId: '',
                  producerId: '',
                  addNewDate: '',
                  name: '',
                  description: '',
                  color: '',
                  imageSet: [],
                  capacityProductDTOS: []
                }}
              onSubmit={(value) => {
                const productCreate = async () => {
                  value.imageSet = await handleSubmitAsync()
                  value.capacityProductDTOS = listData
                  try {
                    await productService.productCreate(value)
                    navigate('/product')
                    Swal.fire({
                      icon: 'success',
                      title: 'Thêm sản phẩm thành công',
                      showConfirmButton: false,
                      timer: 1500
                    })
                  } catch (error) {
                    console.log(error);
                  }
                }
                productCreate()
              }}
              >
              {({ values, resetForm }) => (<Form className="row">
                <div>
                  <h3 className="text-center text-secondary bg-home py-2">Thêm mới sản phẩm</h3>
                </div>
                <div className="col-4">
                  <div className="">
                    <div className="form-group">
                      <label htmlFor="productTypeId">Phân khúc :</label>
                      <div className="input-field">
                        <Field component='select' type="text" className="input-login" name="productTypeId" id="productTypeId" placeholder="">
                          <option>---Chọn---</option>
                          {
                            productypeList.map((element, index) => (
                              <option value={element.id} key={index}>
                                {element.name}
                              </option>
                            ))
                          }
                        </Field>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Tên sản phẩm : </label>
                      <div className="input-field">
                        <Field type="text" className="input-login" name="name" id="name" placeholder="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="addNewDate">Ngày nhập :</label>
                    <div className="input-field">
                      <Field type="date" className="input-login" name="addNewDate" id="addNewDate" placeholder="" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="color">Màu sắc : </label>
                    <div className="input-field">
                      <Field type="text" className="input-login" name="color" id="color" placeholder="" />
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group">
                    <label htmlFor="">Thương hiệu : </label>
                    <div className="input-field">
                      <Field component='select' type="text" className="input-login" name="producerId" id="producerId" placeholder="">
                        <option>---Chọn---</option>
                        {
                          producerList.map((element, index) => (
                            <option value={element.id} key={index}>
                              {element.name}
                            </option>
                          ))
                        }
                      </Field>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="">Mô tả chi tiết: </label>
                    <Field name="description">
                      {({ field, form }) => (
                        <CKEditor
                          editor={ClassicEditor}
                          data={field.value}
                          onReady={editor => {
                            editor.editing.view.change(writer => {
                              writer.setStyle(
                                "height",
                                "200px",
                                editor.editing.view.document.getRoot()
                              )
                            })
                          }}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            form.setFieldValue('description', data);
                          }}
                          onBlur={(event, editor) => {
                            const data = editor.getData();
                            form.setFieldValue('description', data);
                            form.setFieldTouched('description', true);
                          }}
                        />
                      )}
                    </Field>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="">
                        <h5>Hình ảnh :</h5>
                      </label>
                      <div className="">
                        <label htmlFor="image" type='button' className="bi bi-upload text-white btn bg-secondary"> Tải ảnh lên</label>
                        <input type="file" multiple hidden className="" name="image" id="image" onChange={handleFileSelect} />
                      </div>
                      {
                        listImage.length === 0 &&
                        <div>
                          <img className="" src="https://content.hostgator.com/img/weebly_image_sample.png" alt="" />
                        </div>
                      }
                      <div className="row">
                        {listImage.map((element, index) => (
                          <div className="col-6" key={index}>
                            <div style={{ position: 'relative' }}>
                              <img className="my-2" style={{ height: '282px', width: '282px' }} src={element} alt="image" />
                              <span
                                type="button"
                                className="btn btn-outline-danger rounded-0 mt-2"
                                style={{ position: 'absolute', top: '0', right: '0' }}
                                onClick={() => handleRemoveImage(index)}
                              >
                                X
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-6 border p-5 border-color">
                    <div className="text-secondary bg-home py-1 text-center"><h4>Nhập dữ liệu sản phẩm</h4></div>
                    <div className="row mt-4">
                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="capacity">Dung tích : </label>
                          <div className="input-field">
                            <Field component='select' className="input-login" name="capacity" id="capacity">
                              <option value=''>---Chọn---</option>
                              {
                                capacityList.map((element, index) => (
                                  <option value={element.id} key={index}>
                                    {element.name}
                                  </option>
                                ))
                              }
                            </Field>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="quantity">Số lượng :</label>
                          <div className="input-field">
                            <Field type="text" className="input-login" name="quantity" id="quantity" placeholder="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="price">Giá dự kiến (Không bắt buộc) :</label>
                          <div className="input-field">
                            <Field type="text" className="input-login" name="price" id="price" placeholder="" />
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group">
                          <label htmlFor="priceSale">Giá chính thức : </label>
                          <div className="input-field">
                            <Field type="text" className="input-login" name="priceSale" id="priceSale" placeholder="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-4"></div>
                      <div className="col-4"></div>
                      <div className="col-4 text-end ">
                        <button
                          type="button"
                          onClick={() =>
                            handleListData(values, resetForm)
                          }
                          className=" button-buy">Nhập dữ liệu
                        </button>
                      </div>
                    </div>
                    <div>
                      {
                        listData.length !== 0 &&
                        <table className="w-100 mt-3 text-center">
                          <thead>
                            <tr className="text-dieucosmetics my-2">
                              <th>Dung tích</th>
                              <th>Số lượng</th>
                              <th>Giá dự kiến</th>
                              <th>Giá chính thức</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              listData.map(element => (
                                <tr className="my-2">
                                  <td scope="row">{element.capacity.name}</td>
                                  <td>{element.quantity}</td>
                                  <td>{element.price}</td>
                                  <td>{element.priceSale}</td>
                                  <td><span type='button' onClick={() => handleDeleteDataProduct(element.capacity.id)} className="bi bi-trash text-dieucosmetics fs-5"></span></td>
                                </tr>
                              ))
                            }
                          </tbody>
                        </table>
                      }
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 mt-3">
                    <button type='button' className="button-buy float-end" onClick={()=>resetForm()}>Hủy nhập</button>
                    </div>
                <div className="col-6 mt-3">
                  <button className="button-buy" type="submit">Thêm mới</button>
                </div>
                </div>
              </Form>
              )}
            </Formik>
          </div>
          </div >
      }
    </>
  )
}