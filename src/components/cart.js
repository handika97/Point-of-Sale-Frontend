import React from "react";
import Axios from "axios";
// import Plus from "../image/"
// import Minus from "../image/minus.jpg"
import "../styles/cart.css";
import "./Profile.js";
// import { connect } from "react-redux";
// import { getCart } from "../redux/actions/cart";

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      cart: [],
      qty: [],
      product_1: []
    };

    this.calculateTotal = this.calculateTotal.bind(this);
    this.finish = this.finish.bind(this);
    this.Qty = this.Qty.bind(this);
  }

  // getCart = async () => {
  //   await this.props.dispatch(getCart());
  //   this.setState({
  //     cart: this.props.cart.cartData
  //   });
  // };
  // getproduct = () => {
  //   //Axios.get("http://localhost:4002/api/v1/shop/").then(response => {
  //   this.setState({
  //     product_1: this.props.product
  //      });
  //   //});
  // };

  calculateTotal(price) {
    this.setState({
      total: this.state.total + price
    });
  }

  Qty = (qty, myId) => {
    console.log(qty, myId);
    if (this.state.qty.length === 0 || this.state.qty === null) {
      let id = { Id: myId, qty: 1 };
      let qtys = this.state.qty;
      qtys.push(id);
      this.setState({
        qty: qtys
      });
    } else {
      if (
        this.state.qty
          .map(function(obj) {
            return obj.Id;
          })
          .indexOf(myId) === -1
      ) {
        let id = { Id: myId, qty: 1 };
        this.setState({
          qty: [...this.state.qty, id]
        });
      } else {
        for (let i = 0; i < this.state.qty.length; i++) {
          if (myId === this.state.qty[i].Id) {
            if (qty < 1) {
              this.props.delete(myId);
              let newCart = this.state.qty.filter(qty => qty.Id !== myId);
              console.log(this.state.qty[i].Id);
              this.setState({
                qty: newCart
              });
            } else {
              console.log("yee");
              // eslint-disable-next-line react/no-direct-mutation-state
              this.state.qty[i].qty = qty;
            }
          } else {
            console.log("yeee");
          }
        }
      }
    }
    console.log(this.state.qty);
  };

  finish() {
    let user = localStorage.getItem("user");
    if (this.state.qty.length === 1) {
      Axios.post(`http://localhost:4002/api/v1/shop/${user}`, {
        id_item: this.state.qty[0].Id,
        qty: this.state.qty[0].qty
      }).then(function(response) {
        Axios.patch(`http://localhost:4002/api/v1/shop/`);
      });
      console.log(this.state.qty.length);
    } else {
      for (let i = 0; i < this.state.qty.length; i++) {
        Axios.post(`http://localhost:4002/api/v1/shop/${user}`, {
          id_item: this.state.qty[i].Id,
          qty: this.state.qty[i].qty
        }).then(function(response) {});
        Axios.patch(`http://localhost:4002/api/v1/shop/`);
      }
    }
    this.props.handleReset("y");
    this.setState({
      total: 0,
      qty: []
    });
    //console.log(this.state.qty)
  }
  cancel = () => {
    this.setState({
      total: 0,
      qty: []
    });
    this.props.handleReset("y");
  };
  componentDidMount() {
    // this.getproduct();
  }
  render() {
    let component = this;
    console.log(this.props.product);

    return (
      <div className="card-box">
        <div className="scroll">
          {this.props.product !== undefined
            ? this.props.product.map(function(product) {
                return (
                  <Product
                    name={product.name}
                    price={product.price}
                    Image={product.Image}
                    Id={product.id}
                    qty={product.qty}
                    handleQty={component.Qty}
                    handleTotal={component.calculateTotal}
                  />
                );
              })
            : null}
        </div>

        <Total total={this.state.total} />
        {this.props.product.length !== 0 ? (
          <button
            type="button"
            className="finish "
            data-toggle="modal"
            data-target="#checkout"
            data-whatever="@getbootstrap"
            onClick={this.finish}
          >
            Checkkout
          </button>
        ) : (
          <button
            type="button"
            className="finish "
            //data-toggle="modal"
            //data-target="#checkout"
            data-whatever="@getbootstrap"
            disabled
          >
            Checkkout
          </button>
        )}
        <button type="button" className="cencel" onClick={this.cancel}>
          Cancel
        </button>
        {/*------------------------------------------------------------- */}
        <div
          class="modal fade"
          id="checkout"
          tabindex="1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          {" "}
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Sukses
                </h5>
                {/* <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div className="title_checkout">Checkout</div>
              <div className="title_checkout">
                Chasier: {localStorage.getItem("user")}
              </div>
              {this.state.qty.length === this.props.product.length
                ? this.props.product.map((product, i) => (
                    <div className="produckCheckout">
                      {product.name} {this.state.qty[i].qty}x
                    </div>
                  ))
                : null} */}
              </div>
            </div>
          </div>
        </div>

        {/*------------------------------------------------------------------------------------ */}
      </div>
    );
  }
}

export default Cart;

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: 1
    };
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
  }

  add = () => {
    //let add=this.state.qty + 1
    this.setState({
      qty: this.state.qty + 1
    });

    //console.log(this.state.qty);
    this.props.handleTotal(parseInt(this.props.price));
  };

  subtract = () => {
    this.setState({
      qty: this.state.qty - 1
    });

    console.log(this.state.qty);
    if (this.state.qty >= 1) {
      this.props.handleTotal(parseInt(-this.props.price));
    }
  };
  componentDidMount() {
    this.props.handleQty(1, this.props.Id);
    this.props.handleTotal(parseInt(this.props.price));
  }

  render() {
    let price = this.props.price * this.state.qty;

    return (
      <div>
        <img className="img_cart" src={this.props.Image} alt="" />
        <p className="name_cart">{this.props.name}</p>
        <div className="qtyqty">
          <div
            className="plus_Button"
            onClick={() => {
              this.subtract();
              this.props.handleQty(this.state.qty, this.props.Id);
            }}
            //disabled={this.state.qty <= 1}
          >
            <p className="text-cart">-</p>
            {}
          </div>
          <div className="qty_cart">
            <p className="text-cart">{this.state.qty}</p>
          </div>
          <div className="minus_Button" onClick={this.add}>
            {this.props.handleQty(this.state.qty, this.props.Id)}

            <p className="text-cart">+</p>
            {}
          </div>
          <p className="price_cart">Rp.{price}</p>
        </div>
      </div>
    );
  }
}

class Total extends React.Component {
  render() {
    let total = this.props.total;
    // let tax = (this.props.total * 0.1).toFixed(2);
    // let totalIncTax = (+total + +tax).toFixed(2);

    return (
      <div className="total">
        <h3 className="row">
          <span className="col-6">Total:</span>
          <span className="col-6 total_price">Rp.{total}</span>
          <p className=" ppn">Belum termasuk ppn 10%</p>
        </h3>
      </div>
    );
  }
}

// class FinishThis extends React.Component {
//   // eslint-disable-next-line no-useless-constructor
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <button type="input" className="finish" onClick={this.props.check}>
//         finish
//       </button>
//     );
//   }
// }
