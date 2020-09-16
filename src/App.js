import React from 'react';

import RowDetail from './RowDetail/RowDetail'
import SizeSelector from './SizeSelector/SizeSelector'

import DataGrid, {
    Column,
    Grouping,
    GroupPanel,
    Pager,
    Paging,
    Editing,
    SearchPanel
} from 'devextreme-react/data-grid';

import CustomStore from 'devextreme/data/custom_store';

const pageSizes = [10, 25, 50, 100];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentData: [],
            isSizeSelected: false,
            isLoading: true,
            isError: false,
            dataUrl: null,
            rowDetail: null,
            showRowDetail: false,
            collapsed: false
        };
        this.onDataLoad = this.onDataLoad.bind(this);
        this.onDataInsert = this.onDataInsert.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.onExtractRowData = this.onExtractRowData.bind(this);
        this.onSizeSelect = this.onSizeSelect.bind(this);
        this.onContentReady = this.onContentReady.bind(this);
    }

    render() {
        if (!this.state.isSizeSelected) {
            return (
                <div className="container">
                    <SizeSelector onSelect={this.onSizeSelect}/>
                </div>
            )
        }
        return (
            <div className="App">
                <DataGrid
                    onRowClick={this.onExtractRowData}
                    dataSource={new CustomStore({
                        key: 'id',
                        load: this.onDataLoad,
                        insert: this.onDataInsert,
                    })}
                    allowColumnReordering={true}
                    showBorders={true}
                    onContentReady={this.onContentReady}
                    onDataErrorOccurred={this.onDataError}
                >
                    <GroupPanel visible={true}/>
                    <SearchPanel visible={true} highlightCaseSensitive={true}/>
                    <Grouping autoExpandAll={false}/>

                    <Column dataField="id" dataType="string"/>
                    <Column dataField="firstName" dataType="string"/>
                    <Column dataField="lastName" dataType="string"/>
                    <Column dataField="email" dataType="string"/>
                    <Column dataField="phone" dataType="string"/>

                    <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true}/>
                    <Paging defaultPageSize={10}/>
                    <Editing
                        mode="row"
                        allowAdding={true}/>
                </DataGrid>
                <div className="RowData">
                    {this.state.rowDetail ? <RowDetail person={this.state.row}/> : null}
                </div>
            </div>
        );
    }

    onDataLoad() {
        return this.state.currentData;
    }

    onDataInsert(e) {
        let newData = [e].concat(this.state.currentData);
        this.setState({currentData: newData})
    }

    async fetchData(e) {
        let dataFetched = await fetch(e)
            .then(response => response.json())
            .then((data) => {
                return data;
            })
            .catch(() => {
                console.error("Error Data Loading");
                return [];
            });
        this.setState({
            currentData: dataFetched,
            isLoading: false
        })

    }

    onSizeSelect(e) {
        this.setState({isSizeSelected: true, dataUrl: e});
        this.fetchData(e);
    }

    onExtractRowData(e) {
        this.setState({rowDetail: e.data})
    }

    onContentReady(e){
        if (!this.state.isLoading) e.component.endCustomLoading();
        else e.component.beginCustomLoading();
    }

}

export default App;
