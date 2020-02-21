import Footer from 'components/layout/Footer';

describe('Footer', () => {
  it('has a 3 sections with links', () => {
    const footer = shallow(<Footer />);
    expect(footer.children().length).toEqual(3);
  });
});
