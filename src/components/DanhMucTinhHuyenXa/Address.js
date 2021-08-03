import React, { useEffect, useState, useRef } from "react";
import { CCol } from "@coreui/react";

class DanhMucDiaChi extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: ''
        }
    }

    componentDidMount() {
        
    }

    render() { 
        return ( 
            <CCol lg="6" xs="12">
                <lable>
                    Tỉnh
                </lable>
                <Select
                    aria-label="xxx"
                    onChange={onChange}
                    options={options}
                    value={test}
                />
            </CCol>
        );
    }
}
 
export default DanhMucDiaChi;