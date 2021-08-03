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
        Header: "Tên công nhân",
        id: "ho-ten",
        accessor: (c) => c.ten_cong_nhan,
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
        Header: "Mã nhân viên",
        id: "so-the",
        accessor: (c) => c.so_the,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["so-the"] }),
        filterAll: true,
        width: 70,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Bộ phận",
        id: "bo-phan",
        accessor: (c) => c.ten_bo_phan,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["bo-phan"] }),
        filterAll: true,
        width: 70,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Địa chỉ thường trú",
        id: "dia-chi-thuong-trú",
        accessor: (c) => c.dia_chi_thuong_tru,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["dia-chi-thuong-trú"] }),
        filterAll: true,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Địa chỉ tạm trú",
        id: "dia-chi-tam-trú",
        accessor: (c) => c.dia_chi_tam_tru,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["dia-chi-tam-trú"] }),
        filterAll: true,
        Cell: ({ value }) => styleValue(value),
    },
    
    {
        Header: "Tên công ty",
        id: "ten-cong-ty",
        accessor: (c) => c.ten_cong_ty,
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, {
                keys: ["ten-cong-ty"],
            }),
        filterAll: true,
        Cell: ({ value }) => styleValue(value)
    },
    {
        Header: "Tên khu công nghiệp",
        id: "ten-khu-cn",
        filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, {
                keys: ["ten-khu-cn"],
            }),
        filterAll: true,
        accessor: (c) => (c.ten_khu_cong_nghiep),
        Cell: ({ value }) => styleValue(value)
    }
]

