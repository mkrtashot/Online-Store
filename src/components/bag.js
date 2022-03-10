import { useEffect, useState } from "react";

export default function Bag({
  bag,
  handleSetBag,
  handleSetBagIcon,
  setIsOpenBag,
  isOpenBag,
}) {
  const [items, setItems] = useState(bag);
  let [totalPrice, setTotalPrice] = useState(0);

  const addBag = (id) => {
    const newBag = bag.map((el) => {
      if (el.id === id) {
        el = { ...el, count: ++el.count };
      }
      return el;
    });

    handleSetBag(newBag);
    setItems(newBag);
  };

  const minusBag = (id) => {
    const newBag = bag.map((el) => {
      if (el.id === id && el.count > 1) {
        el = { ...el, count: --el.count };
      }

      return el;
    });

    handleSetBag(newBag);
    setItems(newBag);
  };

  const deleteItem = (id) => {
    let deleteItem;
    items.forEach((item, index) => {
      if (item.id === id) {
        deleteItem = index;
      }
    });

    let newArr = items.filter((el) => {
      if (!el[id]) {
        return el;
      }
    });

    handleSetBag(newArr);
    setItems(newArr);
  };

  useEffect(() => {
    let price = 0;
    items.filter((it) => {
      price += it.price * it.count;
    });
    setTotalPrice(price);

    if (items.length > 0) {
      if (items.length === 1) {
        handleSetBagIcon(items.length + " item");
      } else {
        handleSetBagIcon(items.length + " items");
      }
    } else {
      handleSetBagIcon("empty");
    }
  }, [items]);

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
          {items.map(({ id, title, images, price, count }, index) => {
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
