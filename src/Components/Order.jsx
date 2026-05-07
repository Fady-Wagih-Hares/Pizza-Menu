const Order = ({ closeHour, openHour }) => {
  //   console.log(openHour);
  return (
    <div className="order">
      <p>
        We Are Open from {openHour}.00 to {closeHour}:00. Come Visit Us Or Order
        Online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
};
export default Order;
