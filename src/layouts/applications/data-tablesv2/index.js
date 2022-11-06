import  React  from "react";
import { useEffect } from "react";

import ODataStore from "devextreme/data/odata/store";
// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 PRO MUI example components
import AvsDataGrid from "components/AvsDataGrid";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ArgonButton from "components/ArgonButton";

const dataSourceOptions = {
  store: new ODataStore({
    url: "https://js.devexpress.com/Demos/SalesViewer/odata/DaySaleDtoes",
    key: "Id",
    beforeSend(request) {
      request.params.startDate = "2020-05-10";
      request.params.endDate = "2020-05-15";
    },
  }),
};


const expandedRowKeys = [1];

class App extends React.Component {
      
  constructor(props) {
    super(props);
    this.applyFilterTypes = [
      {
        key: "auto",
        name: "Immediately",
      },
    ];
    this.orderHeaderFilter = this.orderHeaderFilter.bind(this);
    this.onShowFilterRowChanged = this.onShowFilterRowChanged.bind(this);
    this.onShowHeaderFilterChanged = this.onShowHeaderFilterChanged.bind(this);
    this.onCurrentFilterChanged = this.onCurrentFilterChanged.bind(this);

  }

  render() {

    return (
      
      <DashboardLayout>
        <DashboardNavbar />
        <ArgonBox pt={6} pb={3}>
          <ArgonBox mb={3}>
            <Card>
              <ArgonBox p={3} lineHeight={1}>
                <ArgonTypography variant="h5" fontWeight="medium">
                  Datatable Simple
                </ArgonTypography>
                <ArgonTypography variant="button" fontWeight="regular" color="text">
                  A lightweight, extendable, dependency-free javascript HTML table plugin.
                </ArgonTypography>
              </ArgonBox>
              <AvsDataGrid dataSourceOptions={dataSourceOptions} />
            </Card>
          </ArgonBox>
        </ArgonBox>

        <Footer />
      </DashboardLayout>
      
    );
    
  }

  calculateFilterExpression(value, selectedFilterOperations, target) {
    const column = this;
    if (target === "headerFilter" && value === "weekends") {
      return [[getOrderDay, "=", 0], "or", [getOrderDay, "=", 6]];
    }
    return column.defaultCalculateFilterExpression(value, selectedFilterOperations, target);
  }
  
  orderHeaderFilter(data) {
    data.dataSource.postProcess = (results) => {
      results.push({
        text: "Weekends",
        value: "weekends",
      });
      return results;
    };
  }

  onShowFilterRowChanged(e) {
    this.setState({
      showFilterRow: e.value,
    });
    this.clearFilter();
  }

  onShowHeaderFilterChanged(e) {
    this.setState({
      showHeaderFilter: e.value,
    });
    this.clearFilter();
  }

  onCurrentFilterChanged(e) {
    this.setState({
      currentFilter: e.value,
    });
  }
}

export default App;
