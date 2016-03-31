import React                      from 'react';
import { shallow, mount, render } from 'enzyme';
import Loading                    from './loading.component';

describe("Loading component", function() {
  it("should return null if show props is false", function () {
    expect(shallow(<Loading />).type())
      .toBe(null);
  });

  it("should return a div with a spinner if show props is true", function () {
    expect(shallow(<Loading show="true" />).contains(<span className="fa fa-spinner fa-spin" />))
      .toBe(true);
  });
});
