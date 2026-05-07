import Order from "./Order";
//  we can pass props here and it will be empty => {}
const Footer = () => {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  // console.log(isOpen);
  //   if (hour >= openHour && hour <= closeHour) alert("We Currentely Open!");
  //   else alert("Sorry We Are Closed!");
  //   console.log(hour);
  // these 2 returns can not happen in the same time
  // it is useful when we need to return entire component not just pieces of jsx
  // if (!isOpen)
  //   return (
  //     <p>
  //       We Are Happy To Welcome You Between {openHour}:00 And {closeHour}:00.
  //     </p>
  //   );
  return (
    <footer className="footer">
      {/* {new Date().toLocaleTimeString()} We Are Currently Open! */}
      {/* conditional rendering with && */}
      {/* {isOpen && (
        <div className="order">
          <p>
            We Are Open until {closeHour}:00. Come Visit Us Or Order Online.
          </p>
          <button className="btn">Order</button>
        </div>
      )} */}
      {isOpen ? (
        <Order openHour={openHour} closeHour={closeHour} />
      ) : (
        <p>
          We Are Happy To Welcome You Between {openHour}:00 And {closeHour}
          :00.
        </p>
      )}
      {/* {false}
      {true} */}
    </footer>
  );
};
export default Footer;
