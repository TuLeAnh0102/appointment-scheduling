import React, { useState, useEffect } from "react";
import {
    CCard,
    CRow,
    CButton,
    CCardBody,
    CForm,
    CCol,
    CFormGroup,
} from "@coreui/react";
import "react-table-v6/react-table.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Controls from "../../../components/Controls/Controls";
import { listTC } from "../../../datamock/commonData";
import { Col } from "react-bootstrap";
import moment from "moment";
import { Loading } from "src/components/Loading/loading";
import { history } from 'src/helpers/history';
import { useParams }  from 'react-router-dom';
import { TheoDoiSucKhoeService } from "src/services/TheoDoiSucKhoe.service";

function KhaiBaoSucKhoe() {
    const initTC = {
        tc_sot: 0,
        tc_ho: 0,
        tc_kho_tho: 0,
        tc_dau_hong: 0,
        tc_non: 0,
        tc_tieu_chay: 0,
        tc_xuat_huyet: 0,
        tc_noi_ban: 0,
    }
    const {id} = useParams();
    const [isLoadding, setisLoadding] = useState(0);
    const { register, handleSubmit, reset } = useForm({});
    const [datacheck, setDatacheck] = useState(initTC);
    

    const onSubmit = data => {
        
        let body = {...datacheck, zalo_user_id: id}
        console.log(body);
        setisLoadding(true)
        TheoDoiSucKhoeService.TheoDoiSucKhoe(body).then(res => {
            console.log(res);
            setisLoadding(false)
            alert("Khai báo sức khỏe thành công !!")
            if(res.success){
                alert(res.message);
                setDatacheck(initTC)
            }
        });
    }

    const resetTC = ()=> {
        setDatacheck(initTC);
    }

    useEffect(() => {
        resetTC();
    }, [isLoadding])

    const handleTC = e => {
        setDatacheck({
            ...datacheck,
            [e.target.name]: e.target.checked ? 1 : 0,
        });
    }

    return (
        <div>
            {isLoadding ? <Loading /> :
                <div>
                    
                    <CRow>
                        <CCol>
                            <CCard>
                                <CCardBody className="pt-0 pb-0">
                                    <CCol xs="12">
                                        <h3 style={{ textAlign: "center", margin: "1em" }}>
                                            TÌNH HÌNH SỨC KHỎE
                                        </h3>
                                    </CCol>
                                    <CForm onSubmit={handleSubmit(onSubmit)}>
                                        <CFormGroup row className="my-0">
                                            <CCol xs="12">
                                                <span>
                                                    Trong ngày có thấy các dấu hiệu nào sau đây không
                                                    ?
                                                </span>
                                            </CCol>
                                            <Col style={{ margin: "0.5em" }}>
                                                <Col>
                                                    <CRow>
                                                        {listTC.map((item) => {
                                                            return (
                                                                <CCol xs="6" key={item.value}>
                                                                    <input
                                                                        key={item.value}
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        name={item.title}
                                                                        onChange={handleTC}
                                                                        id={item.value}
                                                                        register={register}
                                                                    />
                                                                    <label
                                                                        className="form-check-label"
                                                                        htmlFor="inlineRadioSot1"
                                                                    >
                                                                        {item.name}
                                                                    </label>
                                                                </CCol>
                                                            );
                                                        })}
                                                    </CRow>
                                                </Col>
                                            </Col>
                                        </CFormGroup>
                                        <div className="form-actions float-right">
                                            <CButton
                                                type="submit"
                                                color="secondary"
                                                value="btnLuu"
                                                className="mr-2"
                                                style={{ margin: "1em" }}
                                            >
                                                Cập nhật
                                            </CButton>
                                        </div>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                    
                </div>
            }
        </div>
    );
}

export default KhaiBaoSucKhoe;