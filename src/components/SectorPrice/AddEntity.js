/* xlsx.js (C) 2013-present  SheetJS -- http://sheetjs.com */
/* Notes:
   - usage: `ReactDOM.render( <SheetJSApp />, document.getElementById('app') );`
   - xlsx.full.min.js is loaded in the head of the HTML page
   - this script should be referenced with type="text/babel"
   - babel.js in-browser transpiler should be loaded before this script
*/
import React from "react";
import { Container, Form,Button } from "react-bootstrap";
import XLSX from "xlsx";
import { addDataApi } from "../EndPoints/Commons";

export default class SheetJSApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [] /* Array of Arrays e.g. [["a","b"],[1,2]] */,
      cols: [] /* Array of column objects e.g. { name: "C", K: 2 } */
    };
    this.handleFile = this.handleFile.bind(this);
    this.exportFile = this.exportFile.bind(this);
    this.uploadShares = this.uploadShares.bind(this);
  }

  uploadShares() {
    const lists = this.state.data;
    lists.shift();
    // var records=0;
    lists.forEach((list) => {
      const model = {
        "exchangename": list[1].trim(),
        "companycode": list[0].trim(),
        "datee": list[3].trim(),
        "timee": list[4].trim(),
        "shareprice": list[2]
      }
      addDataApi('https://stockoneapp-boot.herokuapp.com/addStockprice', model).then((data) => {
        // records++;
      });
    });

  }

  handleFile(file /*:File*/) {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: (rABS ? "binary" : "array"), cellDates: true, cellText: false });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      console.log(rABS, wb);
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, dateNF: 'yyyy-mm-dd' });
      const res = JSON.stringify(data);
      console.log(data);
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws["!ref"]) });
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  }
  exportFile() {
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(this.state.data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, "sheetjs.xlsx");
  }
  render() {
    return (
      <div>
        <Container>
          <DragDropFile handleFile={this.handleFile}>

            <DataInput handleFile={this.handleFile} />

            {/* <div className="row">
          <div className="col-xs-12">
            <button
              disabled={!this.state.data.length}
              className="btn btn-success"
              onClick={this.exportFile}
            >
              Export
            </button>
          </div>
        </div> */}
            <OutTable data={this.state.data} cols={this.state.cols} />

          </DragDropFile>

          {/* 
          Sending To Server
        */}
          <Button onClick={this.uploadShares} >Upload Share Price</Button>
        </Container>
      </div>
    );
  }
}

/* -------------------------------------------------------------------------- */

/*
  Simple HTML5 file drag-and-drop wrapper
  usage: <DragDropFile handleFile={handleFile}>...</DragDropFile>
    handleFile(file:File):void;
*/
class DragDropFile extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }
  suppress(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }
  onDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    const files = evt.dataTransfer.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }
  render() {
    return (
      <div
        onDrop={this.onDrop}
        onDragEnter={this.suppress}
        onDragOver={this.suppress}
      >
        {this.props.children}
      </div>
    );
  }
}

/*
  Simple HTML5 file input wrapper
  usage: <DataInput handleFile={callback} />
    handleFile(file:File):void;
*/
class DataInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }
  render() {
    return (

      <Form >
        <div>
          <br></br>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Stock Prices</Form.Label>
            <Form.Control type="file" 
            id="file"
            accept={SheetJSFT}
            onChange={this.handleChange}
            />
          </Form.Group>
        {/* <h2>Upload Stock Prices</h2><br></br>
          <input
            type="file"
            id="file"
            accept={SheetJSFT}
            onChange={this.handleChange}
          /> */}
        </div>
      </Form>
    );
  }
}

/*
  Simple HTML Table
  usage: <OutTable data={data} cols={cols} />
    data:Array<Array<any> >;
    cols:Array<{name:string, key:number|string}>;
*/
class OutTable extends React.Component {
  render() {
    return (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              {this.props.cols.map(c => (
                <th key={c.key}>{c.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((r, i) => (
              <tr key={i}>
                {this.props.cols.map(c => (
                  <td key={c.key}>{r[c.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

/* list of supported file types */
const SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm"
]
  .map(function (x) {
    return "." + x;
  })
  .join(",");

/* generate an array of column objects */
const make_cols = refstr => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
  return o;
};
