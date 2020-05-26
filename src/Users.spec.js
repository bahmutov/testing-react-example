import React, { Component } from "react";
import {mount} from 'cypress-react-unit-test'

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        // make sure to check for errors
        return response.json();
      })
      .then(json => {
        this.setState(() => {
          return { data: json };
        });
      });
  }
  render() {
    return (
      <ul>
        {this.state.data.map(user => (
          <li key={user.name}>{user.name}</li>
        ))}
      </ul>
    );
  }
}

describe("User component", () => {
  it("it shows a list of users", () => {
    const fakeResponse = [{ name: "John Doe" }, { name: "Kevin Mitnick" }];

    cy.stub(window, 'fetch').resolves({
      json: () => Promise.resolve(fakeResponse)
    })

    mount(<Users />)
    cy.get('li').should('have.length', 2)
    cy.contains('li', 'John Doe')
    cy.contains('li', 'Kevin Mitnick')
  });
});
