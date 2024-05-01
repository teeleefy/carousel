import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", function() {
  let {debug}=render(<Carousel
    photos={TEST_IMAGES}
    title="images for testing"
  />);
  debug();
});

it("matches snapshot", function() {
  const { asFragment } = render(<Carousel
    photos={TEST_IMAGES}
    title="images for testing"
  />);

  expect(asFragment()).toMatchSnapshot();
});

//ATTEMPTED TO GROUP TESTS WITH DESCRIBE.
//COULD NOT GET TEST TO RECOGNIZE container VARIABLE

// describe("left and right arrow functionality", () => {
//   const { container } = render(
//     <Carousel
//       photos={TEST_IMAGES}
//       title="images for testing"
//     />
//   );

//   it("initially displays only the first photo", function(){
//     // expect the first image to show, but not the second
//     expect(
//       container.querySelector('img[alt="testing image 1"]')
//     ).toBeInTheDocument();
//     expect(
//       container.querySelector('img[alt="testing image 2"]')
//     ).not.toBeInTheDocument();

//   })

  
// })

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

  //move backwards in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
});




it("hides left arrow when you are on the first image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the right arrow and first image to show, but not the left arrow
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
 
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  expect(leftArrow).toHaveClass("hide");

  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  expect(rightArrow).toHaveClass("show");
});

it("shows both arrows when you are on the middle image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image and both arrows to show
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
 
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  expect(leftArrow).toHaveClass("show");

  expect(rightArrow).toHaveClass("show");
});

it("hides left arrow when you are on the last image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // move forward twice in the carousel to the last image
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // expect the last image and right arrow to show
  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).toBeInTheDocument();
 
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  expect(leftArrow).toHaveClass("show");

  expect(rightArrow).toHaveClass("hide");
});

// ### **Part 4: Bug! Exhausting the image array**

// As you may have noticed, if you’re on the last image and try to move forward, or if you’re on the first image and try to move backward, you get an error. To fix this, let’s just hide the left arrow on the first image and the right arrow on the last.

// Write a (failing) test to check that the left arrow is missing when you’re on the first image, and that the right arrow is missing when you’re on the last image. Then fix the bug so that your test turns green.