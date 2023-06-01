import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import customerService from "../service/login/customer/customerService"
import loginService from './../service/login/loginService';
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../FireBase";
import { is } from "date-fns/locale";
import Header from './Header';
import { AvatarContext } from "./AvatarContext";
import { useContext } from "react";
import { RotatingLines } from "react-loader-spinner";
export default function CustomerUpdate() {
    const [customerDetail, setCustomerDetail] = useState()
    const token = localStorage.getItem('token')
    const [selectedFile, setSelectedFile] = useState(null);
    const [firebaseImg, setImg] = useState(null);
    const [isChangeImg, setIsChangeImg] = useState(false);
    const navigate = useNavigate()
    const { setAvatar } = useContext(AvatarContext);
    const [avatarDetail,setAvatarDetail] = useState('')
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
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file instanceof File || file instanceof Blob) {
            setSelectedFile(file);
            setIsChangeImg(true)
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result;
                setAvatarDetail(imageUrl);
            };
            reader.readAsDataURL(file);
        } else {
            console.error('Invalid file or blob');
        }
    };
    const handleSubmitAsync = async () => {
        return new Promise((resolve, reject) => {
            const file = selectedFile;
            if (!file) return reject("No file selected");
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
                    setImg(downloadURL);
                    resolve(downloadURL);
                }
            );
        });
    }
    useEffect(() => {
        setAvatar(customerDetail?.avatar)
        setAvatarDetail(customerDetail?.avatar)
    }, [customerDetail?.avatar])
    if (!customerDetail) {
        return null
    }
    return (
        <>
            <Formik
                initialValues={{
                    id: customerDetail?.id,
                    name: customerDetail?.name,
                    gender: customerDetail?.gender,
                    dateOfBirth: customerDetail?.dateOfBirth,
                    email: customerDetail?.email,
                    phoneNumber: customerDetail?.phoneNumber,
                    address: customerDetail?.address,
                    avatar: customerDetail?.avatar,
                }}
                onSubmit={(value,{setSubmitting} ) => {
                    const editCustomer = async () => {
                        try {
                            if (isChangeImg) {
                                const newValues = { ...value, avatar: firebaseImg };
                                newValues.avatar = await handleSubmitAsync();
                                await customerService.update(newValues)
                            } else {
                                await customerService.update(value)
                                setIsChangeImg(false)
                            }
                            navigate('/customer/detail')
                            setSubmitting(false)
                            Swal.fire({
                                icon: 'success',
                                title: 'Chỉnh sửa thông tin thành công',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    editCustomer()
                }}
            >
                {({ values,isSubmitting }) => (
                    <Form>
                        <div style={{
                            marginTop: 100
                        }}>
                            <div className="row mx-0 mt-5 p-5 ">
                                <div>
                                    <NavLink to={'/'} className="bi bi-house text-secondary fs-4 text-decoration-none"><span className="ms-2 fw-normal fs-5">Trang chủ</span></NavLink>
                                </div>
                                <div className="container p-5 shadow-cosmetics-1 mt-3 bg-white">
                                    <div className="row">
                                        <div className="col-3 mt-4">
                                            <div className='position-relative'>
                                                <div className="avatar">
                                                    <img src={avatarDetail}
                                                        className="border-avatar rounded-circle " width='100%' height='100%' alt="avatar" />
                                                </div>
                                                <div className="border-camera">
                                                    <label htmlFor="avatar" type='button' className="bi bi-camera-fill fs-2"></label>
                                                    <input type="file"
                                                        onChange={handleFileSelect}
                                                        className='d-none' id='avatar' name='avatar' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-9">
                                            <div className="row ms-3 px-3">
                                                <h2 className="text-center text-dieucosmetics">CHỈNH SỬA THÔNG TIN CÁ NHÂN</h2>
                                                <div className="col-12 px-0">
                                                    <div className="bg-white mt-0">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="form-group mt-2">
                                                                    <label className="text-register">Mã khách hàng :</label>
                                                                    <div className="input-field-1">
                                                                        <span className="input-login text-danger fw-bold" >{customerDetail?.code}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group mt-2">
                                                                    <label htmlFor="name" className="text-register">Họ và tên :</label>
                                                                    <div className="input-field-1">
                                                                        <Field type="text" className="input-login" name="name" id="name" placeholder="Nhập họ và tên" />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group mt-2">
                                                                    <label className="text-register">Giới tính :</label>
                                                                    <div className="mt-2">
                                                                        <div className="form-check form-check-inline ">
                                                                            <Field className="form-check-input" type="radio" name="gender" id="inlineRadio1" value="false"
                                                                                checked={values.gender === false ? true : null} />
                                                                            <label className="form-check-label text-register" htmlFor="inlineRadio1">Nam</label>
                                                                        </div>
                                                                        <div className="form-check form-check-inline">
                                                                            <Field className="form-check-input" type="radio" name="gender" id="inlineRadio2" value="true"
                                                                                checked={values.gender === true ? true : null} />
                                                                            <label className="form-check-label text-register" htmlFor="inlineRadio2">Nữ</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group mt-2">
                                                                    <label htmlFor="dateOfBirth" className="text-register">Ngày sinh :</label>
                                                                    <div className="input-field-1">
                                                                        <Field type="date" className="input-login" name="dateOfBirth" id="dateOfBirth" />
                                                                    </div>
                                                                </div>
                                                               

                                                            </div>
                                                            <div className="col-6">
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
                                                            { 
                                                            isSubmitting 
                                                            ?  
                                                            <div className="d-flex justify-content-center mt-4 ms-4">
                                                            <RotatingLines
                                                                strokeColor="grey"
                                                                strokeWidth="5"
                                                                animationDuration="0.75"
                                                                width="30"
                                                                visible={true}
                                                            />
                                                            </div> 
                                                            : 
                                                            <div className="d-flex justify-content-center mt-4">
                                                                <NavLink to='/customer/detail' className="button-buy text-decoration-none text-center mx-2">Quay lại</NavLink>
                                                                <button type="submit" className="button-buy text-center mx-1">Xác nhận</button>
                                                            </div> 
                                                            }
                                                           
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                    </Form>
                )}
            </Formik>
        </>
    )
}