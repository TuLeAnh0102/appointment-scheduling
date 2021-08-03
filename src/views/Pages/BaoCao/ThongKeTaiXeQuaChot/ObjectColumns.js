import { matchSorter } from "match-sorter";

const styleValue = (value) => {
    return (
        <div style={{ textAlign: "center"  }}>
        {value}
    </div>)
}

const getTenChot = (status) => {
    switch (status) {
        case "1":
            return "Phú Sơn - Bù Đăng";
        case "2":
            return "Tân Lập - Đồng Phú";
        case "3":
            return "Thành Tâm - Chơn Thành";
        case "4":
            return "Minh Long - Chơn Thành";
        case "5":
            return "Minh Tâm - Hớn Quản";
        case "6":
            return "Nội bộ - Chơn Thành";
        case "7":
            return "Tân Hiệp - Hớn Quản";
        case "8":
            return "Sao Bọng - Bù Đăng";
        default:
            return status;
    }
};

const getHuongXL = (status) => {
    switch (status) {
        case "1":
            return "Theo dõi sức khỏe tại nhà";
        case "2":
            return "Cách ly tại nhà 21 ngày";
        case "3":
            return "Cách ly tại nhà 7 ngày";
        case "4":
            return "Cách ly tại nhà 14 ngày";
        case "5":
            return "Cách ly tập trung";
        case "6":
            return "Test nhanh";

        default:
            return status;
    }
};

export const columns = [
    {
        Header: "Chủ xe hoặc lái xe",
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
        Header: "Biển số xe (nếu có)",
        id: "bien-so",
        accessor: (c) => c.so_hieu_phuong_tien,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["bien-so"] }),
        filterAll: true,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Tên chốt",
        id: "ten-chot",
        accessor: (c) => c.noi_lay_mau,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["ten_chot"] }),
        filterAll: true,
        Cell: ({ value }) => (
            <span
                style={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                }}
            >
                {getTenChot(value)}
            </span>
        ),
    },
    // {
    //     Header: "Ngày",
    //     id: "ngay",
    //     accessor: (c) => c.ngay_qua_chot,
    //     filterMethod: (filter, rows) =>
    //         matchSorter(rows, filter.value, { keys: ["ngay"] }),
    //     filterAll: true,
    //     Cell: ({ value }) => styleValue(value)
    // },
    // {
    //     Header: "Giờ",
    //     id: "gio",
    //     accessor: (c) => c.gio_qua_chot,
    //     filterMethod: (filter, rows) =>
    //         matchSorter(rows, filter.value, {
    //             keys: ["ten-chi-dinh-xet-nghiem"],
    //         }),
    //     width:190,
    //     filterAll: true,
    //     Cell: ({ value }) => styleValue(value)
    // },
    {
        Header: "Số lần qua chốt",
        id: "so-lan-qua-chot",
        accessor: (c) => c.so_lan_qua_chot,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, {
                keys: ["so-lan-qua-chot"],
            }),
        filterAll: true,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Thời gian",
        id: "thoi-gian",
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, {
                keys: ["thoi-gian"],
            }),
        filterAll: true,
        accessor: (c) => (c.ngay_kiemtra_dichte),
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Hướng xử lý",
        id: "huong-xu-ly",
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, {
                keys: ["huong-xu-ly"],
            }),
        filterAll: true,
        accessor: (c) => (c.xuly),
        Cell: ({ value }) => (
            <span
                style={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                }}
            >
                {getHuongXL(value)}
            </span>
        ),
    },
    // {
    //     Header: "Chỉ định xét nghiệm",
    //     id: "chi-dinh-xet-nghiem",
    //     filterMethod: (filter, rows) =>
    //         matchSorter(rows, filter.value, {
    //             keys: ["chi-dinh-xet-nghiem"],
    //         }),
    //     filterAll: true,
    //     accessor: (c) => (c.chi_dinh_xet_nghiem),
    //     Cell: ({ value }) => styleValue(value)
    // },
]

