import React, { Component } from 'react';

import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

let chartConfigs = {
    type: 'line',// The chart type
    width: '700', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
        // Chart Configuration
        "chart": {
            "caption": "Stock Price",
            "subCaption": {},
            "xAxisName": "Time",
            "yAxisName": "Share Price",
            "theme": "fusion",
        },
        // Chart Data
        "data": []
    },
    "ind":0,
    "val":[]
};

class CompanyTime extends Component {

    constructor(props) {

        super(props);
        this.state = chartConfigs;
        
        this.dosearch = this.dosearch.bind(this);
    }

    dosearch() {

        let searchval = this.refs.searchInput.value;//get node value or text value

        let searchval2 = this.refs.searchInput1.value;
        // let data = [];
        let dat1 = this.refs.date1.value;
        let dat2 = this.refs.date2.value;
        let endpoint = `https://stockoneapp-boot.herokuapp.com/fetchToAndFrom`;
        let myInit1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Vary': 'Origin'
            },
            body: JSON.stringify({
                "fromdate": dat1,
                "todate": dat2,
                "name": searchval
            })
        };

        //you need to give end slash ony if you call from rest endpint
        fetch(endpoint, myInit1)
            .then(response => {
                return response.json();
            })
            .then(response => {
                //real print of array
                response = response.filter(ele => ele.exchangename === searchval2)
                console.log(response);
                var prevDs = Object.assign({}, this.state.dataSource);
                
                prevDs.data.splice(0, prevDs.data.length)
                // prevDs.chart.subCaption = response[0].companycode
                response.forEach((value, key) => {
                    prevDs.data[key] = {
                        'label': response[key].timee,
                        'value': response[key].shareprice
                    };
                        this.setState({
                            dataSource: prevDs,
                        });
                   
                });
                
            })//endo of .then line 53				
    }

    render() {
        return (
            <div className="App">
                <div>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Company Name" ref='searchInput' />
                        <span> </span>
                        <input type="text" className="form-control" placeholder="Exchange" ref='searchInput1' /><br></br>
                        <br></br>
                        <input type="date" className="form-control" placeholder="From Date" ref='date1' value="2013-01-08"/>
                        <span> </span>
                        <input type="date" className="form-control" placeholder="To Date" ref='date2' value="2020-01-08"/><br></br>
                        <button className="btn btn-default" type="button" onClick={this.dosearch} > Search</button>
                    </div>

                    <ReactFC {...chartConfigs} />
                    {this.state.ind==0?'':this.state.val}
                </div>
            </div>
        )
    }
}

export default CompanyTime;