import React, { Component } from "react";
import { render } from "react-dom";
import config from "./config";
import { UserRecord } from "./UserRecord";

// used to count the users reacord (helped to stop loading users if count is more than totalrecords count configured
let count = 0;

class Users extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      error: false, // to display error message if service failed
      isLoading: false, // to display a loading msg if request is in progress
      users: [], // users used to display on UI (it will have filterd records if search is applied)
      dataset: [], // main dataset it will have total records fetched from API
      selectedUsers: [], // dropped users using drag and drop finctionality
      end: false // to dispaly a message when loaded records reached to total records count
    };
    this.search = React.createRef();
    window.onscroll = () => {
      const { loadUsers } = this;
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadUsers(this.search.value);
      }
    };
    this.drop = this.drop.bind(this);
    this.searchUser = this.searchUser.bind(this);
    this.loadUsers = this.loadUsers.bind(this);
  }

  /*
    To collect droped users
  */
  drop(e) {
    this.setState({
      selectedUsers: [
        ...this.state.selectedUsers, // keeping old records
        ...this.state.users.filter(
          u => u.uuid === e.dataTransfer.getData("item") //filtering current droped record
        )
      ]
    });
  }

  /*
    To search a user by name
  */
  searchUser(e) {
    this.loadUsers(e.target.value);
    this.setState({
      users: this.state.dataset.filter(
        x => x.name.indexOf(e.target.value) !== -1 // filtering users by name using search value
      )
    });
  }

  allowDrop(e) {
    e.preventDefault();
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers(searchString) {
    if (count < config.getTotalRecordsCount()) {
      this.setState({ isLoading: true }, () => {
        fetch("https://randomuser.me/api/?results=" + config.getLimit())
          .then(response => response.json())
          .then(res => {
            this.setState({
              isLoading: false,
              dataset: [
                ...this.state.dataset,
                ...res.results.map(user => ({
                  email: user.email,
                  name: Object.values(user.name).join(" "),
                  uuid: user.login.uuid
                }))
              ]
            });
            if (searchString) {
              this.setState({
                users: this.state.dataset.filter(
                  x => x.name.indexOf(searchString) !== -1
                )
              });
            } else {
              this.setState({ users: this.state.dataset });
            }
          })
          .catch(err => {
            this.setState({
              error: err.message,
              isLoading: false
            });
          });
      });
      count += 10;
    } else {
      this.setState({ end: "Reached to an End" });
    }
  }

  render() {
    const { error, isLoading, users, selectedUsers, end } = this.state;
    let mainDiv = {
      width: "80%",
      overflowY: "scroll",
      height: "100%",
      float: "left"
    };
    let searchStyle = { width: "200px", height: "20px" };
    let dropContainerStyle = {
      height: "500px",
      width: "300px",
      marginLeft: "20px",
      overflowY: "scroll",
      float: "left"
    };

    return (
      <div>
        <div style={mainDiv}>
          <label htmlFor="search">Search: </label>
          <input
            type="text"
            id="search"
            onChange={this.searchUser}
            ref={search => {
              this.search = search;
            }}
            name="search"
            style={searchStyle}
          />
          {users.map((user, i) => (
            <UserRecord user={user} key={i} />
          ))}
          <hr />
          {error && <div style={{ color: "#900" }}>{error}</div>}
          {end && <div style={{ color: "#900" }}>{end}</div>}
          {isLoading && <div>Loading...</div>}
        </div>
        <div
          onDrop={this.drop}
          onDragOver={this.allowDrop}
          style={dropContainerStyle}
        >
          <h3>Drop Here</h3>
          {selectedUsers.map((user, i) => (
            <UserRecord user={user} key={i} />
          ))}
        </div>
      </div>
    );
  }
}

render(<Users />, document.getElementById("root"));
