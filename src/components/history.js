import React, { Fragment } from "react";
import Axios from "axios";
import moment from "moment";
import "../styles/history.css";

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: [],
      history: [],
      items: []
    };
  }
  record = () => {
    Axios.get("http://localhost:4002/api/v1/shop/").then(response => {
      console.log(response.data);

      this.setState({
        record: response.data[0]
      });
    });
  };
  history = () => {
    Axios.get("http://localhost:4002/api/v1/shop/history").then(response => {
      console.log(response.data);

      this.setState({
        history: response.data
      });
    });
  };
  items = id => {
    Axios.get(`http://localhost:4002/api/v1/shop/history/${id}`).then(
      response => {
        console.log(response.data);

        this.setState({
          items: response.data
        });
      }
    );
    console.log(id);
  };
  componentDidMount() {
    this.record();
    this.history();
    // if (localStorage.getItem("status")) {
    //   if (window.location.href === "http://localhost:3000/home/history") {
    //   } else {
    //     window.location.href = "http://localhost:3000/home/history";
    //     console.log("berhasil");
    //   }
    // } else {
    //   console.log("gagal");
    //   window.location.href = "http://localhost:3000/login";
    // }
  }

  render() {
    return (
      <Fragment>
        <style></style>
        <div className="record">
          <div className="year">
            <p className="p_year">This Year's Income</p>
            <p className="componentHistory">
              Rp. {this.state.record.year_omzet}
            </p>
          </div>
          <div></div>
          <div className="income">
            <p className="p_income">Today Income</p>
            <p className="componentHistory">
              Rp.{this.state.record.income_today}
            </p>
            <div className="p_income">
              <p className="p_income">Persentase Day Omzet</p>
              {this.state.record.persentaseDay_omzet}% Yesterday
            </div>
          </div>
          <div></div>
          <div className="week">
            <p className="p_week">Order Week</p>
            <p className="componentHistory"> {this.state.record.order_week}</p>
            <div className="p_week">
              <p className="p_week">Persentase Week Order</p>
              {this.state.record.persentaseWeek_order}% Last Week
            </div>
          </div>
        </div>
        <div className="history">
          <div className=" cons_history">
            <div className="row">
              <div className="col-12 text-center">
                <table className="table table-hover table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name Cashier</th>
                      <th scope="col">Total Price</th>
                      <th scope="col">Date</th>
                      <th scope="col">Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.history.map((history, i) => {
                      return (
                        <tr>
                          <td>{i + 1}</td>
                          <td>{history.user}</td>
                          <td>{history.price}</td>
                          <td>
                            {moment(history.timeFinal).format("D MMMM YYYY")}
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-primary"
                              data-toggle="modal"
                              data-target="#detail"
                              onClick={() => {
                                this.items(history.id);
                              }}
                            >
                              Detail Items
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
        </div>

        <div
          class="modal fade"
          id="detail"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Items
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
              <div className="modal-body-items">
                <tr>
                  <th className="index-items">Name Item</th>
                  <th className="index-items">Qty</th>
                </tr>
                {this.state.items.map(items => {
                  return (
                    <tr>
                      <td>
                        <div className="name_items">{items.name}</div>
                      </td>
                      <td>
                        <div className="name_items_qty">{items.qty}</div>
                      </td>
                      <td>
                        <img src={items.Image} alt="" width="50px"></img>
                      </td>
                    </tr>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/*-----------------------------------------------------------------*/}
      </Fragment>
    );
  }
}

export default History;
