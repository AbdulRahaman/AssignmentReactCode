import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

export class UserRecord extends Component {
  constructor(props) {
    super(props);
    this.drag = this.drag.bind(this);
  }
  drag(e) {
    e.dataTransfer.setData("item", this.props.user.uuid);
  }
  render() {
    let user = this.props.user;
    let itemStyle = {
      borderBottom: "solid 2px #e7e7e7"
    };
    return (
      <div style={itemStyle}>
        <div draggable="true" onDragStart={this.drag}>
          <Fragment key={user.name}>
            <div>
              <div>
                <p>{user.name}</p>
                <p>Email: {user.email}</p>
              </div>
            </div>
          </Fragment>
        </div>
      </div>
    );
  }
}

UserRecord.propTypes = {
  user: PropTypes.object
};