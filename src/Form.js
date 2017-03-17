import React, { Component } from 'react';
import Name from './Name';
import Email from './Email';
import Phone from './Phone';

import request from 'superagent';

class Form extends Component {

  constructor(props) {
    super(props);

    this.state = {
      first: '',
      last: '',
      email: '',
      phone: '',
    };

    this._handleTyping = this._handleTyping.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleTyping(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  _handleSubmit(e) {
    e.preventDefault();
    let errors = []
    // check for existence first
    if (this.state.first.length === 0 || this.state.last.length === 0 || this.state.phone.length === 0 || this.state.email.length === 0) {
      alert("Fields cannot be empty!");
      return
    }
    if (!this.checkName(this.state.first)) {
      errors.push("Check that your first name is capitalized correctly!");
    }
    if (!this.checkName(this.state.last)) {
      errors.push("Check that your last name is capitalized correctly!");
    }
    if(!this.checkEmail(this.state.email)) {
      errors.push("Does your email match *@*.*?");
    }
    if(!this.checkPhone(this.state.phone)) {
      errors.push("Does your phone match (xxx)-xxx-xxxx?");
    }
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return
    } else {
      request
        .post('http://webtier.christianle.com/v1/contact')
        .send({
          first: this.state.first,
          last: this.state.last,
          email: this.state.email,
          phone: this.state.phone,
        })
        .end(function(err, res) {
          if (err || !res.ok) {
           alert('Error with the response! ');
          } else {
           alert('Here\'s your response: ' + JSON.stringify(res.body));
          }
        });
      return
    }
  }

  checkName(name) {
    if (name[0].toUpperCase() !== name[0]) {
      return false;
    }
    for (let i = 1; i < name.length; i += 1) {
      if (name[i].toLowerCase() !== name[i]) {
        return false;
      }
    }
    return true;
  }

  checkEmail(email) {
    return email.trim().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/); // RCP regex 99.99% covered
  }

  checkPhone(phone) {
    return phone.trim().match(/^[(]\d{3}[)][-]\d{3}[-]\d{4}$/); // me struggling
  }

  render() {
    return (
      <div className="form">
        <Name _handleTyping={this._handleTyping} />
        <Email _handleTyping={this._handleTyping} />
        <Phone _handleTyping={this._handleTyping} />
        <button onClick={this._handleSubmit}>Submit</button>
      </div>
    );
  }
}

// First: capital first letter
// Last: capital last ltter
// email: correct formatted email
// phone: (xxx)-xxx-xxxx
export default Form;
