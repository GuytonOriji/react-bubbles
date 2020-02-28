import React, {useEffect,useState} from "react";
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {axiosCall} from './axios/'

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

const [token,setToken] = useState()
const [credz,setcredz] = useState()
const [username,setusername] = useState()
const [password,setpassword] = useState()

const login = (e) =>{
	e.preventDefault()

	


			axiosCall().post('/api/login',{
			username:username,
			password:password
		}).then(res=>{

				window.localStorage.setItem('token',res.data.payload)

				props.history.push('/BubblePage')
			}).catch(err=>console.log(err))
}

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>






      <Form onSubmit={login}>
      <FormGroup row>
        <Label htmlFor="username" sm={2}>UserName:</Label>
        <Col sm={10}>
          <Input type="username"
          onBlur={(e)=>{setusername(e.target.value)}}
           name="username" id="username" placeholder="username" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label htmlFor="password" sm={2}>Password:</Label>
        <Col sm={10}>
          <Input type="password" 
          onBlur={(e)=>{setpassword(e.target.value)}}
          name="password" id="password" placeholder="password " />
        </Col>
      </FormGroup>
  
      <FormGroup check row>
        <Col sm={{ size: 10, offset: 2 }}>
          <Button type='submit'>Submit</Button>
        </Col>
      </FormGroup>
    </Form>
    </div>
  );
};

export default Login;
