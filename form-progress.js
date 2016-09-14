import React, { Component } from 'react';

export default class FormProgress extends Component {

  constructor(props) {
    super(props);

    this.state = {
      show: false,
      progress: 0
    };

    this.xhr = new XMLHttpRequest();

    if (this.xhr.upload) {
      let u = this.xhr.upload;
      // Initialize upload
      u.addEventListener('loadstart', (e) => {
        this.updateProgress(0).show();
      }, false);

      // Track upload progress
      u.addEventListener('progress', (e) => {
        let percent = e.loaded / e.total * 100;
        this.updateProgress(percent > 100 ? 100 : percent);
      }, false);
    }

    // Redirect or refresh page content as appropriate on completion
    this.xhr.onreadystatechange = () => {
      if (this.xhr.readyState != XMLHttpRequest.DONE) { return; }
      let container = this.props.contentContainerId ? document.getElementById(this.props.contentContainerId) : document.body;
      container.innerHTML = this.xhr.response;
      this.hide();
    };

    this.addForms(this.props.formSelector);
  }

  addForms(selector) {
    if ( !selector || !this.xhr.upload ) { return false; }
    for (let form of document.querySelectorAll(selector)) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.xhr.open('POST', form.action);
        let formData = new FormData(form);
        if(typeof(this.beforeSend) == "function") {
          this.beforeSend(this.xhr, formData);
        }
        this.xhr.send(formData);
      }, false);
    }
    return this;
  }

  updateProgress(percent) {
    this.setState({progress: percent});
    return this;
  }

  show() {
    this.setState({show: true});
    return this;
  }

  hide() {
    this.setState({show: false});
    return this;
  }

  render() {
    let className = 'progress-modal';
    if (this.state.show) { className += ' show'; }
    return (
      <div className={ className }>
        <div className="progress-container">
          <div className="progress" style={{ width: this.state.progress + '%' }}></div>
          <div className="status-text">{ this.props.statusText || 'Loading...' }</div>
        </div>
      </div>
    );
  }

}