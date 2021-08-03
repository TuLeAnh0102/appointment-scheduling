import React, { useEffect, useState, useRef } from "react";
import {
    CButton,
    CCardBody,
    CModal,
    CModalHeader,
    CModalTitle,
    CFormGroup,
    CModalBody,
    CForm
} from "@coreui/react";

import "react-table-v6/react-table.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { congNhanService } from "src/services/congnhan.service";
import { commonService } from "../../../services";
import Controls from "src/components/Controls/Controls";
import { Loading } from "src/components/Loading/loading";
import Diachi from "src/components/ToKhaiYTe/Diachi";
import { VanTaiService } from "src/services/vantai.service";


export default function DiemKiemTra(props) {
    const { keyForEdit, propShow, propOnClose, row } = props;
    // const [isLoadding, setisLoadding] = useState(0);
    const [trong_ngoai_tinh, settrong_ngoai_tinh] = useState(0);
    const [dmtinh, setdmTinh] = useState([]);
    const [diemKiemTra, setdiemKiemTra] = useState({
        ma_tinh: 70,
        ma_huyen: 0,
        ma_xa: 0
    });

    const summaryNoiOHienNay =
    {
        ten_tinh: 'tinh_noi_den',
        ten_huyen: 'huyen_noi_den',
        ten_xa: 'xa_noi_den',
        ten_so_nha: 'so_nha_den',
    };
    // form validation rules
    const validationSchema = Yup.object().shape({
        // ma_xa_thuong_tru: Yup.string().required("Vui lòng chọn"),
        // ma_huyen_thuong_tru: Yup.string().required("Vui lòng chọn...."),
        // ma_huyen_tam_tru: Yup.string().required("Vui lòng chọn"),
        // ma_xa_tam_tru: Yup.string().required("Vui lòng chọn "),
        // ma_khu_cong_nghiep: Yup.string().required("Vui lòng chọn "),
        // ma_cong_ty: Yup.string().required("Vui lòng chọn "),
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, control } = useForm({
        resolver: yupResolver(validationSchema),
    });


    const handleSelectClick = (name, value) => {
        setValue(name, value);
    };

    //get danh muc tinh
    useEffect(() => {
        commonService.getDanhMucTinh().then((res) => {
            if (res.success && res.data != null) {
                setdmTinh(res.data);
            }
        });
    }, []);

    // get cong nhan theo id
    useEffect(() => {
        if (keyForEdit) {
            fillDataToFormKhaiBao(row);
        }
    }, [keyForEdit]);

    const fillDataToFormKhaiBao = (res) => {
        console.log(res);
        const fields = [
            'so_nha_den'
        ];
        fields.forEach((field) => {
            setValue(field, res[field]);
        });
        setdiemKiemTra({
            ...diemKiemTra,
            ma_tinh: res['tinh_noi_den'],
            ma_huyen: res['huyen_noi_den'],
            ma_xa: res['xa_noi_den']
        })
    }

    function onSubmit(data) {
        // let dataSubmit = { ...data, ma_cong_nhan};
        keyForEdit ? updateRecord({...data, ma_chot: keyForEdit}): createRecord(data);
        // console.log('xxxx', data);
    }

    function updateRecord(row) {
        console.log(row);
        VanTaiService.CapNhatDiemKiemTra(row).then(res => {
            if (res.success) {
                alert(res.message);
                propOnClose();
            }
        })
    }

    function createRecord(data) {
        console.log(data);
        //setisLoadding(1);//thêm dòng để chống click liên thêm 2 3 lần
        VanTaiService.PostKhaiBaoChotKiemTra(data).then((res) => {
            reset({});
            if (res["id"] === 1) {
                //setisLoadding(0);
                propOnClose();
                alert("Khai báo Thông tin thành công!");
            } else alert(res["message"]);
        });
    }

    const OnTrongNgoaiTinhChange = () => {
        settrong_ngoai_tinh(!trong_ngoai_tinh);
    }

    return (
        <CModal
            show={propShow}
            closeOnBackdrop={false}
            onClose={propOnClose}
            size="lg"
        >
            <CModalHeader closeButton>
                <CModalTitle className="text-center">ĐIỂM KIỂM TRA GIAO/NHẬN HÀNG HÓA</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CCardBody className="pt-0 pb-0">
                    <CForm onSubmit={handleSubmit(onSubmit)}>
                        <CFormGroup row className="my-0">
                            {/* <CCol xs="12">
                                                <h5>Điểm kiểm tra</h5>
                                            </CCol> */}
                            <Diachi
                                handelOnChange={handleSelectClick}
                                errors={errors}
                                dataTinh={dmtinh}
                                register={register}
                                summary={summaryNoiOHienNay}
                                control={control}
                                diachiKhoitao={diemKiemTra}
                                labelRequired={'(*)'}
                            />
                        </CFormGroup>
                        <div className="form-actions float-right">
                            <CButton
                                type="submit"
                                color="success"
                                value="btnLuu"
                                className="mr-2"
                                style={{ margin: "1em" }}
                            >
                                Lưu
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody>
            </CModalBody>
        </CModal>

    );
}

