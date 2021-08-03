import { matchSorter } from "match-sorter";

const styleValue = (value) => {
    return (
        <div style={{ textAlign: "center"  }}>
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
        width: 70,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Địa chỉ",
        id: "dia-chi",
        accessor: (c) => c.dia_chi,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["dia-chi"] }),
        filterAll: true,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Nơi khởi hành",
        id: "noi-di",
        accessor: (c) => c.noi_di,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["noi-di"] }),
        filterAll: true,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Xã nơi đến",
        id: "xa-noi-den",
        accessor: (c) => c.xa_noi_den,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["xa-noi-den"] }),
        filterAll: true,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Huyện nơi đến",
        accessor: (c) => c.huyen_noi_den,
        id: "huyen-noi-den",
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["huyen-noi-den"] }),
        filterAll: true,
        filterable: false,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Tỉnh nơi đến",
        id: "tinh-noi-den",
        accessor: (c) => c.tinh_noi_den,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["tinh-noi-den"] }),
        filterAll: true,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Chỉ định xét nghiệm",
        id: "ten-chi-dinh-xet-nghiem",
        accessor: (c) => c.chi_dinh_xet_nghiem,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, {
                keys: ["ten-chi-dinh-xet-nghiem"],
            }),
        width:190,
        filterAll: true,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Hướng xử lý",
        id: "ten-huong-xu-ly",
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, {
                keys: ["ten-huong-xu-ly"],
            }),
        filterAll: true,
        width:190,
        accessor: (c) => c.huong_xu_ly,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Thời gian",
        id: "thoi-gian",
        width: 150,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, {
                keys: ["thoi-gian"],
            }),
        filterAll: true,
        accessor: (c) => (c.thoi_gian_chi_dinh_dich_te),
        Cell: ({ value }) => styleValue(value)
    },
]

