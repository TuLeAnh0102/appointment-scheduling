import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
// import { columns } from "src/views/Pages/BaoCao/ThongKeSoLuongPT/ObjectColumns";


// const FORMAT_DATETIME = 'yyyy-MM-DD HH:mm:ss';

class TableCommon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props['data'],
            columns: props['columns']
        }
        console.log('akadjkasdjkasdhjkh',props);
    }

    componentDidUpdate(previousProps, previousState){
        console.log('zzzzzz', previousProps, previousState);
        // if(previousProps.data != previousState.data){
        //     this.setState({data: previousProps.data})
        // }else{
        //     this.setState({ data: previousState.data })
        // }
    }

    render() {
        console.log('xlololololoxx', this.props);
        return (
            <ReactTable
                data={this.state.rows}
                previousText="Previous"
                nextText="Next"
                loadingText="Loading..."
                noDataText="Không có dữ liệu"
                pageText="Trang"
                ofText="của"
                rowsText="dòng"
                filterable
                viewIndex
                defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                columns={this.state.columns}
                defaultPageSize={20}
                className="-striped -highlight"
            />
        );
    }
}
export default TableCommon;