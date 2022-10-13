// components
import ItemDetails from "./ItemDetails";

const ItemShowcase = ({ items }) => {
  return (
    <div>
      {items ? (
        <div className="showcase">
          {items.map(item => (
          <ItemDetails item={item} key={item._id} />
          ))}{" "}
        </div>
      ) : (
        <span className="loader"></span>
      )}
    </div>
  );
};

export default ItemShowcase;
