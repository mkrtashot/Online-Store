import { useState } from "react";

export default function AddToBag({ title, price, bag, setBag, images, id }) {
  let [countCheck, setCount] = useState(0);

  const addBag = () => {
    if (countCheck > 0) {
      let flag = true;

      for (let i = 0; i < bag.length; i++) {
        if (bag[i][id]) {
          bag[i].count += countCheck;
          setCount(0);
          flag = false;
        }
      }
      if (flag) {
        setBag([
          ...bag,
          { title, price, images, count: countCheck, id, [id]: true },
        ]);
        setCount(0);
      }
    }
  };

  console.log(bag);

  return (
    <>
      {" "}
      <button
        onClick={() => {
          setCount(countCheck + 1);
        }}
      >
        +
      </button>
      {countCheck}
      <button
        onClick={() => {
          if (countCheck > 0) {
            setCount(countCheck - 1);
          }
        }}
      >
        -
      </button>
      <button onClick={addBag}>add to bag</button>
    </>
  );
}
