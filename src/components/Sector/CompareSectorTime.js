import React, { Component } from 'react'

import ReactFC from 'react-fusioncharts';

let chartConfigs = {
    type: 'column2d',// The chart type
    width: '700', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
        // Chart Configuration
        "chart": {
            "caption": "Period-wise comparision",
            "subCaption": {},
            "xAxisName": "Sectors",
            "yAxisName": "Sector Price",
            "theme": "fusion",
        },
        // Chart Data
        "data": []
    },
};

let ind=0;
let sector="";

export class CompareSectorTime extends Component {

    constructor(props) {

        super(props);
        this.state = chartConfigs;

        this.dosearch = this.dosearch.bind(this);
        this.state.dataSource.data = []
    }

    dosearch() {

        const searchval = this.refs.searchInput.value;//get node value or text value
        const dat1 = this.refs.date1.value;
        const dat2 = this.refs.date2.value;

        var myInit1 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Vary': 'Origin'
            },
            body: JSON.stringify({
                "fromdate": dat1,
                "todate": dat2,
                "sectorName": searchval
            })
        };

        let endpoint = `http://127.0.0.1:8080/getSectorPriceByPeriod`;

        //you need to give end slash ony if you call from rest endpint
        fetch(endpoint, myInit1)
            .then(response => {
                return response.text();
            })
            .then(response => {
                console.log(response);
                if(isNaN(response)){
                    alert('No Data Found')
                    return;
                }
                var prevDs = Object.assign({}, this.state.dataSource);
                // prevDs.chart.subCaption = response[0].companycode
                if(sector===""){
                    sector=searchval;
                } else if(sector!==searchval){
                    sector=searchval;
                    prevDs.data.splice(0,prevDs.data.length)
                    ind=0;
                }
                prevDs.data[ind++] = {
                    'label': searchval,
                    'value': response
                };
                this.setState({
                    dataSource: prevDs,
                });

            })//endo of .then line 53
    }

    render() {
        return (
            <div ><br></br>
                <h3>Comparing Sector over different Time Period</h3>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Sector 1" ref='searchInput' />
                    <span> </span>
                    <input type="date" className="form-control" placeholder="From Date" ref='date1' />
                    <span> </span>
                    <input type="date" className="form-control" placeholder="To Date" ref='date2' /><br></br>
                    <button className="btn btn-default" type="button" onClick={this.dosearch} > Search</button>
                </div>
                <ReactFC {...chartConfigs} />
            </div>
        )
    }
}

export default CompareSectorTime
