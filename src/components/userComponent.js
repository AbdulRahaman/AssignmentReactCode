import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Row, Col, Glyphicon } from "react-bootstrap";

export class UserComponent extends Component {
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
    let icon = {
      color: "#aba9a9",
      padding: "10px",
      fontSize: "35px",
      float: "left",
      display: "block"
    };
    return (
      <Row style={itemStyle} id={user.uuid}>
        <Col draggable="true" onDragStart={this.drag}>
          <Fragment key={user.name}>
            <div>
              <div>
                <span><Glyphicon glyph="user" style={icon}/></span>
                <p className="username">
                  <strong>{user.name}</strong>
                </p>
                <p>Email: {user.email}</p>
              </div>
            </div>
          </Fragment>
        </Col>
      </Row>
    );
  }
}

UserComponent.propTypes = {
  user: PropTypes.object
};
