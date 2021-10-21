import Products from "./Products";
import Product from "./Product";
import SearchResults from "./SearchResults";
import Cart from "./Cart";
import Checkout from "./Checkout";

const componentMap = {
  home: Products,
  productPage: Product,
  searchResults: SearchResults,
  cart: Cart,
  checkout: Checkout,
};


export const Screen = ({ screen = 'home'}) => {
  if (!screen || typeof componentMap[screen] === 'undefined') {
    return <componentMap.home/>
  }
  const CurrentComponent = componentMap[screen];

  return <CurrentComponent/>
};

export default Screen;