import { matchSorter } from "match-sorter";

const styleValue = (value) => {
    return (
        <div style={{ textAlign: "center"  }}>
        {value}
    </div>)
}

const styleValue1 = (value) => {
    switch (value) {
        case 1:
            value = "Phú Sơn - Bù Đăng"
            break;
        case 2:
            value = "Tân Lập - Đồng Phú"
            break;
        default:
            break;
    }
    return (
        <div style={{ textAlign: "center" }}>
            {value}
        </div>)
}

export const columns = [
    {
        Header: "Họ tên",
        id: "ho-ten",
        accessor: (c) => c.ho_ten,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["ho-ten"] }),
        filterAll: true,
        width: 200,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Số điện thoại",
        id: "so-dien-thoai",
        accessor: (c) => c.so_dien_thoai,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["so-dien-thoai"] }),
        filterAll: true,
        width: 200,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Loại phương tiện",
        id: "loai-phuong-tien",
        accessor: (c) => c.loai_phuong_tien,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["loai-phuong-tien"] }),
        filterAll: true,
        width: 200,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Biển số",
        id: "bien-so",
        accessor: (c) => c.bien_so,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["bien-so"] }),
        filterAll: true,
        width: 200,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Số người",
        id: "so-nguoi",
        accessor: (c) => c.so_nguoi,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["so-nguoi"] }),
        filterAll: true,
        width: 200,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Ngày",
        id: "ngay",
        accessor: (c) => c.ngay_tao,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["ngay"] }),
        filterAll: true,
        width: 200,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Nơi khai báo vận tải",
        id: "noi-khai-bao",
        accessor: (c) => c.noi_khai_bao_van_tai,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["noi-khai-bao"] }),
        filterAll: true,
        Cell: ({ value }) => styleValue1(value)
    },
    
    {
        Header: "Nơi đi",
        id: "noi-di",
        accessor: (c) => c.noi_di,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["noi-di"] }),
        filterAll: true,
        width: 200,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Nơi đến",
        id: "noi-den",
        accessor: (c) => c.noi_den,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["noi-den"] }),
        filterAll: true,
        width: 200,
        Cell: ({ value }) => styleValue(value)
    }
]

