import React, { Fragment } from "react";
// import Axios from "axios";
import "../styles/Profile.css";
import Cart from "./cart.js";
// import { Link } from "react-router-dom";
import { pageProduct } from "../redux/actions/product";
import { connect } from "react-redux";
// import { postCart } from "../redux/actions/cart";
// let URL_STRING = "http://localhost:4002/api/v1/product/";
class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      id_item: "",
      quantity: "",
      no_buyer: "1",
      cart: [],
      page: 1
    };
    this.addcart = this.addcart.bind(this);
  }

  // getProduct = async () => {
  //   await this.props.dispatch(getProduct());
  //   this.setState({
  //     product: this.props.product.productData
  //   });
  // };
  pageProductNext = async page => {
    // let page = this.state.page;
    if (page === undefined) {
      page = 1;
    }
    console.log(page);
    await this.props.dispatch(pageProduct(page));
    this.setState({
      product: this.props.product.productData
    });
    this.setState({ page: page });
  };
  pageProductPrev = async page => {
    // let page = this.state.page;
    if (page === undefined) {
      page = 1;
    }
    console.log(page);
    await this.props.dispatch(pageProduct(page));
    this.setState({
      product: this.props.product.productData
    });
    this.setState({ page: page });
  };

  // addcart() {
  //   console.log(this.state.id,)
  //       Axios.post(`http://localhost:4002/api/v1/shop/1`,{
  //         id_item:this.state.id,
  //          qty:0,
  //       })
  //         .then(function (response) {

  //           console.log(this.state.id)
  //         })
  //     }
  // postCart = product => {
  //   // let fde = new FormData();
  //   // fde.set("id_item", this.state.id_item);
  //   // fde.set("qty", this.state.qty);
  //   // console.log(fde);

  //   if (this.state.cart.length === 0 || this.state.cart === null) {
  //     let cart = {
  //       id: product.id,
  //       name: product.nama,
  //       Image: product.Image,
  //       qty: product.stock,
  //       price: product.price
  //     };
  //     var carts = this.state.cart;
  //     carts.push(cart);
  //     this.setState({
  //       cart: carts
  //     });
  //     this.props.dispatch(postCart(product));
  //     console.log("yee");
  //   } else {
  //     if (
  //       this.state.cart
  //         .map(function(obj) {
  //           return obj.name;
  //         })
  //         .indexOf(product.nama) === -1
  //     ) {
  //       let items = {
  //         id: product.id,
  //         name: product.nama,
  //         Image: product.Image,
  //         qty: product.stock,
  //         price: product.price
  //       };
  //       this.setState({
  //         cart: [...this.state.cart, items]
  //       });

  //       this.props.dispatch(postCart(product));
  //     } else {
  //       for (let i = 0; i < this.state.cart.length; i++) {
  //         if (product.nama === this.state.cart[i].nama) {
  //         }
  //       }
  //     }
  //   }
  // };
  addcart = product => {
    if (this.state.cart.length === 0 || this.state.cart === null) {
      let cart = {
        id: product.id,
        name: product.nama,
        Image: product.Image,
        qty: product.stock,
        price: product.price
      };
      var carts = this.state.cart;
      carts.push(cart);
      this.setState({
        cart: carts
      });
      console.log("yee");
    } else {
      if (
        this.state.cart
          .map(function(obj) {
            return obj.name;
          })
          .indexOf(product.nama) === -1
      ) {
        let items = {
          id: product.id,
          name: product.nama,
          Image: product.Image,
          qty: product.stock,
          price: product.price
        };
        this.setState({
          cart: [...this.state.cart, items]
        });
        console.log(this.state.cart);
        console.log("ye");
      } else {
        for (let i = 0; i < this.state.cart.length; i++) {
          if (product.nama === this.state.cart[i].nama) {
            return false;
          }
        }
        console.log("y");
      }
    }
    console.log(this.state.cart);
  };

  delete = id => {
    console.log(id);
    let newCart = this.state.cart.filter(cart => cart.id !== id);
    this.setState({
      cart: newCart
    });
    // let newCart = this.state.cart.filter(cart => cart.id !== id);
    // console.log(newCart);
    // this.setState({
    //   cart: newCart
    // });
  };

  reset = y => {
    console.log(this.state.cart);
    this.setState({
      cart: []
    });
    console.log(this.state.cart);
  };

  componentDidMount() {
    this.pageProductNext();
    this.pageProductPrev();
    //if (!localStorage.getItem("status")) {
    //   if (window.location.href === "http://localhost:3000/home/product") {
    //     return true;
    //   } else {
    //     window.location.href = "http://localhost:3000/home/product";
    //     console.log("berhasil");
    //   }
    // } else {
    //   console.log("gagal");
    //   window.location.href = "http://localhost:3000/login";
    // }
  }
  componentDidUpdate() {
    //this.addcart();
  }

  render() {
    return (
      <Fragment>
        <div>
          {/* <Cart data={this.state.data}/> */}
          <div className="container-item">
            {this.state.product.map(product => {
              return (
                <div>
                  <div className="item">
                    <input
                      type="image"
                      alt=""
                      className="img"
                      src={product.Image}
                      onClick={() => this.addcart(product)}
                    />
                    <div className="box-title">
                      {/* <input
                      type="image"
                      alt=""
                      className="add_1"
                      src="https://westwooddigitalmarketing.com/wp-content/uploads/2013/04/517f8532e771cc40edabf236946d4be7d84a9_640.jpg"
                      //data-toggle="modal" data-target="#addcart" onClick={() => this.setState({ id: product.id })}></input>
                      data-toggle="modal"
                      data-target="#addcart"
                      onClick={() => this.addcart(product)}
                    ></input> */}
                      <p className="title">{product.nama}</p>
                      <p className="price">Rp.{product.price}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {
              <Cart
                product={this.state.cart}
                handleReset={this.reset}
                delete={this.delete}
              />
            }
          </div>
          {this.state.page > 1 ? (
            <button
              type="input"
              onClick={() => this.pageProductPrev(this.state.page - 1)}
            >
              PREV
            </button>
          ) : (
            <button type="input" hidden>
              PREV
            </button>
          )}
          {this.state.product.length > 5 ? (
            <button
              type="input"
              onClick={() => this.pageProductNext(this.state.page + 1)}
            >
              NEXT
            </button>
          ) : (
            <button type="input" hidden>
              NEXT
            </button>
          )}
        </div>

        {/*--------------------------------------------------------------------------------------------------------*/}
        {/* <div
          class="modal fade"
          id="addcart"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group ">
                    <label class="col-form-label">Add This Product</label>
                  </div>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    onClick={this.addcart}
                  >
                    Add Card
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div> */}
        {/* /*-------------------------------------------------------------------------------------------------------------------------------------*/}
      </Fragment>
    );
  }
}
const mapStateToProps = ({ product }) => {
  return {
    product
  };
};

export default connect(mapStateToProps)(Product);
