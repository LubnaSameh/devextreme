import React from "react";
import DataGrid, {
  Column,
  Paging,
  SearchPanel,
  Editing,
  Sorting,
  Export,
  Toolbar,
  Item,
  ColumnChooser,
  Summary,
  TotalItem,
} from "devextreme-react/data-grid";

const CustomDataGrid = ({ dataSource, summaryField, summaryType, format }) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <DataGrid
        dataSource={dataSource}
        keyExpr="id"
        showBorders={true}
        columnAutoWidth={true}
        allowColumnResizing={true}
        rowAlternationEnabled={true}
        columnHidingEnabled={true}
        adaptivityEnabled={true}
        scrolling={{ mode: "virtual" }}
      >
        <SearchPanel
          visible={true}
          highlightCaseSensitive={true}
          placeholder="Search..."
        />
        <Toolbar>
          <Item name="addRowButton" />
          <Item name="exportButton" />
          <Item name="columnChooserButton" />
          <Item name="searchPanel" />
        </Toolbar>
        <Export enabled={true} allowExportSelectedData={true} />
        <ColumnChooser enabled={true} />
        <Sorting mode="multiple" />
        <Paging defaultPageSize={5} />
        <Editing
          mode="popup"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
        />

        {/* ✅ توحيد المحاذاة في جميع الأعمدة */}
        <Column dataField="id" caption="ID" width={70} alignment="center" />
        <Column dataField="name" caption="Name" alignment="center" />
        <Column dataField="position" caption="Position" alignment="center" />
        <Column
          dataField="salary"
          caption="Salary"
          format="currency"
          alignment="center"
        />

        {summaryField && (
          <Summary>
            <TotalItem
              column={summaryField}
              summaryType={summaryType}
              valueFormat={format}
            />
          </Summary>
        )}
      </DataGrid>
    </div>
  );
};

export default React.memo(CustomDataGrid);
