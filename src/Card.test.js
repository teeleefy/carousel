import React from "react";
import { render, fireEvent} from "@testing-library/react";
import Card from "./Card";
import image1 from "./image1.jpg";

it("renders without crashing", function() {
  let { debug } = render(<Card 
    caption="This is a photo."
    src={image1}
    currNum="1"
    totalNum="3"/>);
    debug();
});

it("matches snapshot", function() {
  const { asFragment } = render(<Card caption="This is a photo."
  src={image1}
  currNum="1"
  totalNum="3"/>);
  expect(asFragment()).toMatchSnapshot();
});
