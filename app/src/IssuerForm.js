import React, { Component } from 'react';
import '../css/IssuerForm.css';

class IssuerForm extends Component {

    constructor(props){
      super(props);
      this.state = {
        page: '',
        firstName:'',
        lastName:'',
        email:'',
        id:'',
        age: '',
        validity: '',
        pob: '',
        dob: '',
        query: ''
      }
    }

    componentWillMount(){
      this.setState({page: 0});
    }

    submitForm(){
      this.setState({query: this.state.firstName + ' ' + this.state.lastName + '\n' +
                            this.state.email + '\n' + this.state.id + '\n' +
                            this.state.validity + '\n' + this.state.pob + '\n' +
                            this.state.dob + '\n' + this.state.age})
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
            <div className="input-field col s12">
              <input
                id="email"
                type="email"
                className="validate"
                onChange={event => {this.setState({email: event.target.value})}}
                />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s9">
              <input
                id="password"
                type="password"
                className="validate"
                onChange={event => {this.setState({id: event.target.value})}}
                />
              <label htmlFor="password">Identification number</label>
            </div>

            <div className="input-field col s3">
              <input
                id="password"
                type="password"
                className="validate"
                onChange={event => {this.setState({validity: event.target.value})}}
                />
              <label htmlFor="password">Valid until</label>
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <div className="input-field inline">
                <input
                  id="email"
                  type="email"
                  className="validate"
                  onChange={event => {this.setState({pob: event.target.value})}}
                  />
                <label
                  htmlFor="email" data-error="wrong" data-success="right">Place of birth</label>
              </div>
              <div className="input-field inline">
                <input
                  id="email"
                  type="email"
                  className="validate"
                  onChange={event => {this.setState({dob: event.target.value})}}
                  />
                <label htmlFor="email" data-error="wrong" data-success="right">Date of birth</label>
              </div>
              <div className="input-field inline">
                <input
                  id="email"
                  type="email"
                  className="validate"
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
      )
    }
}

export default IssuerForm;
