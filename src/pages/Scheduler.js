import React from "react";
import Scheduler from "devextreme-react/scheduler";
import DataSource from "devextreme/data/data_source";
import "devextreme/dist/css/dx.light.css";

const currentDate = new Date();
const views = ["day", "week", "month", "agenda"];
// Empty data source with CRUD capabilities maintained
const localDataSource = new DataSource({
  store: {
    type: "array",
    key: "id",
    data: [],
  },
});
const DevExtremeScheduler = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">
        DevExtreme Scheduler - Automatic CRUD
      </h2>
      <Scheduler
        dataSource={localDataSource}
        views={views}
        defaultCurrentView="week"
        defaultCurrentDate={currentDate}
        adaptivityEnabled={true} 
        crossScrollingEnabled={true}
        height={600}
        width={"100%"} 
        startDayHour={8}
        endDayHour={18}
        editing={{
          allowAdding: true,
          allowUpdating: true,
          allowDeleting: true,
        }}
      />
    </div>
  );
};

export default DevExtremeScheduler;
