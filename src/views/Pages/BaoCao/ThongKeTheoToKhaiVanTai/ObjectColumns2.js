import { matchSorter } from "match-sorter";

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
        <div style={{ textAlign: "center"  }}>
        {value}
    </div>)
}

const styleValue = (value) => {
    return (
        <div style={{ textAlign: "center" }}>
            {value}
        </div>)
}


export const columns = [
    {
        Header: "Nơi khai báo",
        id: "don-vi",
        accessor: (c) => c.noi_khai_bao_van_tai,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["don-vi"] }),
        filterAll: true,
        width: 200,
        Cell: ({ value }) => styleValue1(value)
    },
    {
        Header: "Ngày",
        id: "ngay",
        accessor: (c) => c.ngay,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["ngay"] }),
        filterAll: true,
        width: 200,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Xe oto",
        id: "xe-oto",
        accessor: (c) => c['xe_oto'],
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["xe-oto"] }),
        filterAll: true,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Xe tải",
        id: "xe-tai",
        accessor: (c) => c['xe_tai'],
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["xe-tai"] }),
        filterAll: true,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Xe khách",
        id: "xe-khach",
        accessor: (c) => c['xe_khach'],
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["xe-khach"] }),
        filterAll: true,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Xe máy",
        id: "xe-may",
        accessor: (c) => c['xe_may'],
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, {
                keys: ["xe-may"],
            }),
        filterAll: true,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Xe đạp",
        id: "xe-dap",
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, {
                keys: ["xe-dap"],
            }),
        filterAll: true,
        accessor: (c) => c.xe_dap,
        Cell: ({ value }) => styleValue(value)
    }
]

