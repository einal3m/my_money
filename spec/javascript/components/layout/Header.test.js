import Header from 'components/layout/Header';
import { Navbar } from 'react-bootstrap';

describe('Header', () => {
  it('has a menu and some links', () => {
    const header = shallow(<Header />);
    expect(header.type()).toEqual(Navbar);
  });
});

