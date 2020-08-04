import React from 'react';
import { t } from 'react-multi-lang'
import { sendView } from '../../helpers/functions'

import {General} from '../models/General'

class Contact extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: false,
      status: null,
      error: null,
    };
    this.fieldSet = this.fieldSet.bind(this) 
    this.sendMessage = this.sendMessage.bind(this) 
 }
  
 fieldSet(event){
   console.log(event.target.name)
   this.setState({data: Object.assign(this.state.data, {[event.target.name]: event.target.value}) });
 }
  
 sendMessage(e){
    e.preventDefault();
    e.stopPropagation();
   
    this.setState({
      isLoading: true,
    });
    return General.sendContact(this.state.data)
      .then(json =>{
          this.setState({ status: json, isLoading: false })
          document.getElementById("contactForm").reset();
      })
      .catch(error => this.setState({ error, isLoading: false }))
 } 
  
 render(){
    this.state.data = this.state.data || null
    this.state.form = this.state.form || null
   
    return (
      <section className="container-fluid" >
          <aside className="row" id="sidebar">
            
                <form className="form-horizontal col-md-6" id="contactForm" onSubmit={ this.sendMessage }>
      
                  <div className="row">
                    <div className="col-4 d-block d-md-none" style={{paddingTop: '0px'}}>
                      <a onClick={ () => window.history.go(-1) } className="fa fa-arrow-left"> { t('back') }</a>
                    </div>
                    <h3 className="col-lg-10 col-md-12 col-8">
                      { t('contactUs') }
                    </h3>
                  </div>

                  <div className="row">
                      {  this.state.status && this.state.status.message ? (
                        <div className="col-12">
                          <div className="alert alert-success">{ this.state.status.message }</div>
                        </div>
                      ):""}  
                      {  this.state.error && this.state.error.message ? (
                        <div className="col-12">
                          <div className="alert alert-danger">{ this.state.error.message }</div>
                        </div>
                      ):""}
                  </div>

                  <div className="form-group"> <label className="col-sm-2 control-label">{ t('name') }</label>
                    <div className="col-sm-10"> <input type="text" className="form-control rounded" name="name" onChange={ this.fieldSet } required /> </div>
                  </div>
                  <div className="form-group"> <label className="col-sm-2 control-label">{ t('email') }</label>
                    <div className="col-sm-10"> <input type="email" className="form-control rounded" name="email" onChange={ this.fieldSet } required /></div>
                  </div>
                  <div className="form-group"> <label className="col-sm-2 control-label" htmlFor="input-id-1">{ t('subject') }</label>
                    <div className="col-sm-10"> <input type="text" className="form-control rounded" name="subject" onChange={ this.fieldSet } required /> </div>
                  </div>
                  <div className="form-group"> <label className="col-sm-2 control-label">{ t('message') }</label>
                    <div className="col-lg-10">
                      <textarea  cols={30} rows={10} className="col-md-12 " name="msg" 
                                onChange={ this.fieldSet } defaultValue={""} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-10 col-sm-offset-2"> 
                      <button type="submit" className="btn ms_btn btn-link h6 btn-sucess">{ t('send') }</button> 
                      <button type="reset" className="btn ms_btn btn-link h6 btn-danger">{ t('cancel') }</button> 
                    </div>
                  </div>
                </form>
                <div className="col-md-6">
                  <div className="row padder_top80">
                    <div className="col-md-12  m-t-xl m-b-xl text-center"><img src="/assets/images/enter-the-shadows-mini.png" alt="" /></div>
                    <div className="col-md-12  m-t-xl m-b-xl text-center"><img src="/assets/images/name-enter-the-shadows-mini.png" alt="" /></div>
                    <div className="col-md-12 padder_top20">
                      <p>{ 'Email: contact@entertheshadows.com.br' }</p>
                      <p>
                        <h4 className="fa fa-facebook"></h4>
                        <a href="https://www.facebook.com/radioentertheshadows" target="_blank">/radioentertheshadows</a>
                      </p>
                    </div>
                  </div>
                </div>

          </aside>
      </section>
    );
  }
}

export default Contact;
