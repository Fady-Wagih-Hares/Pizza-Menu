> > > > > > > cf9e7a5 (fix design)

# 🍕 Fast React Pizza Co. — Learning Project

> **Course**: The Ultimate React Course by Jonas Schmedtmann
> **Section**: 03 — A First Look at React (Pizza Menu)
> **Stack**: React 19 · Vite · Vanilla CSS

---

## 📌 Table of Contents

1. [Project Overview](#-project-overview)
2. [Project Structure](#-project-structure)
3. [How to Run](#-how-to-run)
4. [Core Concepts Learned](#-core-concepts-learned)
   - [1. What is React?](#1-what-is-react)
   - [2. React Components](#2-react-components)
   - [3. JSX](#3-jsx)
   - [4. Props](#4-props)
   - [5. Rendering Lists (.map)](#5-rendering-lists-map)
   - [6. Conditional Rendering](#6-conditional-rendering)
   - [7. React Fragments](#7-react-fragments)
   - [8. Component Tree & Composition](#8-component-tree--composition)
   - [9. StrictMode](#9-strictmode)
5. [Component Breakdown](#-component-breakdown)
6. [Key Rules & Gotchas](#-key-rules--gotchas)
7. [Concepts Illustrated by Comments in Code](#-concepts-illustrated-by-comments-in-code)

---

## 🧾 Project Overview

**Fast React Pizza Co.** is a simple static pizza menu web app. It displays a list of pizzas, marks sold-out items visually, and shows an order prompt based on the current time of day (open 12:00–22:00).

The purpose of this project is **not** the app itself — it is a hands-on vehicle to learn the **fundamental building blocks of React**.

---

## 🗂 Project Structure

```
pizza-menu/
│
├── index.html                  ← Single HTML page (entry point for the browser)
├── vite.config.js              ← Vite bundler config
├── package.json                ← Dependencies & npm scripts
│
└── src/
    ├── main.jsx                ← React app bootstrap (mounts <App /> into #root)
    ├── App.jsx                 ← Root component — composes Header, Menu, Footer
    ├── Pizza.jsx               ← Presentational component for a single pizza card
    ├── index.css               ← Global styles (Roboto Mono font, layout, cards)
    │
    └── Components/
        ├── Header.jsx          ← Site title / branding
        ├── Menu.jsx            ← Pizza data array + list rendering logic
        ├── Footer.jsx          ← Open/closed logic based on current hour
        └── Order.jsx           ← CTA shown only when restaurant is open
```

---

## ⚙️ How to Run

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## 📚 Core Concepts Learned

### 1. What is React?

React is a **JavaScript library** for building user interfaces. Instead of manipulating the DOM directly, you describe _what_ the UI should look like and React takes care of _how_ to render it efficiently.

**Key ideas:**

- React uses a **component-based** architecture.
- The UI is a **function of state** — given the same data, the same UI is always produced.
- React **re-renders** only what changed, keeping the UI in sync with data.

---

### 2. React Components

A **component** is a JavaScript function that returns JSX (which React turns into real DOM elements). Every piece of visible UI is a component.

```jsx
// A simple functional component
const Header = () => {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
};
export default Header;
```

**Rules:**

- Component names **must start with a capital letter** (e.g., `Header`, not `header`).
- A component must **return JSX** (or `null` to render nothing).
- Each component lives in **its own file** by convention (one component per file).
- Always `export default` the component so other files can import it.

---

### 3. JSX

**JSX** (JavaScript XML) is a syntax extension that lets you write HTML-like code inside JavaScript. Babel/Vite transpiles it into `React.createElement()` calls under the hood.

```jsx
// JSX looks like HTML but it is JavaScript
return (
  <div className="container">
    <Header />
    <Menu />
    <Footer />
  </div>
);
```

**Important JSX rules:**
| Rule | Explanation |
|------|-------------|
| `className` instead of `class` | `class` is a reserved JS keyword |
| Every element must be closed | `<img />`, `<br />` (self-closing) |
| One root element per return | Wrap siblings in a `<div>` or Fragment `<>` |
| Expressions in `{}` | `{pizzaObj.price}` — any valid JS expression |
| No statements in JSX | You **cannot** use `if/else` or `for` directly inside JSX — use ternary or `.map()` |
| Comments inside JSX | `{/* This is a comment */}` |

---

### 4. Props

**Props** (properties) are how you pass data **from a parent component to a child component**. They flow in **one direction** — top-down.

```jsx
// Parent — passes data as props
<Pizza pizzaObj={pizza} key={pizza.name} />;

// Child — receives and uses props via destructuring
const Pizza = ({ pizzaObj }) => {
  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <h3>{pizzaObj.name}</h3>
      <p>{pizzaObj.ingredients}</p>
      <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
    </li>
  );
};
```

**Key points about props:**

- Props are **read-only** — a child must never modify its own props.
- You destructure props in the function signature: `({ pizzaObj })` instead of `(props)`.
- The **destructured name must exactly match** the prop name used in the parent (`pizzaObj={pizza}` → `{ pizzaObj }`).
- `key` is a **special prop** used by React for list reconciliation — it is **not** accessible inside the child component.

---

### 5. Rendering Lists (.map)

To render an array of data as a list of components, use JavaScript's `.map()` method inside JSX.

```jsx
<ul className="pizzas">
  {pizzas.map((pizza) => (
    <Pizza pizzaObj={pizza} key={pizza.name} />
  ))}
</ul>
```

**Why `key`?**

- React needs a unique, stable `key` on each list item so it can efficiently update the DOM when items change.
- Use a unique field from your data (like `pizza.name` or an `id`) — **never use the array index** as a key if the list can be reordered or filtered.

---

### 6. Conditional Rendering

React has **no special template directives** like `v-if` or `*ngIf`. Instead you use plain JavaScript expressions inside JSX.

#### Technique 1: Ternary operator `? :`

The **preferred** approach — works both for rendering elements and for inline values.

```jsx
// Render different components based on condition
{
  isOpen ? (
    <Order openHour={openHour} closeHour={closeHour} />
  ) : (
    <p>
      We Are Happy To Welcome You Between {openHour}:00 And {closeHour}:00.
    </p>
  );
}

// Inline value
<span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>;
```

#### Technique 2: Short-circuit evaluation `&&`

Renders the right side **only if** the left side is truthy. Good for "show or hide" cases without an else branch.

```jsx
// Shown in Footer.jsx comments as an alternative
{
  isOpen && (
    <div className="order">
      <p>We Are Open until {closeHour}:00.</p>
      <button className="btn">Order</button>
    </div>
  );
}
```

> ⚠️ **Gotcha**: If the left side evaluates to `0` (a falsy number), React renders the `0` literally on screen. Always use a boolean: `{numPizzas > 0 && ...}` or prefer a ternary.

#### Technique 3: Early return

Return early from the component function to render nothing (or a completely different UI) when a condition is met.

```jsx
// Shown as a commented-out option in Pizza.jsx
const Pizza = ({ pizzaObj }) => {
  if (pizzaObj.soldOut) return null; // renders nothing
  return ( ... );
};
```

---

### 7. React Fragments

JSX requires a **single root element**. When you don't want to add an extra `<div>` to the DOM, use a **React Fragment**.

```jsx
// Long form (allows adding a key prop on fragments in lists)
<React.Fragment>
  <p>Description text...</p>
  <ul className="pizzas">...</ul>
</React.Fragment>

// Short form (most common)
<>
  <p>Description text...</p>
  <ul className="pizzas">...</ul>
</>
```

Fragments group elements **without leaving any trace in the DOM tree**.

---

### 8. Component Tree & Composition

React apps are built as a **tree of nested components**. Data flows **down** through props; events flow **up** through callback functions (introduced in later sections).

```
<App>
  ├── <Header />               ← Displays the restaurant name
  ├── <Menu>
  │     └── <Pizza /> × 6     ← One per item in pizzaData array
  └── <Footer>
        └── <Order />          ← Only rendered when restaurant is open
```

**Composition** means building complex UIs by combining smaller, single-responsibility components. Each component should do **one thing well**.

---

### 9. StrictMode

```jsx
// main.jsx
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

`<StrictMode>` is a development-only tool that:

- **Intentionally renders components twice** to surface side effects.
- Warns about deprecated APIs.
- Has **no effect on the production build**.

---

## 🔬 Component Breakdown

### `main.jsx` — Entry Point

Bootstraps React by finding the `<div id="root">` in `index.html` and mounting the `<App />` component tree into it using `createRoot`. This is the bridge between vanilla HTML and React.

---

### `App.jsx` — Root Component

The top-level component. Its only responsibility is **layout composition** — it imports and arranges `<Header>`, `<Menu>`, and `<Footer>` inside a `.container` div.

---

### `Components/Header.jsx` — Header

A purely presentational component. Renders the restaurant name inside a styled `<header>` element. Accepts no props — it always displays the same content.

---

### `Components/Menu.jsx` — Menu (Most Complex Component)

This is where most of the learning happens:

- Defines `pizzaData` — an **array of objects** (each pizza's data).
- Calculates `numPizzas` to decide whether to show the list or a "coming soon" message.
- Uses a **ternary operator** for conditional rendering.
- Uses **`.map()`** to render one `<Pizza>` per item in the array.
- Uses a **React Fragment** `<>...</>` to group the `<p>` and `<ul>` without a wrapper div.

> The commented-out code demonstrates the evolution from `&&` short-circuit to the ternary pattern, and the progression from hard-coded `<Pizza>` tags to dynamic `.map()` rendering.

---

### `Pizza.jsx` — Pizza Card (Presentational)

Receives a single `pizzaObj` prop and renders one pizza card. Demonstrates:

- **Prop destructuring** in the function signature.
- **Dynamic className** using a template literal with a ternary: adds `"sold-out"` CSS class when applicable.
- **Inline conditional rendering** — shows `"SOLD OUT"` text or the price based on `soldOut`.

---

### `Components/Footer.jsx` — Footer (Time-Aware)

Demonstrates using **plain JavaScript inside a component** before the return statement (not just in JSX). Calculates whether the restaurant is currently open by comparing the current hour against `openHour` and `closeHour`, then conditionally renders either `<Order>` or a "come back later" message.

---

### `Components/Order.jsx` — Order CTA

A simple presentational component that receives `openHour` and `closeHour` as props and renders the "order" call-to-action. Demonstrates how to **pass multiple props** and receive them via destructuring.

---

## ⚡ Key Rules & Gotchas

| #   | Rule / Gotcha                           | Detail                                                                                                                                               |
| --- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Capital letter for components**       | `<Pizza />` is a React component; `<pizza />` would be treated as an HTML element                                                                    |
| 2   | **Props are read-only**                 | Never mutate `props` inside a child component                                                                                                        |
| 3   | **`key` must be unique & stable**       | Don't use array index as key for dynamic lists                                                                                                       |
| 4   | **No `if/else` directly in JSX**        | JSX only accepts expressions that produce a value; use ternary or `&&`                                                                               |
| 5   | **`&&` with numbers**                   | `{0 && <Component />}` renders `0` on screen — use `{count > 0 && <Component />}`                                                                    |
| 6   | **`className`, not `class`**            | `class` is a reserved keyword in JavaScript                                                                                                          |
| 7   | **Destructuring prop names must match** | If you pass `pizzaObj={pizza}`, you must destructure `{ pizzaObj }`, not `{ pizza }`                                                                 |
| 8   | **StrictMode double-renders in dev**    | This is intentional — don't be surprised by double console logs                                                                                      |
| 9   | **One root element per JSX return**     | Wrap multiple siblings in a `<div>` or `<>` Fragment                                                                                                 |
| 10  | **`import React` not always needed**    | React 17+ supports the new JSX transform — `import React from 'react'` is only needed if you explicitly use `React.Fragment` or other `React.*` APIs |

---

## 💬 Concepts Illustrated by Comments in Code

The source files contain commented-out code that documents the learning journey. Here's a summary:

### `Menu.jsx` — Evolution of rendering

```jsx
// Stage 1: Hard-coded components (no dynamic data)
<Pizza name="Pizza Spinaci" ingredients="..." photoName="..." price={10} />
<Pizza name="Pizza Funghi" ingredients="..." price={12} photoName="..." />

// Stage 2: Short-circuit &&  (works but has the 0 gotcha)
{numPizzas > 0 && (
  <ul>...</ul>
)}

// Stage 3: Ternary operator (preferred — handles both branches cleanly)
{numPizzas > 0 ? (
  <>
    <p>Description...</p>
    <ul>{pizzas.map(...)}</ul>
  </>
) : (
  <p>Menu coming soon.</p>
)}
```

### `Footer.jsx` — Conditional rendering alternatives

```jsx
// Alternative 1: Early return (returns a completely different tree)
if (!isOpen) return <p>We're closed.</p>;
return <footer>...</footer>;

// Alternative 2: && short-circuit
{isOpen && <Order ... />}

// Alternative 3: Ternary (used in final code — cleanest for two outcomes)
{isOpen ? <Order ... /> : <p>We're closed.</p>}
```

### `Pizza.jsx` — Early return for sold-out items

```jsx
// Instead of rendering a grayed-out card, you could simply render nothing:
if (pizzaObj.soldOut) return null;
// The current code keeps the card but applies a CSS class for visual feedback
```

---

## 🛠 Tech Stack

| Tool        | Version      | Purpose              |
| ----------- | ------------ | -------------------- |
| React       | ^19.2.4      | UI library           |
| ReactDOM    | ^19.2.4      | DOM renderer         |
| Vite        | ^8.0.4       | Dev server & bundler |
| ESLint      | ^9.39.4      | Code linting         |
| Roboto Mono | Google Fonts | Typography           |

---

## 🎓 Learning Checklist

After studying this project, you should be able to:

- [ ] Create a functional React component and export it
- [ ] Import and use a component inside another component (composition)
- [ ] Pass data to a child component using props
- [ ] Destructure props in the function signature
- [ ] Render a list of components using `.map()`
- [ ] Provide a `key` prop when rendering lists
- [ ] Use a ternary operator for conditional rendering in JSX
- [ ] Use `&&` short-circuit for show/hide rendering
- [ ] Use an early `return` to bail out of rendering
- [ ] Use `<>...</>` React Fragments to avoid unnecessary DOM wrappers
- [ ] Understand what `<StrictMode>` does and why it double-renders
- [ ] Understand the flow: `index.html` → `main.jsx` → `App.jsx` → components

---

_Built while following [The Ultimate React Course](https://www.udemy.com/course/the-ultimate-react-course/) by Jonas Schmedtmann._
