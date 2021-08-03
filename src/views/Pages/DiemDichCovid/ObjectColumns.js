import { matchSorter } from "match-sorter";
import {
    CButton
} from "@coreui/react";
import CIcon from '@coreui/icons-react';
import { useDispatch } from "react-redux";
// const dispatch = useDispatch();
const styleValueActions = (value) => {
    return (
        <div style={{ textAlign: "center" }}>
            <CButton
                color="danger"
            // onClick={() => handelDeleteRow(props.original)}
            >
                <CIcon size="lg" name="cil-delete" />
            </CButton>
            {"  "}
            <CButton
                color="warning"
                onClick={(e) => handleShowRowClick(value)}
            >
                <CIcon size="lg" name="cil-brush" />
            </CButton>
        </div>
    )
}


const styleValue = (value) => {
    return (
        <div style={{ textAlign: "center" }}>
            {value}
        </div>)
}

const handelDeleteRow = (id) => {
    if (window.confirm('Bạn có muốn xóa thông tin khai báo của: ' + id.ho_ten + '?')) {
        // danhSachToKhaiService.deleteTheoDoiCachLy(id.id)
        //     .then((res) => {
        //         if (res.success) {
        //             loadData();
        //             setLoading(false);
        //         } else {
        //             setLoading(false);
        //             alert("Không có dữ liệu");
        //         }
        //     });
    } else {
        return false;
    }
}

function handleShowRowClick(id) {

    // console.log(id);
    // dispatch({ type: commonConstants.SET_OPEN_POPUP, setOpenPopup: id });
    // history.push("/xac-nhan-thong-tin-to-khai/" + id);
}

export const columns = [
    {
        Header: "Điểm phong tỏa",
        id: "dia_diem_phong_toa",
        accessor: (c) => c.dia_diem_phong_toa,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["dia_diem_phong_toa"] }),
        filterAll: true,
        //width: 300,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Phưỡng xã",
        id: "phuong-xa",
        accessor: (c) => c.ten_xa,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["phuong-xa"] }),
        filterAll: true,
        // width: 200,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Quận huyện",
        id: "quan-huyen",
        accessor: (c) => c.ten_huyen,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["quan-huyen"] }),
        filterAll: true,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Tỉnh, TP",
        id: "tinh-tp",
        accessor: (c) => c.ten_tinh,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["tinh-tp"] }),
        filterAll: true,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Trạng thái",
        id: "trang-thai",
        accessor: (c) => c.ten_trang_thai,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["trang-thai"] }),
        filterAll: true,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Actions",
        filterable: false,
        id: "actions",
        accessor: (c) => c.id,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, {
                keys: ["actions"],
            }),
        filterAll: true,
        Cell: ({ value }) => styleValueActions(value)
    }
]

