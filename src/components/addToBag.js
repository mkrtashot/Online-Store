import { useEffect, useState } from "react";

const countLocal = (id) => {
  let count = localStorage.getItem(id);

  if (count) {
    return JSON.parse(localStorage.getItem(id));
  } else {
    return 0;
  }
};

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
  let [countCheck, setCount] = useState(countLocal(id));
  let [itemInTheBag, setItemInTheBag] = useState(false);

  let currentCount = JSON.parse(localStorage.getItem(id));

  const addBag = () => {
    setItemInTheBag(true);

    setBag([...bag, { title, price, images, count: 1, id, [id]: true }]);
    setCount(1);
  };

  const handleMinus = () => {
    if (countCheck > 1) {
      setCount(countCheck - 1);
    } else if (countCheck === 1) {
      setCount(countCheck - 1);
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

    let flag = 0;

    bag.map((el) => {
      if (el.id === id) {
        setCount(el.count);
        flag++;
      }
    });

    if (flag === 0) {
      setCount(0);
      setItemInTheBag(false);
    }
  }, [bag]);

  useEffect(() => {
    localStorage.setItem(id, JSON.stringify(countCheck));

    if (countCheck > 0) {
      setItemInTheBag(true);
    }

    const newBag = bag.map((el) => {
      if (el.id === id) {
        el = { ...el, count: countCheck };
      }
      return el;
    });

    setBag(newBag);
  }, [countCheck]);

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
