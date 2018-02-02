import React, { Component } from "react";
import styled from "styled-components";
import Card from "../library/card";
import Input from "../library/input";
import A from "../library/anchor";
import Button from "../library/button";
import Logo from "../common/logo";
import get from "../../api/user";

const ProfileInput = styled(Card)`
  text-align: center;
  box-sizing: border-box;
  margin: 70px auto 0;
  padding: 30px 50px;
  width: 500px;
  min-height: 100px;

  @media (max-width: 600px) {
    width: 90%;
  }

  > input {
    margin-top: 30px;
  }

  > a {
    width: 100%;
    margin-top: 10px;
  }
`;

const isPromise = obj => Boolean(obj) && typeof obj.then === "function";

const next = (iter, callback, prev = undefined) => {
  const item = iter.next(prev);
  const value = item.value;

  if (item.done) return callback(prev);

  if (isPromise(value)) {
    value.then(val => {
      setImmediate(() => next(iter, callback, val));
    });
  } else {
    setImmediate(() => next(iter, callback, value));
  }
};

const gensync = fn => (...args) =>
  new Promise(resolve => {
    next(fn(...args), val => resolve(val));
  });

/* Generator Functions */

const getProfileData = gensync(function* userdata({ username }) {
  yield get(username); // returns promise
});

export default class ProfileInputComponent extends Component {
  constructor(props) {
    super(props);
    /* Set initial state */
    this.state = { username: "" };
  }

  /* Change state on change */
  onChange(event) {
    this.setState({ username: event.target.value });
  }

  /* Trigger submit on enter key */
  onKeyUp(event) {
    if (event.which === 13) {
      getProfileData({ ...this.state }).then(value => {
        console.log("shitty way", value);
      });
    }
  }

  /*
    Compose presentation components inside our
    ProfileInput components
  */
  render() {
    return (
      <ProfileInput>
        <Logo />
        <Input
          autoFocus="true"
          placeholder="Github Username"
          onChange={this.onChange.bind(this)}
          onKeyUp={this.onKeyUp.bind(this)}
        />
        <A href={`/profile/${this.state.username}`}>
          <Button>See profile</Button>
        </A>
      </ProfileInput>
    );
  }
}
ProfileInputComponent.propTypes = {};