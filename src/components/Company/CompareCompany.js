import React, { Component } from 'react';

import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import CompanyTime from './CompanyTime'
import { Form,Row,Col,Button } from 'react-bootstrap';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

let chartConfigs = {
    type: 'msline',// The chart type
    width: '700', // Width of the chart
    height: '400', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
        chart: {
            caption: "Share Price of companies",
            yaxisname: "Share Price",
            numberprefix: "Rs ",
            plottooltext: "<b>$dataValue</b> Share Price of $seriesname",
            theme: "fusion"
        },
        categories: [
            {
                category: [
                    {
                        label: ""
                    }
                ]
            }
        ],
        dataset: [
            {
                seriesname: "",
                data: [
                    {
                        value: ""
                    }
                ]
            }
        ]
    }
};

let ind = 0;

class CompareCompany extends Component {

    constructor(props) {

        super(props);
        this.state = chartConfigs;
        this.dosearch = this.dosearch.bind(this);
        this.state.dataSource.data = []
    }

    dosearch() {
        var myInit1 = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Vary': 'Origin'
            },
        };
        let searchval = this.refs.searchInput.value;//get node value or text value

        let searchval2 = this.refs.searchInput1.value;

        let data = [];
        let dat1 = this.refs.date1.value;
        let dat2 = this.refs.date2.value;
        let endpoint = `http://127.0.0.1:8080/getStockPriceFromCompanyName?companyName=${searchval}`;

        if (dat1 && dat2) {
            endpoint = `http://127.0.0.1:8080/fetchToAndFrom`;
            myInit1 = {
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
        }

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
                // prevDs.data.splice(0, prevDs.dat a.length)
                // prevDs.chart.subCaption = response[0].companycode
                response.forEach((value, key) => {
                    prevDs.categories[0].category[key] = {
                        'label': "On " + response[key].datee.substring(0, 11) + " at " + response[key].timee,
                    };
                })

                let arr = [];

                response.forEach((value, key) => {
                    arr.push({ "value": response[key].shareprice })
                })
                prevDs.dataset[ind] = {
                    'seriesname': response[0].company.companyName,
                    'data': arr
                };


                this.setState({
                    dataSource: prevDs,
                });

                console.log('this.' + data);
                console.log('chart' + JSON.stringify(chartConfigs));
                ind++;
            })//endo of .then line 53				
    }

    render() {
        return (
            <div className="App">
                <div>
                    <h3>Comparision Charts</h3>
                    <Form style={{ width: '50%' }}>
                        <Row >
                            <Col >
                            <input type="text" className="form-control" placeholder="Company Name" ref='searchInput' />
                            </Col>
                            <Col>
                            <input type="text" className="form-control" placeholder="Exchange" ref='searchInput1' />
                            </Col>
                            <Col xs="1">
                            <Button  type="button" onClick={this.dosearch} > TBD</Button>
                            </Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col>
                            <input type="date" className="form-control" placeholder="From Date" ref='date1' />
                            </Col>
                            <Col>
                            <input type="date" className="form-control" placeholder="To Date" ref='date2' />
                            </Col>
                            <Col xs="1">
                            <Button type="button" onClick={this.dosearch} > Search</Button>
                            </Col>
                        </Row>
                    </Form>
                    <div >
                        
                        <Form >
                            
                            <span> </span>
                            <span> </span>
                            
                            <br></br>
                            
                            <span> </span>
                            
                            
                        </Form>
                    </div>

                    <ReactFC {...chartConfigs} />
                </div>
                <div>
                    {/* <label>Compare With </label>
                    <input type="text" placeholder="Company Name" ref="addCom" />
                    <button type="button" onClick={() => {
                        let searchval = this.refs.addCom.value;//get node value or text value
                
                        let searchval2 = this.refs.searchInput1.value;
                
                        let data = [];
                        let dat1 = this.refs.date1.value;
                        let dat2 = this.refs.date2.value;
                
                           let endpoint = `http://127.0.0.1:8080/fetchToAndFrom`;
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
                                // prevDs.data.splice(0, prevDs.dat a.length)
                                // prevDs.chart.subCaption = response[0].companycode
                                response.forEach((value, key) => {
                                    prevDs.categories[0].category[key] = {
                                        'label': response[key].timee,
                                    };
                                })
                                
                                let arr = [];
                
                                response.forEach((value, key) => {
                                    arr.push({ "value": response[key].shareprice })
                                })
                                prevDs.dataset[ind] = {
                                    'seriesname': response[0].exchangecode,
                                    'data': arr
                                };
                
                
                                this.setState({
                                    dataSource: prevDs,
                                });
                
                                console.log('this.' + data);
                                console.log('chart' + JSON.stringify(chartConfigs));
                                ind++;
                            })//nd
                    }}>Go</button> */}
                </div>
                <div>
                    {/* <h3>Comparing a Company Over Different Time Period </h3> */}
                    {/* <CompanyTime /> */}
                </div>
            </div>
        )
    }
}

export default CompareCompany;