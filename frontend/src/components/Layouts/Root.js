import React from 'react';
import {Helmet} from 'react-helmet';

import {LayoutConsumer} from '../../contexts/layout-context';
import Header from './Header';

export default ({children}) => {
  return (
    <React.Fragment>
      <Helmet titleTemplate="%s | We Know APP">
        <title>Dashboard</title>
      </Helmet>
      <LayoutConsumer>
        {({header}) => {
          return (
            <React.Fragment>
              {header && <Header />}
              <div id="wrapper">
                <div id="content-wrapper">
                  <div className="container-fluid position-relative">
                    {children}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </LayoutConsumer>
    </React.Fragment>
  );
};
