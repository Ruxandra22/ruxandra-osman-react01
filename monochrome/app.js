const ADD_TO_CART_EVENT = 'cart:add';
const REMOVE_FROM_CART_EVENT = 'cart:remove';
const ADD_TO_WISHLIST_EVENT = 'wl:add';
const REMOVE_FROM_WISHLIST_EVENT= 'wl:remove'

class AddToWishList extends React.Component {

  state = {
    added: false,
    busy: false,
  };

  onClick = () => {
    if (this.state.busy === true) {
      return;
    }

    this.setState({
      busy: true,
    });

    setTimeout(() => {
      const { productId } = this.props;
      dispatchEvent(
        new CustomEvent(this.state.added ? REMOVE_FROM_WISHLIST_EVENT : ADD_TO_WISHLIST_EVENT,
          {
            detail: {
             productId,
            },
          }),
        );

      this.setState({
        busy: false,
        added: !this.state.added,
      })
    }, 1000);
  }

  render() {
    const {added, busy} = this.state;

    return (
      <a
        className={`product-control ${
          added === true ? 'active' : ''
        } ${busy === true ? 'busy' : ''}`}
        onClick={this.onClick}
      >
        {!busy ? (
          <span>
          <i className={added ? 'fas fa-heart' : 'far fa-heart'}/>
        </span>
        ) : null}
        <i className="fas fa-spinner icon"/>
      </a>
    )
  }
}

class AddToCart extends React.Component {

  state = {
    added: false,
    busy: false,
  };

  onClick = () => {

    if (this.state.busy === true) {
      return;
    }

    this.setState({
      busy: true,
    });

    setTimeout(() => {
      const { productId } = this.props;
      const { added } = this.state;
      dispatchEvent(
        new CustomEvent(added ? REMOVE_FROM_CART_EVENT : ADD_TO_CART_EVENT,
          {
            detail: {
              productId,
            },
          }),
      );

      this.setState({
        busy: false,
        added: !this.state.added
      });
    }, 1000);
  }

  render() {
    const {added, busy} = this.state;

    return (
      <a
        className={`product-control ${
          added === true ? 'active' : ''
        } ${busy === true ? 'busy' : ''}`}
        onClick={this.onClick}
      >
        {!busy ? (
          <span>
          <i className={added ? 'fas fa-plus-square' : 'far fa-plus-square'}/>
        </span>
        ): null}

        <i className="fas fa-spinner icon"/>
      </a>
    )
  }
}

class ProductControls extends React.Component {

  render() {
    const productId = this.props.productId;

    return [
      <AddToCart key="321" productId={productId}/>,
      <AddToWishList key="123" productId={productId}/>
    ]
  }
}

const productAddToCartButton = document.querySelectorAll('.product-tile-controls');
productAddToCartButton.forEach((productTileControl, index) => {
  ReactDOM.render(
    <ProductControls key={index} productId={index}/>,
    productTileControl,
  )
})

class Newsletter extends React.Component {

  state = {
    email: '',
    errorMessage: '',
    busy: false,
    submitted: false,
    submittedEmail: '',
  };

  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onSubmit = (event) => {
    event.preventDefault();

    const email = this.state.email;

    if (!this.validateEmail(email)) {
      this.setState({
        errorMessage: 'Please use a valid email',
      });
      return;
    }

    this.setState({
      busy: true,
    });

    setTimeout(() => {
      this.setState({
        busy: false,
        email: '',
        submittedEmail: email,
        submitted: true,
      });
    }, 3000);
  }

  onInputChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  }


  render() {

    const {email, submitted, submittedEmail, errorMessage, busy} = this.state;

    return (
      <div>
        {submitted ? (
          <div>
            Hello {submittedEmail}, thank you for subscribing to our newsletter!
          </div>
        ): (
          <form onSubmit={this.onSubmit}>
            <label htmlFor="email-newsletter">Sign up for our newsletter</label>
            <div>
              <input
                type="text"
                name="email"
                id="email-newsletter"
                value={email}
                onChange={this.onInputChange}
              />
              {errorMessage.length > 0 ? (
                <div>{errorMessage}</div>
              ): null}
            </div>
            <button
              type="submit"
              title="Submit"
              disabled={busy}
              className={`${busy ? 'busy' : ''}`}
            >
              {busy ? (
                <i className="fas fa-spinner icon"/>
              ): ('Submit')}
            </button>
          </form>
        )}
      </div>

    )
  }
}

const newsletterContainer = document.querySelector('.footer-sign-up-newsletter');
ReactDOM.render(<Newsletter/>, newsletterContainer);

class HeaderControls extends React.Component {

  state = {
    cartItemsCount: 0,
    wishlistItemsCount: 0,
    cartItems: [],
    wishlistItems: [],
  }

  componentDidMount() {
    addEventListener(ADD_TO_WISHLIST_EVENT, this.wishlistAction);
    addEventListener(REMOVE_FROM_WISHLIST_EVENT, this.wishlistAction);

    addEventListener(ADD_TO_CART_EVENT, this.cartAction);
    addEventListener(REMOVE_FROM_CART_EVENT, this.cartAction);
  }

  wishlistAction = (event) => {
    const { productId } = event.detail;
    const { type: eventType } = event;
    const { wishlistItems } = this.state;

    let newProductIds = [];
    let productCount = 0;

    switch(eventType) {
      case ADD_TO_WISHLIST_EVENT:
        newProductIds = wishlistItems.length === 0
          ? [productId]
          : [...wishlistItems, productId];
        break;
      case REMOVE_FROM_WISHLIST_EVENT:
        newProductIds = wishlistItems.filter((item) => {
          return item !== productId;
        })
        break;
    }

    productCount = newProductIds.length;

    this.setState({
      wishlistItemsCount: productCount,
      wishlistItems: newProductIds,
    })
  }

  cartAction = (event) => {
    const { productId } = event.detail;
    const { type: eventType } = event;
    const { cartItems } = this.state;

    let newCartItems = [];
    let cartItemsCount = 0;

    switch (eventType) {
      case ADD_TO_CART_EVENT:
        newCartItems = cartItems.length === 0
          ? [productId]
          : [...cartItems, productId];
        break;
      case REMOVE_FROM_CART_EVENT:
        newCartItems = cartItems.filter((item) => {
          return item !== productId;
        })
        break;
    }

    cartItemsCount = newCartItems.length;

    this.setState({
      cartItemsCount,
      cartItems: newCartItems,
    })
  }

  showProducts(collectionName, displayName) {
    let message = '';
    const name = displayName.toLowerCase();
    const productCount = this.state[collectionName];

    if (productCount < 1) {
      message = `There are no products in your ${name}`;
    } else {
      message = `There are ${productCount} products in your ${name}: ${this.state[`${name}Items`]}`;
    }

    alert(message);
  }

  render() {
    const { wishlistItemsCount, cartItemsCount } = this.state;
    return (
      <ul>
        <li>
          <a
            title="My Account"
          >
            <i className="fas fa-user"/>
          </a>
        </li>

        <li className="header-control">
          <a
            title="Saved Items"
          >
            <span className="qty">
              {wishlistItemsCount}
            </span>
            <i
              className="far fa-heart"
              onClick={() => {
                this.showProducts('wishlistItemsCount', 'Wishlist');
              }}
            />
          </a>
        </li>

        <li className="header-control">
          <a title="Cart">
            <span className="qty">
              {cartItemsCount}
            </span>
            <i
              className="fas fa-shopping-bag"
              onClick={() => {
                this.showProducts('cartItemsCount', 'Cart');
              }}
            />
          </a>
        </li>
      </ul>
    )
  }
}

const headerControls = document.querySelector('.header-controls');
ReactDOM.render(<HeaderControls/>, headerControls);
