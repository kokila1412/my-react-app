import React from "react";
import axios from "axios"
import "./App.css";

export default class App extends React.Component {
  state = {
    submitting: false,
    requestName: "",
    requestType: "",
    owner: "",
    priority: "",
    checkbox: false,
    reset: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitting: true });
    axios.post("/api/v1/requests", {
                                       "id": 5,
                                       "name": this.state.requestName,
                                       "type": this.state.requestType,
                                       "owner": this.state.owner,
                                       "priority": this.state.priority
                                     })
          .then(response => {
            console.log(response)
            // Handle response
          })
    axios.get("/api/v1/requests")
                              .then((res) => {
                                  this.setState({
                                     "name": this.state.requestName,
                                      "type": this.state.requestType,
                                      priority:res.priority,
                                      owner: res.owner,
                                      submitting: true
                                  });
                              });

//    setTimeout(() => {
//      this.setState({ submitting: false, reset: true });
//
//      if (this.state.reset) {
//        console.log("resetting");
//        this.setState({
//          submitting: false,
//              productName: "",
//              productDescription: "",
//              owner: "",
//              priority: "",
//              checkbox: false,
//              reset: false
//        });
//      }
//    }, 3000);
  };

  handleChange = (event) => {
    const { name, value, checked } = event.target;

    const isCheckBox = event.target.type === "checkbox";

    if (isCheckBox) {
      this.setState({ checkbox: checked });
    }
      this.setState({ [name]: value });


  };

  componentDidUpdate = () => {
    console.log(this.state);
  };

  render() {
    const { submitting, requestType, requestName, owner, priority, checkbox } = this.state;

    return (
      <div className="App">
        <h1>Maintainence Request Management User Screen</h1>
        <form>
          <fieldset>
            <label>
              {submitting && (
                <div>
                  Below is Saved to DB
                  <br /> Request Type: {requestType}
                  <br />
                  owner : {owner}
                  <br />
                  priority: {priority}
                </div>
              )}
              <p>Request Name:</p>
              <input
                name="requestName"
                value={requestName}
                type="text"
                onChange={this.handleChange}
              />
              <p>Request Type:</p>
               <input
                name="requestType"
                value={requestType}
                type="text"
                onChange={this.handleChange}/>
            </label>
          </fieldset>
          <fieldset>
            <label>
              <p>priority</p>
              <select name="priority" value={priority} onChange={this.handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>

              </select>
            </label>
            <label>
              <p>owner</p>
              <input
                name="owner"
                value={owner}
                type="text"
                onChange={this.handleChange}
              />
            </label>
          </fieldset>
          <button type="submit" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
