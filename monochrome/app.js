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
    return (
      <a
        className={`product-control ${
          this.state.added === true ? 'active' : ''
        } ${this.state.busy === true ? 'busy' : ''}`}
        onClick={this.onClick}
      >
        <i className={this.state.added ? 'fas fa-heart wishListIcon' : 'far fa-heart wishListIcon'}/>
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
    return (
      <a
        className={`product-control ${
          this.state.added === true ? 'active' : ''
        } ${this.state.busy === true ? 'busy' : ''}`}
        onClick={this.onClick}
      >
        <i className="far fa-plus-square addIcon"/>
        <i className="fas fa-spinner icon"/>
      </a>
    )
  }
}

class ProductControls extends React.Component {

  render() {
    const productId = this.props.productId;

    return (
      <div>
        <AddToCart productId={productId}/>
        <AddToWishList productId={productId}/>
      </div>
    )
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

}
