import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";

import Button from "devextreme-react/button";
import { exportDataGrid } from "devextreme/excel_exporter";

import DataGrid, {
  Column,
  ColumnChooser,
  Export,
  FilterRow,
  GroupPanel,
  HeaderFilter,
  Item,
  Pager,
  Paging,
  Selection,
  StateStoring,
  Toolbar,
} from "devextreme-react/data-grid";
import PropTypes, { func } from "prop-types";
import { forwardRef, useCallback, useRef, useState } from "react";

const pageSizes = [10, 25, 50, 100];
const AvsDataGrid = forwardRef(({ dataSourceOptions, ...rest }, ref) => {
  const dataGrid = useRef(null);

  const expandedRowKeys = [1];
  const [collapsed, setCollepsed] = useState(false);

  const clearFilters = useCallback(() => {
    dataGrid.current.instance.clearFilter();
  }, []);
  
  function onExporting(e) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Main sheet");

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "DataGrid.xlsx");
      });
    });
    e.cancel = true;
  }
  function onContentReady(e) {
    if (!collapsed) {
      e.component.expandRow(["EnviroCare"]);
      setCollepsed(true);
    }
  }
  return (
    <DataGrid
      id="gridContainer"
      width="100%"
      ref={dataGrid}
      keyExpr="ID"
      showBorders={true}
      dataSource={dataSourceOptions}
      allowColumnResizing={true}
      columnResizingMode={"widget"}
      columnMinWidth={50}
      columnAutoWidth={true}
      defaultExpandedRowKeys={expandedRowKeys}
      allowColumnReordering={true}
      rowAlternationEnabled={true}
      onContentReady={onContentReady}
    >
      <Selection mode="multiple" selectAllMode={"allPages"} />
      <Export enabled={true} allowExportSelectedData={true} />
      <GroupPanel visible={true} />
      <HeaderFilter visible={true} />
      <StateStoring enabled={true} type="localStorage" storageKey="storage" />
      <ColumnChooser enabled={true} />
      <FilterRow visible={true} />

      <Column dataField="Product" />
      <Column
        dataField="Amount"
        caption="Sale Amount"
        dataType="number"
        format="currency"
        alignment="right"
      />

      <Column dataField="SaleDate" dataType="date" />
      <Column dataField="Region" dataType="string" />
      <Column dataField="Sector" dataType="string" />
      <Column dataField="Channel" dataType="string" />
      <Column dataField="Customer" dataType="string" width={150} />

      <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
      <Paging defaultPageSize={10} />
      <Toolbar>
        <Item location="after">
          <Button icon="trash" onClick={clearFilters} />
        </Item>
        <Item name="exportButton" />
        <Item name="columnChooserButton" />
        <Item name="groupPanel" />
      </Toolbar>
    </DataGrid>
  );
});

// Setting default values for the props of AvsDataGrid
AvsDataGrid.defaultProps = {};

// Typechecking props for the AvsDataGrid
AvsDataGrid.propTypes = {
  dataSourceOptions: PropTypes.object.isRequired,
};

export default AvsDataGrid;
