import { useEffect, useState } from "react";

export default function Bag({
  bag,
  handleSetBag,
  handleSetBagIcon,
  setIsOpenBag,
  isOpenBag,
  setIsBag,
}) {
  let [totalPrice, setTotalPrice] = useState(0);

  const addBag = (id) => {
    const newBag = bag.map((el) => {
      if (el.id === id) {
        el = { ...el, count: ++el.count };
      }
      return el;
    });

    handleSetBag(newBag);
  };

  const minusBag = (id) => {
    const newBag = bag.map((el) => {
      if (el.id === id && el.count > 1) {
        el = { ...el, count: --el.count };
      }

      return el;
    });

    handleSetBag(newBag);
  };

  const deleteItem = (id) => {
    let deleteItem;
    bag.forEach((item, index) => {
      if (item.id === id) {
        deleteItem = index;
        handleSetBag(...bag, { ...item, count: 0 });
      }
    });

    let newArr = bag.filter((el) => {
      if (!el[id]) {
        return el;
      }
    });

    handleSetBag(newArr);

    if (bag.length === 1) {
      setIsBag(false);
    }

    localStorage.setItem(id, JSON.stringify(0));
  };

  useEffect(() => {
    let price = 0;
    bag.filter((it) => {
      price += it.price * it.count;
    });
    setTotalPrice(price);

    if (bag.length > 0) {
      if (bag.length === 1) {
        handleSetBagIcon(bag.length + " item");
      } else {
        handleSetBagIcon(bag.length + " items");
      }
    } else {
      handleSetBagIcon("empty");
      setIsOpenBag(false);
    }
  }, [bag]);

  const handleIsBag = () => {
    setIsOpenBag(false);
  };

  return (
    <>
      <div className="modal" onClick={handleIsBag}>
        <div
          className="modal-content"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <button className="close" onClick={handleIsBag}>
            X
          </button>
          {bag.map(({ id, title, images, price, count }, index) => {
            return (
              <div key={id}>
                Item #{index + 1} <br />
                <img className="bag-img" src={images} /> <br />
                Name: {title} <br />
                Count: <button onClick={() => addBag(id)}>+</button>
                {count}
                <button onClick={() => minusBag(id)}>-</button>
                <button onClick={() => deleteItem(id)}>Delete item</button>{" "}
                <br />
                Price: ${price * count}
              </div>
            );
          })}
          <div className="total">Total Price: ${totalPrice}</div>
          <button className="buy">Buy</button>
        </div>
      </div>
    </>
  );
}
