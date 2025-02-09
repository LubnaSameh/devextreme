import React from "react";
import {
  Chart,
  Series,
  Legend,
  Tooltip,
  ArgumentAxis,
  ValueAxis,
  ZoomAndPan,
  ScrollBar,
  Animation,
  Label,
} from "devextreme-react/chart";

const CustomChart = ({ data, chartType = "bar", title }) => {
  return (
    <div className="card p-3 shadow-sm">
      <h4 className="mb-3">{title}</h4>
      <Chart dataSource={data} className="chart-responsive">
        <ArgumentAxis />
        <ValueAxis />
        <Series
          type={chartType}
          valueField="revenue"
          argumentField="month"
          name="Revenue"
          color="#28a745"
        />
        <Series
          type={chartType}
          valueField="expenses"
          argumentField="month"
          name="Expenses"
          color="#dc3545"
        />
        <Series
          type={chartType}
          valueField="profit"
          argumentField="month"
          name="Profit"
          color="#007bff"
        />
        <Legend verticalAlignment="bottom" horizontalAlignment="center" />
        <Tooltip enabled={true} />
        <ZoomAndPan argumentAxis="both" />
        <ScrollBar visible={true} />
        <Animation enabled={true} />
        <Label visible={true} />
      </Chart>
    </div>
  );
};

export default React.memo(CustomChart);
