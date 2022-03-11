import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products"
import ProductView from "./pages/ProductView";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import GetSlug from "./components/GetSlug";

import ToggleMode from "./components/ToggleMode";

import './sass/index.scss';

const cartFromLocalStoreage = JSON.parse(localStorage.getItem('cartItems'))

function App() {
  return (
    // sửa lỗi không hiển thị ảnh
    // Thêm page contact
    // sửa route
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/products' element={<Products />} ></Route>
        <Route path='/products/:slug' element={<GetSlug />} ></Route>
        <Route path='/contact' element={<Contact />} ></Route>
        <Route path='/cart' element={<Cart />} ></Route>
      </Routes>
      <ToggleMode />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
