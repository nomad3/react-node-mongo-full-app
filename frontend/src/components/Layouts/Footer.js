import React, {Component} from 'react';

class Footer extends Component {
  state = {};

  render() {
    return (
      <footer className="sticky-footer">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>
              Copyright &copy; {process.env.APP_NAME || 'We Know App'} 2019
            </span>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
