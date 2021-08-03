import React, {useEffect, useState} from 'react'
import Select from 'react-select';
import {CCol,CLabel} from "@coreui/react";
import Controls from '../Controls/Controls';
import { commonService } from "../../services";
import {Controller } from "react-hook-form";
import { Loading } from "src/components/Loading/loading";
const styleRequire =  {
  color: "#FF0000",
  marginLeft: "2px",
}
export default function Diachi({errors =null, register, dataTinh,handelOnChange, summary, control, diachiKhoitao, labelRequired}) {
  const [dmTinh, setdmTinh] = useState(dataTinh);
  const [dmHuyen, setdmHuyen] = useState([]);
  const [dmXa, setdmXa] = useState([]);
  const [tinhhientai, settinhhientai] = useState(0);
  const [huyenhientai, sethuyenhientai] = useState(0);
  const [sonhahientai, setsonhahientai] = useState('');
  const [xahientai, setxahientai] = useState(0);
  const [isLoadding, setisLoadding] = useState(false);
  const [xaLoadding, setxaLoadding] = useState(false);

  useEffect(() => {
    if(dataTinh.length>0)
    {
      setdmTinh(dataTinh);
    }
  }, [dataTinh]);
  
  useEffect(() => {
    setsonhahientai(diachiKhoitao.so_nha);
    if(diachiKhoitao.ma_tinh && dataTinh.length >0)
    {
      settinhhientai(dataTinh.find(item => item.id ===diachiKhoitao.ma_tinh));
      //if (diachiKhoitao.ma_huyen != '')
      {
        setisLoadding(true);
        commonService.getDanhMucHuyen(diachiKhoitao.ma_tinh).then((res) => {
          if (res.success && res.data != null) {
            setisLoadding(false);
            setdmHuyen(res.data);
            sethuyenhientai(res.data.find(item => item.id ===diachiKhoitao.ma_huyen));
            if(diachiKhoitao.ma_xa)
            {
              setxaLoadding(true);
              commonService.getDanhMucXa(diachiKhoitao.ma_huyen).then((res) => {
                if (res.success && res.data != null) {
                    setdmXa(res.data);
                    setxahientai(res.data.find(item => item.id ===diachiKhoitao.ma_xa));
                    setxaLoadding(false);
                  }});
            }
          }
        });
      }
    }
    
  }, [dataTinh,diachiKhoitao]);

  const handleOnSelectChange=(e, item) =>{
        if(item.name===summary.ten_tinh)
        {
          commonService.getDanhMucHuyen(e.id).then((res) => {
            if (res.success && res.data != null) {
                setdmHuyen(res.data);
              }});
            setdmXa([]);
            settinhhientai(e);
            sethuyenhientai('');
            setxahientai('');
        }
        if(item.name===summary.ten_huyen)
        {
          commonService.getDanhMucXa(e.id).then((res) => {
            if (res.success && res.data != null) {
                setdmXa(res.data);
              }});
          sethuyenhientai(e);
          setxahientai('');
        }
        if(item.name===summary.ten_xa)
        {
            setxahientai(e);
        }
        handelOnChange(item.name, e.id); 
    }
    const noOptionsMessage = () =>
    {
        return "Không có dữ liệu!"
    }
    const colourStyles = {
      placeholder: (defaultStyles) => {
          return {
              ...defaultStyles,
              color: '#000000',
              fontStyle: 'italic'
          }
      }
  }

    return (
      <>
          <CCol lg="6" xs="12">
              <CLabel htmlFor={summary.ten_tinh}>Tỉnh/Tp</CLabel>
              <CLabel style ={ styleRequire}> {labelRequired}</CLabel>
                  <Controller
                    name={summary.ten_tinh}
                    control = {control}
                    defaultValue={diachiKhoitao.ma_tinh}
                    render = {() => ( 
                      <Select
                      placeholder ="Chọn . . . ."
                      noOptionsMessage={noOptionsMessage}
                      name={summary.ten_tinh}
                      //defaultValue={tinhhientai}
                      value={tinhhientai}
                      options={dmTinh}
                      getOptionLabel ={(option)=>option.title}
                      getOptionValue ={(option)=>option.id}
                      onChange={handleOnSelectChange.bind()}
                      className={`${errors[summary.ten_tinh]? "is-invalid" : ""}`}
                      styles={colourStyles}
                      />
                    )}
                  />
              {!tinhhientai && (errors[summary.ten_tinh]) &&  <div className="invalid-feedback">{errors[summary.ten_tinh]?.message} </div>}
              </CCol>    
              <CCol lg="6" xs="12">
    
              <CLabel htmlFor={summary.ten_huyen}>Quận/Huyện/Thị Xã</CLabel>
              <CLabel style ={ styleRequire}> {labelRequired}</CLabel>
                  <Controller
                    name={summary.ten_huyen}
                    control = {control}
                    defaultValue={diachiKhoitao.ma_huyen}
                    render = {() => ( 
                      <Select
                      placeholder ="Chọn . . . ."
                      noOptionsMessage={noOptionsMessage}
                      name={summary.ten_huyen}
                      value={huyenhientai}
                      options={dmHuyen}
                      getOptionLabel ={(option)=>option.title}
                      getOptionValue ={(option)=>option.id}
                      onChange={handleOnSelectChange.bind()}
                      className={`${errors[summary.ten_huyen]? "is-invalid" : ""}`}
                      styles={colourStyles}
                      />
                    )}
                  />
              {!huyenhientai && (errors[summary.ten_huyen]) &&  <div className="invalid-feedback">{errors[summary.ten_huyen]?.message} </div>}
              </CCol>   
              <CCol lg="6" xs="12">
              <CLabel htmlFor={summary.ten_xa}>Xã/Phường/Thị trấn</CLabel>
              <CLabel style ={ styleRequire}> {labelRequired}</CLabel>
              {xaLoadding? <Loading/>: 
                  <Controller
                    name={summary.ten_xa}
                    control = {control}
                    defaultValue={diachiKhoitao.ma_xa}
                    render = {() => ( 
                      <Select
                      placeholder ="Chọn . . . ."
                      noOptionsMessage={noOptionsMessage}
                      name={summary.ten_xa}
                      value={xahientai}
                      options={dmXa}
                      getOptionLabel ={(option)=>option.title}
                      getOptionValue ={(option)=>option.id}
                      onChange={handleOnSelectChange.bind()}
                      className={`${errors[summary.ten_xa]? "is-invalid" : ""}`}
                      styles={colourStyles}
                      />
                    )}
                  />
                  }
              {!xahientai && (errors[summary.ten_xa]) &&  <div className="invalid-feedback">{errors[summary.ten_xa]?.message} </div>}
              </CCol>    
          
      </>
  )
}
