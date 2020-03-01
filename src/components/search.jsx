import React, { Fragment } from "react";
import "../styles/search.css";
// import Axios from "axios";
import { connect } from "react-redux";
//import Axios from "axios"
// let URL_STRING = "http://localhost:4002/api/v1/product/";
import {
  getProduct,
  postProduct,
  deleteProduct,
  updateProduct,
  searchProduct
} from "../redux/actions/product";
import {
  getCategory,
  postCategory,
  deleteCategory,
  updateCategory
} from "../redux/actions/category";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      categoryData: [],
      nama: "",
      description: "",
      price: "",
      stock: "",
      id_category: "",
      id: "",
      category: "",
      name_category: "",
      Image: "",
      keyword: "",
      sort: "asc",
      errors: {
        nama: "",
        description: "",
        price: "",
        stock: ""
      },
      edit_category: ""
    };

    this.onChangeValue = this.onChangeValue.bind(this);
    // this.onSubmitButton = this.onSubmitButton.bind(this);
    this.onChangeValueU = this.onChangeValueU.bind(this);
    // this.onSubmitButtonU = this.onSubmitButtonU.bind(this);
    this.delete = this.delete.bind(this);
    this.onChangeUpload = this.onChangeUpload.bind(this);
    this.onChangeUploadU = this.onChangeUploadU.bind(this);
  }
  onChangeUpload = e => {
    console.log(e.target.files[0]);
    this.setState({
      [e.target.name]: e.target.files[0]
    });
  };
  onChangeUploadU = ev => {
    console.log(ev.target.files[0]);
    this.setState({
      [ev.target.name]: ev.target.files[0]
    });
  };
  // getproduct = () => {
  //   Axios.get('http://localhost:4002/api/v1/product/').then(response => {
  //     this.setState({
  //       product_1: response.data
  //     });
  //   });
  // };

  getProduct = async () => {
    if (this.state.keyword.length === 0) {
      await this.props.dispatch(getProduct());
      this.setState({
        product: this.props.product.productData
      });
    } else {
      await this.props.dispatch(searchProduct(this.state.keyword));
      this.setState({
        product: this.props.product.productData
      });
    }
    this.setState({
      keyword: ""
    });
    console.log(this.state.keyword);
  };

  getCategory = async () => {
    await this.props.dispatch(getCategory());
    this.setState({
      categoryData: this.props.category.categoryData
    });
  };

  onChangeValue = e => {
    // e.preventDefault();
    let numberRegex = RegExp(/[0-9]/i);
    let { name, value } = e.target; // { ...this.state.loginUser };
    // usernew[e.target.name] = e.target.value;
    let errors = this.state.errors;
    // product: [],
    //   nama: "",
    //   description: "",
    //   price: "",
    //   stock: "",
    //   id_category: "",
    switch (name) {
      case "nama":
        errors.nama = value.length < 1 ? "Name of product don't empty!" : "";
        break;
      case "description":
        errors.description =
          value.length < 1 ? "Description of product don't empty!" : "";

        break;
      case "price":
        errors.price = numberRegex.test(value) ? "" : "only number!";

        break;
      case "stock":
        errors.stock = numberRegex.test(value) ? "" : "only number!";

        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  };
  // onChangeValue = e => {
  //   console.log(e.target.value);
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // };
  postProduct = e => {
    //e.preventDefault();
    let fde = new FormData();
    fde.set("nama", this.state.nama);
    fde.set("description", this.state.description);
    fde.set("stock", this.state.stock);
    fde.set("price", this.state.price);
    fde.append("Image", this.state.Image, this.state.Image.name);
    fde.set("id_category", this.state.id_category);
    this.props.dispatch(postProduct(fde));
    // setTimeout(() => {
    //   this.getProduct();
    // }, 100);
  };
  postCategory = e => {
    // e.preventDefault();
    const data = this.state.name_category;
    this.props.dispatch(postCategory(data));
  };

  delete = () => {
    let id = this.state.id;
    this.props.dispatch(deleteProduct(id));

    setTimeout(() => {
      this.getProduct();
    }, 100);
  };
  deleteCategory = id => {
    this.props.dispatch(deleteCategory(id));
    this.getCategory();
  };

  onChangeValueU(ev) {
    console.log(this.state.edit_category);
    let newForm = [...ev.target.name];
    newForm = ev.target.value;
    this.setState({
      [ev.target.name]: newForm
    });
  }

  updateProduct = ev => {
    let fd = new FormData();
    let id = this.state.id;
    fd.set("nama", this.state.nama);
    fd.set("description", this.state.description);
    fd.set("stock", this.state.stock);
    fd.set("price", this.state.price);
    fd.append("Image", this.state.Image, this.state.Image.name);
    fd.set("id_category", this.state.id_category);
    this.props.dispatch(updateProduct(fd, id));
  };

  updateCategory = id => {
    console.log(id);
    let fd = this.state.edit_category;
    this.props.dispatch(updateCategory(fd, id));
    this.setState({ edit_category: "" });

    this.getCategory();
  };

  componentDidMount() {
    // this.getproduct();
    this.getProduct();
    this.getCategory();
    //setTimeout(this.getCategory(), 2000);

    // if (!localStorage.getItem("status")) {
    //   console.log("gagal");
    //   window.location.href = "http://localhost:3000/login";
    // }
  }

  render() {
    console.log(this.state.nama);
    console.log(this.state.description);
    const validateForm = errors => {
      let valid = true;
      Object.values(errors).forEach(val => val.length > 0 && (valid = false));
      return valid;
    };

    // let keyword = this.state.product.filter(
    //   product =>
    //     product.nama.toLowerCase().indexOf(this.state.keyword.toLowerCase()) >=
    //     0
    // );
    //   let onsort=keyword.nama.sort((a,b)=>{const isReversed=(this.state.sortType==='asc')?1:-1;
    // return isReversed=a.name.localeCompare(b.name)});
    return (
      <Fragment>
        <div className="search">
          <input
            type="text"
            class="form-control"
            name="keyword"
            // value={this.state.keyword}
            onChange={this.onChangeValue}
            placeholder="keyword"
            // onKeyPress={event => {
            //   if (event.key === "Enter") {
            //     this.getProduct();
            //   }
            // }}
            onKeyUp={() => this.getProduct()}
          />
          {/* <button
            type="button"
            className="btn btn-primary button_search"
            onClick={this.getProduct}
          >
            search
          </button> */}

          {/* <button className="button" name="sortType" onClick={() => this.setState({ sortType: "asc" })}/>
<button className="button" name="sortType" oonClick={() => this.setState({ sortType: "desc"})}/> */}
        </div>
        <div className="modaladd">
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#add"
            data-whatever="@getbootstrap"
          >
            Add Product
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#category"
            data-whatever="@getbootstrap"
          >
            Add Category
          </button>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Desc</th>
                    <th scope="col">Price</th>
                    <th scope="col">Stock</th>
                    <th scope="col">ID Category Product</th>
                    <th scope="col">Image</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.product.map((product, i) => {
                    return (
                      <tr>
                        <td>{i + 1}</td>
                        <td>{product.nama}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td>{product.id_category}</td>
                        <td>
                          <img src={product.Image} alt="" width="50px"></img>
                        </td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-toggle="modal"
                            data-target="#edit"
                            onClick={() =>
                              this.setState({
                                id: product.id,
                                nama: product.nama,
                                description: product.description,
                                price: product.price,
                                stock: product.stock,
                                id_category: product.id_category
                              })
                            }
                          >
                            EDIT
                          </button>
                          |
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-toggle="modal"
                            data-target="#delete "
                            onClick={() => this.setState({ id: product.id })}
                          >
                            DELETE
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {
          <div>
            {/*---------------------------------------------------------------------------------------*/}

            <div
              class="modal fade"
              id="add"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Add Product
                    </h5>
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
                      <div class="form-group">
                        <label class="col-form-label">Nama Product</label>
                        <input
                          type="text"
                          class="form-control"
                          name="nama"
                          // value={this.state.nama}
                          onChange={this.onChangeValue}
                          noValidate
                        ></input>
                        {this.state.errors.nama.length > 0 && (
                          <span className="error">
                            {this.state.errors.nama}
                          </span>
                        )}
                      </div>
                      <div class="form-group">
                        <label class="col-form-label">description</label>
                        <input
                          type="text"
                          class="form-control"
                          name="description"
                          // value={this.state.description}
                          onChange={this.onChangeValue}
                          noValidate
                        ></input>
                        {this.state.errors.description.length > 0 && (
                          <span className="error">
                            {this.state.errors.description}
                          </span>
                        )}
                      </div>
                      <div class="form-group">
                        <label for="price" class="col-form-label">
                          price
                        </label>
                        <input
                          type="number"
                          min="0"
                          class="form-control"
                          name="price"
                          // value={this.state.price}
                          onChange={this.onChangeValue}
                          noValidate
                        ></input>
                        {this.state.errors.price.length > 0 && (
                          <span className="error">
                            {this.state.errors.price}
                          </span>
                        )}
                      </div>
                      <div class="form-group">
                        <label class="col-form-label">stock</label>
                        <input
                          type="number"
                          min="0"
                          class="form-control"
                          name="stock"
                          // value={this.state.stock}
                          onChange={this.onChangeValue}
                          noValidate
                        ></input>
                        {this.state.errors.stock.length > 0 && (
                          <span className="error">
                            {this.state.errors.stock}
                          </span>
                        )}
                      </div>
                      <div class="form-group">
                        <label class="col-form-label">Image</label>
                        <input
                          type="file"
                          label="File"
                          accept=".jpg,.gif,.jpeg,.png,.mp4,.m4v,.mov"
                          class="form-control"
                          name="Image"
                          onChange={this.onChangeUpload}
                        ></input>
                      </div>
                      <div class="form-group ">
                        <label class="col-form-label">id category</label>
                        <select
                          class="custom-select mr-sm-2"
                          id="inlineFormCustomSelect"
                          Name="id_category"
                          // value={this.state.id_category}
                          onChange={this.onChangeValue}
                        >
                          <option selected>Choose...</option>
                          {this.state.categoryData === undefined ||
                          this.state.categoryData === null ||
                          this.state.categoryData.length === 0 ? (
                            <option value="0">null</option>
                          ) : (
                            this.state.categoryData.map((category, i) => {
                              return (
                                <option value={i + 1}>
                                  {category.name_category}
                                </option>
                              );
                            })
                          )}
                        </select>
                      </div>
                      {validateForm(this.state.errors) &&
                      this.state.nama.length > 0 &&
                      this.state.description.length > 0 &&
                      this.state.price.length > 0 &&
                      this.state.stock.length > 0 ? (
                        //this.state.Image.name.length > 0 &&
                        //this.state.id_category.length > 0
                        <button
                          type="submit"
                          class="btn btn-primary"
                          onClick={this.postProduct}
                        >
                          Submit
                        </button>
                      ) : (
                        <button type="submit" class="btn btn-primary" disabled>
                          Submit
                        </button>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* /*-------------------------------------------------------------------------------------------------------------------------------------*/}

            <div
              class="modal fade"
              id="edit"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      EDIT
                    </h5>
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
                      <div class="form-group">
                        {/* <label for="name" class="col-form-label">No Yang di Edit:</label> */}
                        {/* <input type="text" class="form-control" name="id" value={this.state.id} onChange={this.onChangeValueU} required/> */}
                      </div>
                      <div class="form-group">
                        <label for="name" class="col-form-label">
                          Nama:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="nama"
                          id="nama"
                          value={this.state.nama}
                          onChange={this.onChangeValueU}
                        />
                      </div>
                      <div class="form-group">
                        <label for="price" class="col-form-label">
                          description:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="description"
                          id="description"
                          value={this.state.description}
                          onChange={this.onChangeValueU}
                        />
                      </div>
                      <div class="form-group">
                        <label for="Category" class="col-form-label">
                          price:
                        </label>
                        <input
                          type="number"
                          min="0"
                          class="form-control"
                          name="price"
                          id="price"
                          value={this.state.price}
                          onChange={this.onChangeValueU}
                        />
                      </div>
                      <div class="form-group">
                        <label for="Cashier" class="col-form-label">
                          stock:
                        </label>
                        <input
                          type="number"
                          min="0"
                          class="form-control"
                          name="stock"
                          id="stock"
                          value={this.state.stock}
                          onChange={this.onChangeValueU}
                        />
                      </div>
                      <div class="form-group">
                        <label class="col-form-label">Image</label>
                        <input
                          type="file"
                          label="File"
                          accept=".jpg,.gif,.jpeg,.png,.mp4,.m4v,.mov"
                          class="form-control"
                          name="Image"
                          onChange={this.onChangeUploadU}
                        ></input>
                      </div>
                      <div class="form-group">
                        <label class="col-form-label">id category</label>
                        <select
                          class="custom-select mr-sm-2"
                          id="inlineFormCustomSelect"
                          Name="id_category"
                          value={this.state.id_category}
                          onChange={this.onChangeValueU}
                        >
                          <option selected>Choose...</option>
                          {this.state.categoryData === undefined ||
                          this.state.categoryData === null ||
                          this.state.categoryData.length === 0 ? (
                            <option value="0">null</option>
                          ) : (
                            this.state.categoryData.map((category, i) => {
                              return (
                                <option value={i + 1}>
                                  {category.name_category}
                                </option>
                              );
                            })
                          )}
                        </select>
                      </div>
                      <div class="modal-footer" />
                      <button
                        type="submit"
                        name="Updatedata"
                        class="btn btn-primary"
                        onClick={this.updateProduct}
                      >
                        Update Data
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/*---------------------------------------------------------------------------------------------*/}
            <div
              class="modal fade"
              id="delete"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Delete this
                    </h5>
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
                    <button
                      type="submit"
                      name="Updatedata"
                      class="btn btn-primary"
                      data-dismiss="modal"
                      onClick={this.delete}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {/*----------------------------------------------- */}
        <div
          class="modal fade"
          id="category"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Add Category
                </h5>
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
                  <div class="form-group">
                    <label class="col-form-label">Name Category</label>
                    {this.state.categoryData === undefined ||
                    this.state.categoryData === null ||
                    this.state.categoryData.length === 0 ? (
                      <p>null</p>
                    ) : (
                      this.state.categoryData.map((category, i) => {
                        return (
                          <tr>
                            <td>{i + 1}</td>
                            <p>. </p>
                            <td>{category.name_category}</td>
                            <td>
                              <button
                                type="button"
                                class="btn btn-primary"
                                onClick={() => this.deleteCategory(category.id)}
                              >
                                DELETE
                              </button>
                              |
                              <button
                                type="button"
                                class="btn btn-primary"
                                data-dismiss="modal"
                                onClick={() => this.updateCategory(category.id)}
                              >
                                EDIT
                              </button>
                              <input
                                type="text"
                                class="form-control"
                                name="edit_category"
                                onChange={this.onChangeValueU}
                              />
                            </td>
                          </tr>
                        );
                      })
                    )}
                    <input
                      type="text"
                      class="form-control"
                      name="name_category"
                      value={this.state.name_category}
                      onChange={this.onChangeValue}
                    ></input>
                  </div>
                  <button class="btn btn-primary" onClick={this.postCategory}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /*-------------------------------------------------------------------------------------------------------------------------------------*/}
      </Fragment>
    );
  }
}
// export defa ult Search;
const mapStateToProps = ({ product, category }) => {
  return {
    product,
    category
  };
};

export default connect(mapStateToProps)(Search);
