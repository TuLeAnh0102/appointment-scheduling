import { matchSorter } from "match-sorter";
const styleValue = (value, textAlign = "center") => {
  return <div style={{ textAlign: textAlign }}>{value}</div>;
};
export const columns = [
  {
    Header: "STT",
    id: "stt",
    // accessor: (c) => c.stt,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["stt"] }),
    filterAll: true,
    width: 50,
    Cell: (props) =>
    (
        <span
          style={{
            display: "block",
            width: "100%",
            textAlign: "center",
          }}
        >
        {props.row._index + 1}
        </span>
      ),
  },
  {
    Header: "Họ tên",
    id: "ho-ten",
    accessor: (c) => c.ho_ten,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["ho-ten"] }),
    filterAll: true,
    width: 200,
    Cell: ({ value }) => styleValue(value),
  },
  {
    Header: "Loại phương tiện",
    id: "loai-phuong-tien",
    accessor: (c) => c.loai_phuong_tien,
    width: 120,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["loai-phuong-tien"] }),
    filterAll: true,
    Cell: ({ value }) => styleValue(value),
  },
  {
    Header: "Biển số",
    id: "bien-so",
    accessor: (c) => c.so_hieu_phuong_tien,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["bien-so"] }),
    filterAll: true,
    width: 100,
    Cell: ({ value }) => styleValue(value),
  },
  {
    Header: "Nơi khởi hành",
    id: "noi-di",
    accessor: (c) => c.noi_di,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["noi_di"] }),
    filterAll: true,
    Cell: ({ value }) => styleValue(value, "left"),
  },
  {
    Header: "Nơi đến",
    id: "noi-den",
    accessor: (c) => c.noi_den,
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["noi_den"] }),
    filterAll: true,
    Cell: ({ value }) => styleValue(value, "left"),
  },
  {
    Header: "Thời gian",
    id: "thoi-gian",
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, {
        keys: ["thoi-gian"],
      }),
    filterAll: true,
    width: 150,
    accessor: (c) => c.thoi_gian_chi_dinh_dich_te,
    Cell: ({ value }) => styleValue(value),
  },
];

