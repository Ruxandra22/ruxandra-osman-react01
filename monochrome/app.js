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
      dispatchEvent(
        new CustomEvent('product:wishList', {
          detail: this.props.productId,
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
      dispatchEvent(
        new CustomEvent('cart:add', {
          detail: this.props.productId,
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
      <AddToCart productId={productId}/>,
      <AddToWishList productId={productId}/>
    ]
  }
}

const productAddToCartButton = document.querySelectorAll('.product-tile-controls');
productAddToCartButton.forEach((productTileControl, index) => {
  ReactDOM.render(
    <ProductControls productId={index}/>,
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
