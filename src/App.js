import Product from "./components/Products";
import MainNav from "./components/MainNav";
import {Route, Routes} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import CreateProductForm from "./components/CreateProductForm";
import EditProductForm from "./components/EditProductForm";
import Cart from "./components/Cart";
import FooterComp from "./components/FooterComp";
import OrderHistory from "./components/OrderHistory";

const App = () => {
  return(
      <div>
          <header>
              <MainNav />
          </header>
          <main>
              <Routes>
                  <Route path="/" element={<LoginForm />} />
                  <Route path="/registration" element={<RegistrationForm />} />
                  <Route path="/main" element={<Product />} />
                  <Route path="/addItem" element={<CreateProductForm />} />
                  <Route path="/editItem" element={<EditProductForm />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/history" element={<OrderHistory />} />
              </Routes>
          </main>
          <footer>
              <FooterComp />
          </footer>
      </div>
)
}

export default App;