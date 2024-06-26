import { useState } from "react";
import "./Carousel.css";
import Card from "./Card";


/** Carousel: displays images and arrows to navigate through them
 * 
 * Props:
 * - photos: array of {src, caption} objects
 * - title: string describing the collection of images
 * 
 * State:
 * - currCardIdx: integer for current card index
 * 
 * App --> Carousel --> Card
 */
 function Carousel({ photos, title }) {
  const [currCardIdx, setCurrCardIdx] = useState(0);
  const changePhoto = (direction) =>{
    let newIdx;
    let lastPhotoIndex = photos.length - 1;
    //reduces index to change to photo on the left
    //if photo is already the last photo on the left, it will return the base index of 0
    if(direction === 'left'){
      newIdx = currCardIdx - 1;
      if(currCardIdx === 0){
        return 0;
      }
  }
    //increases index to change to photo on the right
    //if photo is already the last photo on the right, it will return the base index of last photo index
    if(direction === 'right'){
      newIdx = currCardIdx + 1;
      if(currCardIdx===lastPhotoIndex){
      return lastPhotoIndex;
      }
    }
    
    return newIdx;
  }
  const currCard = photos[currCardIdx];
  const total = photos.length;
  let leftArrow = (currCardIdx === 0 ? 'hide' : 'show');
  let rightArrow = (currCardIdx === 2 ? 'hide' : 'show');
  //Increments currCardIdx state by 1
  function goForward(direction) {
    setCurrCardIdx(changePhoto(direction));
  }

  return (
    <div className="Carousel">
      <h1>{title}</h1>
      <div className="Carousel-main">
        <i
          className={`bi bi-arrow-left-circle ${leftArrow}`}
          onClick={()=> goForward('left')}
        />
        <Card
          caption={currCard.caption}
          src={currCard.src}
          currNum={currCardIdx + 1}
          totalNum={total}
        />
        <i
          className={`bi bi-arrow-right-circle ${rightArrow}`}
          onClick={()=> goForward('right')}
        />
      </div>
    </div>
  );
}

export default Carousel;
