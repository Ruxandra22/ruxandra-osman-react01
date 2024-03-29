import Products from "./Products";
import Product from "./Product";
import SearchResults from "./SearchResults";
import Cart from "./Cart";
import Checkout from "./Checkout";
import PageNotFound from "./PageNotFound";
import OrderConfirmation from "./OrderConfirmation";

const componentMap = {
  home: Products,
  productPage: Product,
  searchResults: SearchResults,
  cart: Cart,
  checkout: Checkout,
  pageNotFound: PageNotFound,
  orderConfirmation: OrderConfirmation,
};


export const Screen = ({ screen = 'home'}) => {
  if (!screen || typeof componentMap[screen] === 'undefined') {
    return <componentMap.pageNotFound/>
  }
  const CurrentComponent = componentMap[screen];

  return <CurrentComponent/>
};

export default Screen;
