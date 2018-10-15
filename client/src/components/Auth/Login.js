import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import styled, { css } from 'styled-components';

import { Mutation } from "react-apollo";
import Error from "../Error";
import { LOGIN } from "../../queries";


const LoginContainer = styled.div`
  margin: 2rem 0 2rem 0;
  flex: 1;
  display: flex;
  justify-content: center;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
`;

const RowButton = styled.div`
  display: flex;
  margin-top: 4rem;
`;

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  color: #444;
  padding: 0.25em 1em;
  flex: 1;
  border: none;
  height: 2.2rem;
  background-color: rgb(0,128,128);
  ${props => props.styleSignin && css`
    background-color: ${props => props.disabled ? "#CCC" : "rgb(19,184,235)"};
    width: 100%;
  `};
  ${props => props.styleLearnMore && css`
    margin-left: 0.5rem;
  `};
  ${props => props.styleCreateAccount && css`
  margin-right: 0.5rem;
  `};
`;

const Logo = styled.div`
  min-height: 3.3rem;
  text-align: center;
  line-height: 3.3rem;
  vertical-align: middle;
  color: #fff;
  font-weight: 700;
  font-size: 35px;
`;

const LoginForm = styled.form`
  margin-top: 1.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  background-color: #fff;
  opacity: 0.3;
  display: block;
  font-size: 14px;
  width: 100%;
  padding: 1rem 0.8rem 1rem 0.8rem;
  border-radius: 5px;
  box-shadow: inset 0 1px 2px rgba(0,0,0, .55), 0px 1px 1px rgba(255,255,255,.5);
  border: 2px solid #CCC;

  ${props => props.styleEmail && css`
      margin-bottom: 1rem;
  `};
`;

const ErrorBox = styled.div`
  min-height: 1.2rem;
  width: 100%;
  font-size: 12px;
  color: #F00;
`;

const Link = ({ className, children, to }) => (
  <NavLink className={className} to={to}>
    {children}
  </NavLink>
);

const LinkForget = styled(Link)`
  font-size: 10px;
  width: 100%;
  font-weight: 500;
  color: #CCC;
  margin-bottom: 2rem;
`;

const initialState = {
  email: "",
  password: ""
};

class Login extends React.Component {

  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event, login) => {
    event.preventDefault();
    login().then(async ({ data, refetch }) => {
      console.log(data);
      localStorage.setItem("token", data.login.token);
      localStorage.setItem("firstname", data.login.user.firstname);
      await refetch;
      this.clearState();
      this.props.history.push("/home");
    });
  };

  validateForm = () => {
    const { email, password } = this.state;
    const isInvalid = !email || !password;
    return isInvalid;
  };

  handleClickLearn = () => {
    this.props.history.push("/learnmore");
  };

  handleClickSignup = () => {
    this.props.history.push("/signup");
  };

  render() {
    const { email, password } = this.state;
    return (
      <LoginContainer>
      <LoginBox>
        <Logo>INKLING HABITAT</Logo>
        <Mutation mutation={LOGIN} variables={{ email, password }}>
          {(login, { data, loading, error }) => {
            return (
             <LoginForm
                onSubmit={event => this.handleSubmit(event, login)} >
                <Input type="text"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={this.handleChange}
                  styleEmail
                />
                <Input type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChange}
                />
                <ErrorBox>{error && <Error error={error} />}</ErrorBox>
                <LinkForget to="/forgetpass">
                Forget your password?
                </LinkForget>
                <Button type="submit"
                  disabled={loading || this.validateForm()}
                  styleSignin >Sign In</Button>
             </LoginForm>
            );
          }}
        </Mutation>
        <RowButton>
          <Button styleCreateAccount onClick={this.handleClickSignup} >Create Account</Button>
          <Button styleLearnMore onClick={this.handleClickLearn} >Learn More</Button>
          </RowButton>
      </LoginBox>
      </LoginContainer>
    );
  }
}

export default withRouter(Login);

