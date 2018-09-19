import React from "react";
import { mount } from "enzyme";
import { UserComponent } from "./userComponent";

describe("Usercomponent", () => {
  it("should it renders correctly", () => {
    let user = {
      username: "Test User",
      uuid: "sample",
      email: "test@mail.COM"
    };
    const wrapper = mount(
        <UserComponent user={user} key={i} />
    );
  });
});
