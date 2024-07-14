import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import CartContextProvider from "./store/shopping-cart-context.jsx";

function App() {
  return (
    <CartContextProvider>
      <Header/>
      <Shop/>
    </CartContextProvider>
  );
} //adding provider means these can can be used by children of CarContext

export default App;
