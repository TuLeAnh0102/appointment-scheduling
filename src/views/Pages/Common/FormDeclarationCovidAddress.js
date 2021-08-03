import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Controls from "../../../components/Controls/Controls";
import {
    CButton,
    CCol,
    CFormGroup,
    CForm,
    CRow,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CCardBody,
    CLabel
} from "@coreui/react";
import { alertAction } from "src/actions";
import { theoDoiCachLyService } from "../../../services";
import { commonService } from "../../../services";
import { history } from 'src/helpers/history';
import { Loading } from "src/components/Loading/loading";
import { Controller } from "react-hook-form";
import Select from 'react-select';


const listGioiTinh = () => [
    { id: "1", title: "Nam" },
    { id: "0", title: "Nữ" },
];

const listTrangThai = [
    { id: 1, title: "Vùng Covid" },
    { id: 2, title: "Vùng an toàn" },
];

export default function MauKhaiBaoDiemPhongToa(props) {
    const { keyForEdit, propShow, propOnClose, row } = props;
    const isAddMode = !keyForEdit ? true : false;
    const [record, setRecord] = useState({});
    const [dmTinh, setDmTinh] = useState([]);
    const [dmHuyen, setDmHuyen] = useState([]);
    const [dmXa, setDmXa] = useState([]);
    const dispatch = useDispatch();
    const [isLoading, setloading] = useState(false);

    // form validation rules
    const validationSchema = Yup.object().shape({
        // dia_diem_phong_toa: Yup.string().required("Vui lòng nhập"),
        // id_phuong_xa: Yup.string().required("Vui lòng chọn"),
        // id_quan_huyen: Yup.string().required("Vui lòng chọn"),
        // id_tinh_tp: Yup.string().required("Vui lòng chọn"),
        // trang_thai: Yup.string().required("Vui lòng chọn"),
    });

    const [tenCongTy, settenCongTy] = useState({ id: 70, title: 'cty Ma' });
    const noOptionsMessage = () => {
        return "Không có dữ liệu!"
    }

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, control} = useForm({
        // resolver: yupResolver(validationSchema),
    });
    // console.log(errors);
    async function handleTinhChange(e) {
        await commonService.getDanhMucHuyen(e.target.value).then(res => {
            if (res.success && res.data.length) {
                setDmHuyen(res.data);
                //setValue('id_tinh_tp',70);

            }
        })
    }

    async function getHuyenTuTinh(id_tinh){

        await commonService.getDanhMucHuyen(id_tinh).then(res => {
            if (res.success && res.data) {
                setDmHuyen(res.data);
                console.log("getHuyenTuTinh");

            }
        })
    }

    async function getXaTuHuyen(id_huyen){
        await commonService.getDanhMucXa(id_huyen).then((res) => {
            if (res.success && res.data) {
                setDmXa(res.data);
                console.log("getXaTuHuyen");
            }
        })
    }

    async function handleHuyenChange(e) {
        await commonService.getDanhMucXa(e.target.value).then((res) => {
            if (res.success && res.data) {
                setDmXa(res.data);
            }
        });
    }

    async function initTinh(){
        await commonService.getDanhMucTinh().then(res => {
            if (res.success && res.data.length) {
                setDmTinh(res.data);
                console.log("initTinh");
            }
        });
    }

    async function mappingDatatoForm() {
        console.log("mappingDatatoForm");
        const fields = [
            "dia_diem_phong_toa",
            "id_phuong_xa",
            "id_quan_huyen",
            "id_tinh_tp",
            "trang_thai",
        ];
        fields.forEach((field) => setValue(field, row[field]));
    }

    console.log(errors);

    useEffect(() => {
        async function handleAsync() {
            if (isAddMode) {
                reset({
                    trang_thai: 1,
                });
            } else {
                await initTinh();
                await getHuyenTuTinh(row.id_tinh_tp);
                await getXaTuHuyen(row.id_quan_huyen);
                await mappingDatatoForm();
            }
            // return true;
        }
        handleAsync();
        
    }, [keyForEdit]);

    useEffect(() => {
        initTinh();
    }, [])

    

    function onSubmit(data) {
        return createRecord(keyForEdit, data);
    }

    function createRecord(keyForEdit, data) {
        return theoDoiCachLyService
            .ThemDiemPhongToaCovid(keyForEdit, data)
            .then(res => {
                if(res.success){
                    alert("Cập nhật mới");
                }else{
                    alert("Error: không thể thêm mới");
                }
                propOnClose();
            })
            .catch(error => alert(error));
    }

    function updateRecord(id, data) {
        return theoDoiCachLyService
            .updateTheoDoiCachLy(data, id)
            .then(() => {
                alert("Cập nhật thành công !!")
            })
            .catch(
                dispatch(alertAction.error("Error: không thể cập nhật thông tin"))
            );
    }

    // console.log(dmTinh, dmHuyen, dmXa, row);

    return (
        <CModal
            show={propShow}
            closeOnBackdrop={false}
            onClose={propOnClose}
            size="lg"
        >
            <CModalHeader closeButton>
                <CModalTitle className="text-center">KHAI BÁO ĐIỂM PHONG TỎA</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CCardBody className="pt-0 pb-0">
                    
                    <CForm onSubmit={handleSubmit(onSubmit)}>
                        <CFormGroup>
                            <CRow>
                                <CCol xs="12">
                                    <h4>Khai báo điểm vùng dịch</h4>
                                </CCol>
                                {/* <CCol lg="4" xs="12">
                                    <CLabel htmlFor='tinh_tp'>Tỉnh, TP</CLabel>
                                    <Controller
                                        name='tinh_tp'
                                        control={control}
                                        defaultValue=""
                                        render={() => (
                                            <Select
                                                placeholder="Chọn . . . ."
                                                noOptionsMessage={noOptionsMessage}
                                                name='tinh_tp'
                                                options={dmTinh}
                                                value={tenCongTy}
                                                getOptionLabel={(option) => option.title}
                                                getOptionValue={(option) => option.id}
                                                // onChange={handleOnSelectChange.bind()}
                                                //className={${errors['ten_cong_ty'] ? "is-invalid" : ""}}
                                                //styles={colourStyles}
                                            />
                                        )}
                                    />
                                </CCol> */}
                                <CCol xs="12" lg="4" >
                                    <Controls.Select
                                        label="Tỉnh/thành phố"
                                        name="id_tinh_tp"
                                        value={row.id_tinh_tp}
                                        onChange={handleTinhChange}
                                        options={dmTinh}
                                        error={errors.id_tinh_tp}
                                        register={register}
                                    />
                                </CCol>
                                <CCol lg="4" xs="12">
                                    <Controls.Select
                                        label="Quận huyện"
                                        name="id_quan_huyen"
                                        value={row.id_quan_huyen}
                                        onChange={handleHuyenChange}
                                        options={dmHuyen}
                                        error={errors.ma_huyen}
                                        register={register}
                                    />
                                </CCol>
                                <CCol lg="4" xs="12">
                                    <Controls.Select
                                        label="Xã, phường, trị trấn"
                                        name="id_phuong_xa"
                                        options={dmXa}
                                        
                                        error={errors.ma_xa}
                                        register={register}
                                    />
                                </CCol>
                                <CCol lg="8" xs="12">
                                    <Controls.Input
                                        label="Điểm phong tỏa"
                                        name="dia_diem_phong_toa"
                                        type="text"
                                        register={register}
                                        error={errors.dia_diem_phong_toa}
                                    />
                                </CCol>

                                <CCol lg="4" xs="12">
                                    <Controls.Select
                                        label="Trạng thái"
                                        name="trang_thai"
                                        options={listTrangThai}
                                        error={errors.trang_thai}
                                        register={register}
                                    />
                                </CCol>
                            </CRow>
                        </CFormGroup>
                        <div className="form-actions float-right">
                            <CButton type="submit" color="success" className="mr-2">
                                Lưu
                            </CButton>
                            <CButton color="secondary" onClick={propOnClose}>
                                Thoát
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody>
            </CModalBody>
        </CModal>

    );
}
