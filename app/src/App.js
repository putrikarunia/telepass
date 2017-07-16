import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from 'web3';
import sha256 from 'sha256';

import { BrowserRouter } from 'react-router-dom';
import { browserHistory, Router, Route, Link, withRouter } from 'react-router';


var CLIENT = new web3(new web3.providers.HttpProvider('http://localhost:8545'));
var ABI = [{"constant":false,"inputs":[{"name":"user","type":"address"}],"name":"registerUser","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"ID","type":"uint256"}],"name":"requestData","outputs":[{"name":"data","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"inst","type":"address"},{"name":"name","type":"bytes32"}],"name":"registerInstitution","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"requester","type":"address"}],"name":"getCode","outputs":[{"name":"uniqueCode","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"granter","type":"address"},{"name":"ID","type":"uint256"}],"name":"grantAccess","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"},{"name":"data","type":"bytes32"}],"name":"issueData","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"requester","type":"address"}],"name":"requestCode","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"getUserData","outputs":[{"name":"data","type":"bytes32"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"code","type":"uint256"}],"name":"generateCode","type":"event"}];
var ADDRESS = '0x4b884b18301fdf474acff9ed37f357b3a0fbf763';

var DocumentContract = CLIENT.eth.contract(ABI).at(ADDRESS);

var accounts = CLIENT.eth.accounts;
var user = accounts[0];
var inst = accounts[1];


class Issue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      user: '',
      files: [],
      code: 0,
      inputCode: 0,
      requestCode: 0,
      data: '',
      page: '',
      firstName:'',
      lastName:'',
      email:'',
      id:'',
      age: '',
      validity: '',
      pob: '',
      dob: '',
      query: '',
    }


    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleRequestCode = this.handleRequestCode.bind(this);
    this.grantAccess = this.grantAccess.bind(this);
    this.requestCode = this.requestCode.bind(this);
    this.requestData = this.requestData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentWillMount() {
    this.setState({
      user: user,
      inst: inst,
    });
    var _user = this.state.user;
    var _inst = this.state.inst;
    DocumentContract.registerUser(user, {from: user});
    DocumentContract.registerInstitution(inst, "airport", {from: inst});

  }

  submitForm(){
    this.setState({query: this.state.firstName + ' ' + this.state.lastName + '\n' +
                          this.state.email + '\n' + this.state.id + '\n' +
                          this.state.validity + '\n' + this.state.pob + '\n' +
                          this.state.dob + '\n' + this.state.age});



    var text = this.state.firstName + ' ' + this.state.lastName + '\n' +
                          this.state.email + '\n' + this.state.id + '\n' +
                          this.state.validity + '\n' + this.state.pob + '\n' +
                          this.state.dob + '\n' + this.state.age;
    console.log(text);
    var _user = this.state.user;
    DocumentContract.issueData(_user, text, {from: inst, gas: 500000});
  }

  handleInputChange(e) {
    var text = e.target.value;
    this.setState({
      text: text,
    });
  }

  handleCodeChange(e) {
    var text = e.target.value;
    this.setState({
      inputCode: text,
    });
  }


  handleRequestCode(e) {
    var text = e.target.value;
    this.setState({
      requestCode: text,
    });
  }

  handleSubmit() {
    var text = this.state.text;
    var _user = this.state.user;
    console.log('text');
    DocumentContract.issueData(_user, text, {from: inst, gas: 500000});
  }

  requestCode() {

    var _inst = this.state.inst;
    DocumentContract.requestCode(_inst, {from: inst, gas: 500000});
    var code = DocumentContract.getCode(_inst).c[0];

    this.setState({
      code: code,
    });
  }

  grantAccess() {
    var code = this.state.inputCode;
    var _user = this.state.user;
    DocumentContract.grantAccess(_user, code, {from: user});
  }

  requestData() {
    var code = this.state.requestCode;
    var data = CLIENT.toAscii(DocumentContract.requestData(code));

    this.setState({
      data: data,
    });
  }



  renderPersonalData(){
    return(
      <div>
        <div className="row">
          <div className="input-field col s6">
            <input
              id="first_name"
              type="text"
              className="validate"
              onChange={event => {this.setState({firstName: event.target.value})}}
              />
            <label htmlFor="first_name">First Name</label>
          </div>
          <div className="input-field col s6">
            <input
              id="last_name"
              type="text"
              className="validate"
              onChange={event => {this.setState({lastName: event.target.value})}}
              />
            <label htmlFor="last_name">Last Name</label>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <div className="input-field inline">
              <input
                id="email"
                type="text"
                onChange={event => {this.setState({dob: event.target.value})}}
                />
              <label htmlFor="email" data-error="wrong" data-success="right">Date of birth</label>
            </div>
            <div className="input-field inline">
              <input
                id="email"
                type="text"
                onChange={event => {this.setState({age: event.target.value})}}
                />
              <label htmlFor="email" data-error="wrong" data-success="right">Age</label>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render(){
    console.log('queryState' , this.state.query)
    return(
      <div className="backgroundBIG">
      <div className="headtitle Montserrat">Issue Document</div>
      <div className="container z-depth-4">
        <div className="row">
          {this.renderPersonalData()}
        </div>
        <div className="row">
          <div className="inline center">
            <button className="btn wave-effect waves-light blue-grey lighten-3" type="clear" name="action"> Clear field
            </button>
            <button
              className="btn wave-effect waves-light blue-grey lighten-3"
              type="submit"
              name="action"
              onClick={() => this.submitForm()}
              > Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </div>
      </div>
      </div>
    )
  }




  //
  // render() {
  //   return (
  //     <div className="App">
  //       <div className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <h2>{this.state.initialSupply}</h2>
  //       </div>
  //       <p className="App-intro">
  //       </p>
  //
  //       <div>
  //         <input type="text" onChange={this.handleInputChange} value={this.state.text}/>
  //         <input type="submit" value="issue data" onClick={this.handleSubmit} />
  //       </div>
  //
  //       <div>
  //         <button onClick={this.requestCode}>request code</button>
  //         <div>{this.state.code}</div>
  //       </div>
  //
  //       <div>
  //         <input type="text" onChange={this.handleCodeChange} value={this.state.inputCode} />
  //         <button onClick={this.grantAccess}>grant access</button>
  //       </div>
  //
  //
  //       <div>
  //         <input type="text" onChange={this.handleRequestCode} value={this.state.requestCode} />
  //         <button onClick={this.requestData}>request data</button>
  //         <div>{this.state.data}</div>
  //       </div>
  //     </div>
  //   );
  // }
}

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      user: '',
      files: [],
      code: 0,
      inputCode: 0,
      requestCode: 0,
      data: '',
    }


    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleRequestCode = this.handleRequestCode.bind(this);
    this.grantAccess = this.grantAccess.bind(this);
    this.requestCode = this.requestCode.bind(this);
    this.requestData = this.requestData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({
      user: user,
      inst: inst,
    });
    var _user = this.state.user;
    var _inst = this.state.inst;
    DocumentContract.registerUser(user, {from: user});
    DocumentContract.registerInstitution(inst, "airport", {from: inst});

  }

  handleInputChange(e) {
    var text = e.target.value;
    this.setState({
      text: text,
    });
  }

  handleCodeChange(e) {
    var text = e.target.value;
    this.setState({
      inputCode: text,
    });
  }


  handleRequestCode(e) {
    var text = e.target.value;
    this.setState({
      requestCode: text,
    });
  }

  handleSubmit() {
    var text = this.state.text;
    var _user = this.state.user;
    console.log('text');
    DocumentContract.issueData(_user, text, {from: inst, gas: 500000});
  }

  requestCode() {

    var _inst = this.state.inst;
    DocumentContract.requestCode(_inst, {from: inst, gas: 500000});
    var code = DocumentContract.getCode(_inst).c[0];

    this.setState({
      code: code,
    });
  }

  grantAccess() {
    var code = this.state.inputCode;
    var _user = this.state.user;
    DocumentContract.grantAccess(_user, code, {from: user});
  }

  requestData() {
    var code = this.state.requestCode;
    var data = CLIENT.toAscii(DocumentContract.requestData(code));

    this.setState({
      data: data,
    });
  }

  render() {
    return (
      <div className="background">

        <div className="containerMe">
        <div className="headtitle2 Montserrat">User</div>
          <input className="inputCode Montserrat" type="text" onChange={this.handleCodeChange} value={this.state.inputCode} />
          <button className="grant Montserrat" onClick={this.grantAccess}>Grant Access</button>
        </div>

      </div>
    );
  }
}

class Officer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      user: '',
      files: [],
      code: 0,
      inputCode: 0,
      requestCode: 0,
      data: '',
      requestData: 0,
      theData: 0,
    }


    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleRequestCode = this.handleRequestCode.bind(this);
    this.grantAccess = this.grantAccess.bind(this);
    this.requestCode = this.requestCode.bind(this);
    this.requestData = this.requestData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({
      user: user,
      inst: inst,
    });
    var _user = this.state.user;
    var _inst = this.state.inst;
    DocumentContract.registerUser(user, {from: user});
    DocumentContract.registerInstitution(inst, "airport", {from: inst});

  }

  handleInputChange(e) {
    var text = e.target.value;
    this.setState({
      text: text,
    });
  }

  handleCodeChange(e) {
    var text = e.target.value;
    this.setState({
      inputCode: text,
    });
  }


  handleRequestCode(e) {
    var text = e.target.value;
    this.setState({
      requestCode: text,
    });
  }

  handleSubmit() {
    var text = this.state.text;
    var _user = this.state.user;
    console.log('text');
    DocumentContract.issueData(_user, text, {from: inst, gas: 500000});
  }

  requestCode() {

    var _inst = this.state.inst;
    DocumentContract.requestCode(_inst, {from: inst, gas: 500000});
    var code = DocumentContract.getCode(_inst).c[0];

    this.setState({
      code: code,
      requestData: 1,
    });
  }

  grantAccess() {
    var code = this.state.inputCode;
    var _user = this.state.user;
    DocumentContract.grantAccess(_user, code, {from: user});
  }

  requestData() {
    var code = this.state.code;
    var data = CLIENT.toAscii(DocumentContract.requestData(code));

    this.setState({
      data: data,
      theData: 1,
    });
  }

  render() {
    var code = this.state.code;
    if (code == 0) code = "";

    var thedata =  <div className="data Montserrat">{this.state.data}</div> ;
    if (this.state.theData === 0) thedata = '';

    var data = <div className="stuff"> <button className="grant" onClick={this.requestData}>request data</button>{thedata}</div>;
    if (this.state.requestData === 0) data = <div></div>;

    return (
      <div className="background">

        <div className="containerMe">
          <div>

            <div className="headtitle2 Montserrat">Officer</div>
            <button className="grant" onClick={this.requestCode}>request code</button>
            <div className="code">{code}</div>
          </div>
          {data}
        </div>
      </div>
    );
  }
}


class App extends React.Component {
    render() {
        return (
          <BrowserRouter>
            <div>
              <Route exact path="/" component={Issue} />
              <Route path="/user" component={User} />
              <Route path="/officer" component={Officer} />
            </div>
          </BrowserRouter>
        )
    }
}


export default App;
