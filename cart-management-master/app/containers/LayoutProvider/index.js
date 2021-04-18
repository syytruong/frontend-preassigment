/**
 *
 * LayoutProvider
 *
 */

import Layout, { Content, Footer, Header } from 'antd/lib/layout/layout';
import CartPage from 'containers/CartPage/Loadable';
import CheckOutPage from 'containers/CheckOutPage/Loadable';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';

export function LayoutProvider() {
  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        Header
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 79 }}>
        <Switch>
          <Route exact path="/" component={CartPage} />
          <Route exact path="/checkout" component={CheckOutPage} />
        </Switch>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Frontend Pre-assignment 2021, Created by Sy Truong
      </Footer>
    </Layout>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LayoutProvider);
