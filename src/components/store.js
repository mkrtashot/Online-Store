import { useEffect, useState } from "react";
import Bag from "./bag";
import Menu from "./menu";

const API_KEY = "67d9edc0-e6a3-11e3-9798-57275476509a";
const FETCH_URL = "https://api.harvardartmuseums.org/object";

export default function Store() {
  let [data, setData] = useState([]);
  let [page, setPage] = useState(1);
  let [bagIcon, setBagIcon] = useState("empty");
  let [bag, setBag] = useState([]);
  let [isBag, setIsBag] = useState(false);
  let [isOpenBag, setIsOpenBag] = useState(false);
  let [modalDiv, setModalDiv] = useState("");

  let div = "";

  useEffect(() => {
    fetch(
      `${FETCH_URL}?apikey=${API_KEY}&sort=rank&sortorder=asc&from=12&size=30&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => setData(() => [...data.records]));
  }, [page]);

  useEffect(() => {
    if (bag.length > 0) {
      if (bag.length === 1) {
        setBagIcon(bag.length + " item");
      } else {
        setBagIcon(bag.length + " items");
      }
      setIsBag(true);
    }
  }, [bag]);

  const openBag = () => {
    if (isOpenBag) {
      setIsOpenBag(false);
      setModalDiv("modal-background");
      div = "modal-content";
    } else {
      setIsOpenBag(true);
      setModalDiv("");
      div = "";
    }
  };

  return (
    <>
      <div className="shop">
        <div className={`bag`}>
          Bag: {bagIcon}{" "}
          {isBag && (
            <button onClick={openBag}>
              {(isOpenBag && <>Close bag</>) || <>Open bag</>}
            </button>
          )}
        </div>
        <br />
        {isOpenBag && (
          <Bag
            bag={bag}
            handleSetBag={(bag) => setBag(bag)}
            bagIcon={bagIcon}
            handleSetBagIcon={setBagIcon}
            setIsBag={setIsBag}
            isBag={isBag}
            setIsOpenBag={(value) => setIsOpenBag(value)}
          />
        )}{" "}
        <br />
        <div className={`menu ${isOpenBag ? "modal-background" : ""}`}>
          <Menu
            data={data}
            bag={bag}
            setBag={setBag}
            modalDiv={modalDiv}
            isOpenBag={isOpenBag}
          />
        </div>
      </div>
    </>
  );
}
