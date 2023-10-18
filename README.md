# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Reacr Router

- install >> npm install react-router-dom
- to use router
  ```js
  import { BrowserRouter, Route, Routes } from "react-router-dom";
  import Product from "./pages/Product.jsx";
  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="product" element={<Product />} />
        </Routes>
      </BrowserRouter>
    );
  }
  ```
- when we navigtate using the anchor tag, the page will refresh and the state will be lost. To avoid this we use Link tag
  ```js
  import { Link } from "react-router-dom";
  <Link to="product">Product</Link>;
  <NavLink to="product">Product</NavLink>;
  ```
- the difference between Link and NavLink is that NavLink give a class active to the current page

## scope CSS (CSS Module)

- to use global styling , first make a css file and add it in the src folder and import it in main.jsx

- naming the css file by name.module.css
- import the css file
  ```js
  import styles from "./Product.module.css";
  ```
- in the css file, we can use the class name as object
  ```css
  .product {
    background-color: red;
  }
  ```
- use the class name as object
  ```js
  <div className={styles.product}>
    <h1>Product</h1>
  </div>
  ```
  - we can global a class inside css module by using :global
    ```css
    :global(.product) {
      background-color: red;
    }
    ```
- in router when U wnat to use the active class, we can use the active class name as object
  ```js
  <NavLink to="product" className={styles.active}>
    Product
  </NavLink>
  ```
  in module css file to select the active class
  ```css
  :global(.active) {
    background-color: red;
  }
  ```

### Dynamic Routing

- to use dynamic routing, we need to use the colon in the path
  ```js
  <Route path="product/:id" element={<Product />} />
  ```
- to get the id from the url, we use useParams hook
  ```js
  import { useParams } from "react-router-dom";
  function Product() {
    const { id } = useParams();
    return (
      <div>
        <h1>Product {id}</h1>
      </div>
    );
  }
  ```

### Query String

- to use query string, we need to use the question mark in the path
  ```js
  <Route path="product" element={<Product />} />
  ```
- to get the query string from the url, we use useSearchParams hook

  ```js
  import { useSearchParams } from "react-router-dom";
  function Product() {
    const [searchParams, setSearchParams] = useSearchParams();
    setSearchParams({ lat: 1, lng: 2 });
    return (
      <div>
        <h1>
          Product
          {searchParams.get("id")}
        </h1>
      </div>
    );
  }
  ```

- the power of storing data in URL is that we can share the URL with others and they can see the same data

### navigate to a page

- to navigate to a page, we use useNavigate hook

```js
import { useNavigate } from "react-router-dom";
function Product() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Product</h1>
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
}
```

- to navigate back to the previous page

```js
import { useNavigate } from "react-router-dom";

navigate(-1);
// -1 means go back one page
// +1 means go forward one page
```

```

```

### install the Map

- > > npm install react-leaflet leaflet

- documentation: https://react-leaflet.js.org/docs/start-installation
