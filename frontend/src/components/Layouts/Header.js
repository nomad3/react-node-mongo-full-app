import React from 'react';

import {Link} from 'react-router-dom';

import withAuth from '../../enhancers/withAuth';

import {Navbar} from 'reactstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  logout = event => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <Link className="navbar-brand" to="/">
            {process.env.APP_NAME || 'We Know App'}
          </Link>
        </Navbar>
      </div>
    );
  }
}

export default withAuth(Header);
