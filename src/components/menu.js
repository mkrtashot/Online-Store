import { useEffect, useState } from "react";
import AddToBag from "./addToBag";

export default function Menu({ data, bag, setBag, modalDiv }) {
  return (
    <>
      {data.map(({ images, id, title, totalpageviews, classification }) => {
        return (
          <div key={id} className="order">
            <img className="image" src={images[0].baseimageurl} />
            <div className="info">
              {title} <br />
              Description: {classification} <br />
              Price: $ {totalpageviews} <br />
              <AddToBag
                title={title}
                price={totalpageviews}
                bag={bag}
                setBag={setBag}
                id={id}
                images={images[0].baseimageurl}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
