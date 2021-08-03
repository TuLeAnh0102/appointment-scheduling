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
    CInputRadio,
    CLabel,
    CRow,
    CContainer,
} from "@coreui/react";
import { alertAction } from "src/actions";
import { theoDoiCachLyService } from "../../../services";
import { commonService } from "../../../services";

const listGioiTinh = () => [
    { id: "1", title: "Nam" },
    { id: "0", title: "Nữ" },
];

export default function MauKhaiBaoYTe(props) {
    const { keyForEdit, propShow, propOnClose } = props;
    const isAddMode = keyForEdit === 0 ? true : false;
    const [record, setRecord] = useState({});
    const [dmTinh, setDmTinh] = useState([]);
    // const [dmTinh_, setDmTinh] = useState([]);
    const [tinh, setTinh] = useState(70);
    const [dmHuyen, setDmHuyen] = useState([]);
    const [huyen, setHuyen] = useState(null);
    const [dmXa, setDmXa] = useState([]);
    const dispatch = useDispatch();

    // form validation rules
    const validationSchema = Yup.object().shape({
        ho_ten: Yup.string().required("Vui lòng nhập họ tên"),
        nam_sinh: Yup.string().required("Vui lòng nhập năm sinh"),
        gioi_tinh: Yup.string().required("Vui lòng chọn giới tính"),
        so_dien_thoai: Yup.string().required("Vui lòng nhập số điện thoại"),
        so_nha: Yup.string().required("Vui lòng nhập số chổ ngồi"),
        ma_xa: Yup.string().required("Vui lòng chọn xã"),
        ma_huyen: Yup.string().required("Vui lòng chọn huyện"),
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors } = useForm({
        resolver: yupResolver(validationSchema),
    });

    function handleHuyenChange(e) {
        commonService.getDanhMucXa(e.target.value).then((res) => {
            if (res.success && res.data != null) {
                setDmXa(res.data);
            }
        });
    }

    useEffect(() => {
        commonService.getDanhMucHuyen(tinh).then((res) => {
            if (res.success && res.data != null) {
                setDmHuyen(res.data);
            }
        });
    }, []);

    useEffect(() => {
        if (isAddMode) {
            reset({});
        } else {
            theoDoiCachLyService.getTheoDoiCachLy(keyForEdit).then((res) => {
                if (res.success && res.data != null) {
                    const fields = [
                        "ho_ten",
                        "nam_sinh",
                        "gioi_tinh",
                        "so_nha",
                        "ma_xa",
                        "ma_huyen",
                        "ma_tinh",
                        "thoi_gian_lay_mau",
                        "noi_lay_mau",
                        "so_dien_thoai",
                        "so_nha_dich_te",
                    ];
                    fields.forEach((field) => setValue(field, res.data[field]));
                    setRecord(record);
                }
            });
        }
    }, [keyForEdit]);

    function onSubmit(data) {
        return isAddMode ? createRecord(data) : updateRecord(keyForEdit, data);
    }

    function createRecord(data) {
        return theoDoiCachLyService
            .insertTheoDoiCachLy(data)
            .then(() => {
                alertAction.success("Thêm mới thành công", {
                    keepAfterRouteChange: true,
                });
                //history.push('.');
            })
            .catch(dispatch(alertAction.error("Error: không thể thêm mới")));
    }

    function updateRecord(id, data) {
        return theoDoiCachLyService
            .updateTheoDoiCachLy(data, id)
            .then(() => {
                dispatch(
                    alertAction.success("Cập nhật mới", { keepAfterRouteChange: true })
                );
                //history.push('..');
            })
            .catch(
                dispatch(alertAction.error("Error: không thể cập nhật thông tin"))
            );
    }

    function handleTinhChange(){

    }


    return (
        <CContainer>
            <CFormGroup>
                <CRow>
                    <CCol xs="3">
                        <Controls.InputV2
                            label="Họ tên"
                            name="ho_ten"
                            type="text"
                            register={register}
                            error={errors.ho_ten}
                        />
                    </CCol>

                    <CCol xs="3">
                        <Controls.InputV2
                            label="Năm sinh"
                            name="nam_sinh"
                            type="text"
                            error={errors.nam_sinh}
                            register={register}
                        />
                    </CCol>

                    <CCol xs="3">
                        <Controls.InputV2
                            label="Số điện thoại"
                            name="so_dien_thoai"
                            type="text"
                            register={register}
                            error={errors.so_dien_thoai}
                        />
                    </CCol>

                    <CCol xs="3">
                        <CFormGroup variant="custom-radio" inline>
                            <CInputRadio
                                custom
                                id="inline-radio1"
                                name="gioi_tinh"
                                value="1"
                            />
                            <CLabel variant="custom-checkbox" htmlFor="inline-radio1">
                                Nam
                            </CLabel>
                        </CFormGroup>

                        <CFormGroup variant="custom-radio" inline>
                            <CInputRadio
                                custom
                                id="inline-radio0"
                                name="gioi_tinh"
                                value="0"
                            />
                            <CLabel variant="custom-checkbox" htmlFor="inline-radio0">
                                Nữ
                            </CLabel>
                        </CFormGroup>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol xs="3">
                        <Controls.InputV2
                            label="Quốc tịch"
                            name="quoc_tich"
                            type="text"
                            register={register}
                        />
                    </CCol>

                    <CCol xs="3">
                        <Controls.InputV2
                            label="Thông tin đi lại"
                            name="di_lai"
                            type="text"
                            register={register}
                        />
                    </CCol>

                    <CCol xs="3">
                        <Controls.InputV2
                            label="Số hiệu phương tiện"
                            name="so_hieu"
                            type="text"
                            register={register}
                        />
                    </CCol>

                    <CCol xs="3">
                        <Controls.InputV2
                            label="Số ghế (nếu có)"
                            name="so_ghe"
                            type="text"
                            register={register}
                    />
                    </CCol>
                </CRow>

                <CRow>
                    <CCol xs="3">
                        <Controls.InputV2
                            label="Thời gian đi"
                            name="thoi_gian_di"
                            type="date"
                            register={register}
                            error={errors.thoi_gian_lay_mau}
                        />
                    </CCol>

                    <CCol xs="3">
                        <Controls.InputV2
                            label="Thời gian đến"
                            name="thoi_gian_den"
                            type="date"
                            register={register}
                            error={errors.thoi_gian_lay_mau}
                        />
                    </CCol>
                </CRow>

                <CRow>
                    <CCol xs="12">

                    <h4>Điểm đi</h4>
                    </CCol>
                    <CCol xs="3">
                    <Controls.SelectV2
                            label="Tỉnh/thành phố"
                            name="ma_tinh_di"
                            // value={tinh_di}
                            onChange={handleTinhChange}
                            options={dmHuyen}
                            error={errors.ma_huyen}
                            register={register}
                        />
                    </CCol>
                    <CCol xs="3">
                        <Controls.SelectV2
                            label="Huyện, thị xã"
                            name="ma_huyen_di"
                            // value={huyen_di}
                            onChange={handleHuyenChange}
                            options={dmHuyen}
                            error={errors.ma_huyen}
                            register={register}
                        />
                    </CCol>
                    <CCol xs="3">
                        <Controls.SelectV2
                            label="Xã, phường, trị trấn"
                            name="ma_xa"
                            options={dmXa}
                            error={errors.ma_xa}
                            register={register}
                        />
                    </CCol>
                    <CCol xs="3">
                        <Controls.InputV2
                            label="Số nhà, thôn/ấp/tổ"
                            name="so_nha_di"
                            type="text"
                            register={register}
                            error={errors.so_nha_di}
                        />
                    </CCol>

                </CRow>

            <CRow>
            <CCol xs="12">
                    <h4>Điểm đến</h4>
                </CCol>

                <CCol xs="3">
                <Controls.SelectV2
                        label="Tỉnh/thành phố"
                        name="ma_tinh_den"
                        // value={tinh_di}
                        onChange={handleTinhChange}
                        options={dmHuyen}
                        error={errors.ma_huyen}
                        register={register}
                    />
                </CCol>
                <CCol xs="3">
                    <Controls.SelectV2
                        label="Huyện, thị xã"
                        name="ma_huyen_den"
                        // value={huyen_di}
                        onChange={handleHuyenChange}
                        options={dmHuyen}
                        error={errors.ma_huyen}
                        register={register}
                    />
                </CCol>
                <CCol xs="3">
                    <Controls.SelectV2
                        label="Xã, phường, trị trấn"
                        name="ma_xa_den"
                        options={dmXa}
                        error={errors.ma_xa}
                        register={register}
                    />
                </CCol>
                <CCol xs="3">
                    <Controls.InputV2
                        label="Số nhà, thôn/ấp/tổ"
                        name="so_nha_di"
                        type="text"
                        register={register}
                        error={errors.so_nha_di}
                    />
                </CCol>
            </CRow>

                <CCol xs="6">
                    <Controls.InputV2
                        label="Thời gian lấy mẫu"
                        name="thoi_gian_lay_mau"
                        type="date"
                        register={register}
                        error={errors.thoi_gian_lay_mau}
                    />
                </CCol>
                <CCol xs="6">
                    <Controls.InputV2
                        label="Nơi lấy mẫu (tại chốt số)"
                        name="noi_lay_mau"
                        type="text"
                        register={register}
                        error={errors.noi_lay_mau}
                    />
                </CCol>
            </CFormGroup>
            <CFormGroup>
                <CCol xs="12">
                    <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                            custom
                            id="inline-radio2"
                            name="huong_xu_ly"
                            value="2"
                        />
                        <CLabel variant="custom-checkbox" htmlFor="inline-radio2">
                            Tự theo dõi sức khỏe
                  </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                            custom
                            id="inline-radio3"
                            name="huong_xu_ly"
                            value="3"
                        />
                        <CLabel variant="custom-checkbox" htmlFor="inline-radio4">
                            Tự cách ly tại nhà 21 ngày
                  </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                            custom
                            id="inline-radio4"
                            name="huong_xu_ly"
                            value="4"
                        />
                        <CLabel variant="custom-checkbox" htmlFor="inline-radio3">
                            Cách ly tập trung
                  </CLabel>
                    </CFormGroup>
                </CCol>
            </CFormGroup>
            <div className="form-actions float-right">
                <CButton type="submit" color="success" className="mr-2">
                    Lưu
              </CButton>
                <CButton color="secondary" onClick={propOnClose}>
                    Thoát
              </CButton>
            </div>
        </CContainer>
    );
}
