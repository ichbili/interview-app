import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import Error from "../Error";
import { SIGNUP } from '../../queries';

const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirmation: ""
};

class Signup extends Component {

    state = { ...initialState };

    clearState = () => { 
        this.setState({ ...initialState });
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event, signUp) => {
        event.preventDefault();
        signUp().then(async ({ data, refetch }) => {
          console.log(data);
          localStorage.setItem("token", data.signUp.token);
          localStorage.setItem("firstname", data.signUp.user.firstname);
          await refetch;
          this.clearState();
          this.props.history.push("/home");
        });
    };

    validateForm = () => {
        const { firstname, lastname, email, password, passwordConfirmation } = this.state;
        const isInvalid =
          !firstname || !lastname || !email || !password || password !== passwordConfirmation;
        return isInvalid;
    };

    render() {
    const { firstname, lastname, email, password, passwordConfirmation } = this.state;
    return (
      <div className="signup">
       <Mutation
          mutation={SIGNUP}
          variables={{ firstname, lastname, email, password }}
        >
        {(signUp, { data, loading, error }) => {
        return (
        <form className="form"
            onSubmit={event => this.handleSubmit(event, signUp)}
        >
            <input type="text"
                name="firstname"
                placeholder="First Name"
                value={firstname}
                onChange={this.handleChange} />
            <input type="text"
                name="lastname"
                placeholder="Last Name"
                value={lastname}
                onChange={this.handleChange} />
            <input type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={this.handleChange} />
            <input type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
                />
            <input type="password"
                name="passwordConfirmation"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChange={this.handleChange}
                />
            <button type="submit"
                disabled={loading || this.validateForm()}>Submit</button>
            {error && <Error error={error} />}      
        </form> );
        }}
        </Mutation>
      </div>
    )
  }
}

export default withRouter(Signup);