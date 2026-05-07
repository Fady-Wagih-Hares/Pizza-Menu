import React from "react";
import Pizza from "./../Pizza";
const Menu = () => {
  const pizzaData = [
    {
      name: "Focaccia",
      ingredients: "Bread with italian olive oil and rosemary",
      price: 6,
      photoName: "/src/assets/focaccia.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Margherita",
      ingredients: "Tomato and mozarella",
      price: 10,
      photoName: "/src/assets/margherita.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Spinaci",
      ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
      price: 12,
      photoName: "/src/assets/spinaci.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Funghi",
      ingredients: "Tomato, mozarella, mushrooms, and onion",
      price: 12,
      photoName: "/src/assets/funghi.jpg",
      soldOut: false,
    },
    {
      name: "Pizza Salamino",
      ingredients: "Tomato, mozarella, and pepperoni",
      price: 15,
      photoName: "/src/assets/salamino.jpg",
      soldOut: true,
    },
    {
      name: "Pizza Prosciutto",
      ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
      price: 18,
      photoName: "/src/assets/prosciutto.jpg",
      soldOut: false,
    },
  ];

  const pizzas = pizzaData;

  const numPizzas = pizzas.length;
  return (
    <main className="menu">
      <h2>Our Menu</h2> {/* conditional rendering */}
      {/* it prefer to do ternary operator */}
      {/* {numPizzas > 0 && (  */}
      {/* render pizza data */}
      {/* // <ul className="pizzas"> */}
      {/* //   {pizzas.map((pizza) => ( */}
      {/* //     <Pizza pizzaObj={pizza} key={pizza.name} /> */}
      {/* //   ))} */}
      {/* // </ul> */}
      {/* // )} */}
      {
        /* render pizza data */
        // we can not write if else statement because jsx rules that force us to write the things that produce values

        /*  react fragment => group some elements without leaving any trace in DOM Tree */
        numPizzas > 0 ? (
          // <React.Fragment>
          <>
            <p>
              Authentic Italian cuisine. 6 creative dishes to choose from. All
              from our stone oven, all organic, all delicious.
            </p>
            <ul className="pizzas">
              {pizzas.map((pizza) => (
                <Pizza pizzaObj={pizza} key={pizza.name} />
              ))}
            </ul>
          </>
        ) : (
          <p>We Are Still Working With Our Menu, Please Come Back Later :).</p>
        )
      }
      {/* <Pizza
        name="Pizza Spinaci"
        ingredients="Tomato , Mozarella , spinach , and ricotta ches"
        photoName="/src/assets/spinaci.jpg"
        price={10}
      />

      <Pizza
        name="Pizza Funghi"
        ingredients="Tomato , Mushrooms"
        price={12}
        photoName="/src/assets/funghi.jpg"
      /> */}
    </main>
  );
};
export default Menu;
