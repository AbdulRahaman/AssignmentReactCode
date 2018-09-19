import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from "react";
import { UserComponent } from "../src/components/userComponent";

Enzyme.configure({ adapter: new Adapter() });

describe("Usercomponent", () => {
  it("should it renders correctly", () => {
    let user = {
      username: "Test User",
      uuid: "sample",
      email: "test@mail.COM"
    };
    const wrapper = shallow(<UserComponent user={user} />);
    expect(wrapper).toMatchSnapshot();
  });
});
