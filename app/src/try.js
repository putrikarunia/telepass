
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

        <div className="container">
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
    });
  }

  render() {
    var code = this.state.code;
    if (code == 0) code = "";

    var data = <div> <button className="grant" onClick={this.requestData}>request data</button> <div>{this.state.data}</div> </div>;
    if (this.state.requestData === 0) data = <div></div>;

    return (
      <div className="background">

        <div className="container">
          <div>
            <button className="grant" onClick={this.requestCode}>request code</button>
            <div className="code">{code}</div>
          </div>
          {data}
        </div>
      </div>
    );
  }
}
