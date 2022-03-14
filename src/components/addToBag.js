import { useEffect, useState } from "react";

export default function AddToBag({
  title,
  price,
  bag,
  setBag,
  images,
  id,
  setBagIcon,
  setIsBag,
}) {
  let [countCheck, setCount] = useState(0);
  let [itemInTheBag, setItemInTheBag] = useState(false);

  const addBag = () => {
    setItemInTheBag(true);

    setBag([...bag, { title, price, images, count: 1, id, [id]: true }]);
    setCount(1);
  };

  const handleMinus = () => {
    if (countCheck > 1) {
      setCount(countCheck - 1);
    } else if (countCheck === 1) {
      setItemInTheBag(false);

      let deleteItem;
      bag.forEach((item, index) => {
        if (item.id === id) {
          deleteItem = index;
        }
      });

      let newArr = bag.filter((el) => {
        if (!el[id]) {
          return el;
        }
      });

      setBag(newArr);
      setBagIcon("empty");
      setIsBag(false);
    }
  };

  const handlePlus = () => {
    setCount(countCheck + 1);
    for (let i = 0; i < bag.length; i++) {
      if (bag[i][id]) {
        ++bag[i].count;
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("bag", JSON.stringify(bag));
  }, [bag]);

  return (
    <>
      {(itemInTheBag && (
        <>
          <button onClick={handlePlus}>+</button>
          {countCheck}
          <button onClick={handleMinus}>-</button>
        </>
      )) || <button onClick={addBag}>add to bag</button>}
    </>
  );
}
