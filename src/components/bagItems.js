import { useEffect, useState } from "react";

export default function BagItems({ item, index, setBag }) {
  let [countCheck, setCountCheck] = useState(0);

  const addCount = () => {
    setCountCheck(countCheck + 1);
  };

  useEffect(() => {
    setBag({ count: item.count + 1 });
  }, [countCheck]);

  return (
    <div>
      Item #{index + 1} <br />
      <img className="bag-img" src={item.images} /> <br />
      Name: {item.title} <br />
      Count: <button onClick={addCount}>+</button>
      {item.count}
      <button>-</button>
      <button>Delete item</button> <br />
      Price: ${item.price * item.count}
    </div>
  );
}
