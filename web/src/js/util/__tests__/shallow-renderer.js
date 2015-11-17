import TestUtils from 'react-addons-test-utils';

var shallowRender = (component) => {
  const shallowRenderer = TestUtils.createRenderer();
  shallowRenderer.render(component);
  return shallowRenderer.getRenderOutput();
};

export default shallowRender;
