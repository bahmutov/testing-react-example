/// <reference types="cypress" />
import React from 'react'
import { mount } from 'cypress-react-unit-test'

function Button(props) {
  return <button>Nothing to do for now</button>;
}

describe("Button component", () => {
  it("Matches the snapshot", () => {
    mount(<Button />);
  });
});
