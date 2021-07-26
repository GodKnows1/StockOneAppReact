import React, { Component } from 'react'

import ReactFC from 'react-fusioncharts';
import { Row, Col, Button, Container, Form } from 'react-bootstrap'
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

        let endpoint = `https://stockoneapp-boot.herokuapp.com/getSectorPriceByPeriod`;

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
            <Container style={{ borderRadius: '8px', padding: '16px', border: '4px solid lightgrey' }}>
                        <h4>Comparing Sector over different Time Period</h4>
                        <Form>
                            <Row >
                                <Col >
                                <input type="text" className="form-control" placeholder="Sector 1" ref='searchInput' />
                                </Col>
                                <Col>
                                <input type="date" className="form-control" placeholder="From Date" ref='date1' />
                                </Col>
                                <Col>
                                <input type="date" className="form-control" placeholder="To Date" ref='date2' />
                                </Col>
                                <Col xs="1">
                                <Button  type="button" onClick={this.dosearch} > Search</Button>
                                </Col>
                            </Row>

                        </Form>
                        <br></br>
                        <center>
                            <ReactFC {...chartConfigs} />
                        </center>
                    </Container>
                    <br></br>
            </div>
        )
    }
}

export default CompareSectorTime
