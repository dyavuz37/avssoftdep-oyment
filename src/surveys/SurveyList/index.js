import  React  from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

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

import "./App.css";
import "./datatables.min.css";
import { useState } from 'react';
import ReactDOM from "react-dom/client";
import axios from "axios";
import $ from "jquery";
import jszip from "jszip";
import pdfmake from "pdfmake";
import datatables from "datatables.net-dt";
import autofill_dt from "datatables.net-autofill-dt";
import buttons_dt from "datatables.net-buttons-dt";
import buttons_colVis from "datatables.net-buttons/js/buttons.colVis.js";
import buttons_html5 from "datatables.net-buttons/js/buttons.html5.js";
import buttons_print from "datatables.net-buttons/js/buttons.print.js";
import colreorder from "datatables.net-colreorder-dt";
import datetime from "datatables.net-datetime";
import fixedcolumns from "datatables.net-fixedcolumns-dt";
import fixedheader from "datatables.net-fixedheader-dt";
import keytable from "datatables.net-keytable-dt";
import responsive_dt from "datatables.net-responsive-dt";
import rowgroup from "datatables.net-rowgroup-dt";
import rowreorder from "datatables.net-rowreorder-dt";
import scroller_dt from "datatables.net-scroller-dt";
import searchbuilder_dt from "datatables.net-searchbuilder-dt";
import searchpanes_dt from "datatables.net-searchpanes-dt";
import select_dt from "datatables.net-select-dt";
import staterestore_dt from "datatables.net-staterestore-dt";

var dataSet = [];

/* #region  BINDING COLUMN FIELD LIST */
var ColumnsList = [];
/* #endregion */

/* #region  COLUMN OPTIONS */
class Mdl_ColumnsProperties {
  constructor(target, visible, searchable,className,targets) {
    this.target = target;
    this.visible = visible;
    this.searchable = searchable;
	this.className = className;
	this.targets = targets;
  }
}

var ColumnsProperties = [];
var ColumnOption1 = new Mdl_ColumnsProperties();
//ColumnOption1.target = 2;
//ColumnOption1.visible = false;
//ColumnOption1.searchable = false;
ColumnOption1.targets = -1;
ColumnOption1.className = "dt-body-left";


var ColumnOption2 = new Mdl_ColumnsProperties();
ColumnOption1.target = 4;
ColumnOption1.visible = false;
ColumnOption1.searchable = false;


ColumnsProperties.push(ColumnOption1);
ColumnsProperties.push(ColumnOption2);
/* #endregion */


class Mdl_Language {
	constructor(lengthMenu, zeroRecords, info,infoEmpty,infoFiltered,decimal,thousands) {
	  this.lengthMenu = lengthMenu;
	  this.zeroRecords = zeroRecords;
	  this.info = info;
	  this.infoEmpty = infoEmpty;
	  this.infoFiltered = infoFiltered;
	  this.decimal = decimal;
	  this.thousands = thousands;
	}
  }

  var LanguageOption = new Mdl_Language();
  LanguageOption.lengthMenu = 'Display _MENU_ records per page';
  LanguageOption.zeroRecords = 'Nothing found - sorry';
  LanguageOption.info = 'Showing page _PAGE_ of _PAGES_';
  LanguageOption.infoEmpty = 'No records available';
  LanguageOption.infoFiltered = '(filtered from _MAX_ total records)';
  LanguageOption.decimal = ',';
  LanguageOption.thousands = '.';

var counter = 0;

class Mdl_DataModel {
	constructor(lengthMenu, zeroRecords, info,infoEmpty,infoFiltered,decimal,thousands) {
	  this.lengthMenu = lengthMenu;
	  this.zeroRecords = zeroRecords;
	  this.info = info;
	  this.infoEmpty = infoEmpty;
	  this.infoFiltered = infoFiltered;
	  this.decimal = decimal;
	  this.thousands = thousands;
	}
  }

function SurveyList() {

	$(document).on("click",".smtbtn",function(){			

			window.open("http://localhost:3000/surveys/Survey?PageID="+$($(this).parent().parent().children()[2]).text()+"",'_blank');
	});


	const format = (d) => {
   
		
		console.log(d[4]);

		return (
			'<p>'+d[4]+'</p>'
		);
	}


	    const CreateDataTable = (data) => {
		
		dataSet.length =0;
				
		for(var i=0; i<data.length; i++)
		{
			dataSet.push(
				[
				null,
				null,
				data[i].id,
				data[i].name,
				data[i].surveyContent,
				data[i].createdBy,
				data[i].moduleId,
				data[i].required,
				data[i].active,
				data[i].createDate]		
			);
		}

		ColumnsList.length =0;

		ColumnsList = [
			{
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: '',
            },
			{
                className: 'button',
                orderable: false,
                data: null,
                defaultContent: '<button class="smtbtn">Edit Survey</button>',
            },
			{ title: "ID"},
			{ title: "NAME" },
			{ title: "surveyContent" },
			{ title: "CREATED BY" },
			{ title: "MODULE ID" },
			{ title: "REQUIRED" },
			{ title: "ACTIVE" },
			{ title: "CREATE DATE" },
		  ];

		$("#tablecontent").html('<table id="example_'+counter.toString()+'" class="display cell-border compact stripe hover row-border order-column smtdt" width="100%"></table>');

		var table =  $("#example_"+counter.toString()).DataTable({
			data: dataSet,
			columns: ColumnsList,
			paging: true,
			ordering: true,
			info: true,
			order: [[0, "asc"]], //Default Sıralama Kolon Tersmi Düz mü asc yada desc
			columnDefs: ColumnsProperties,
			stateSave: true,
			pagingType: 'full_numbers',
			language: LanguageOption,
		});

		$('.smtdt tbody').on('click', 'tr', function () {

			var tr = $(this).closest('tr');
			var row = table.row(tr);
			console.log(row.data()[2]);

			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				
			} else {
				table.$('tr.selected').removeClass('selected');
				$(this).addClass('selected');
			}
		});
	
		// $('#button').click(function () {
		// 	table.row('.selected').remove().draw(false);
		// });

		$('.smtdt tbody').on('click', 'td.dt-control', function () {
			var tr = $(this).closest('tr');
			var row = table.row(tr);
						
			if (row.child.isShown()) {
				// This row is already open - close it
				row.child.hide();
				tr.removeClass('shown');
			} else {
				// Open this row
				row.child(format(row.data())).show();
				tr.addClass('shown');
			}
		});


		counter++;
	  };

	const Load = () => {


    if ($("#tablecontent").length > 0) {


		const params = { title: 'Axios POST Request Example' };
		const headers = { 
			'Authorization': 'Bearer my-token',
			'My-Custom-Header': 'foobar'
		};

		axios.get('https://localhost:5001/api/GetSurveyList', params, { headers })
		.then(response => CreateDataTable(response.data)     
		);
		
    } 
	else {
      setTimeout(function () {
        Load();
      }, 100);
	}
  };

  return (
    <div>
      <h2>ANKET LİSTE</h2>
      <br />
      <div id="tablecontent" onLoad={Load()}></div>
    </div>
  );
}

function App() {
    
    const { t, i18n } = useTranslation(); 
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <ArgonBox pt={6} pb={3}>
          <ArgonBox mb={3}>
            <Card>
              <ArgonBox p={3} lineHeight={1}>
                <ArgonTypography variant="h5" fontWeight="medium">
                  {t("Survey1")}
                </ArgonTypography>
                <ArgonTypography variant="button" fontWeight="regular" color="text">
                  
                </ArgonTypography>
              </ArgonBox>
              <SurveyList />
            </Card>
          </ArgonBox>
        </ArgonBox>
        <Footer />
      </DashboardLayout>
      
    );
    
}

export default App;
