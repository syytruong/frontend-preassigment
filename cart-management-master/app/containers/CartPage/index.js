/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * CartPage
 *
 */

import {
  CheckOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Image,
  List,
  notification,
  Row,
  Skeleton,
  Space,
  Typography,
} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Actions from 'components/Actions';
import ld from 'lodash';
import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  addToCart,
  beginRequestCarts,
  beginRequestProducts,
  beginRequestUsers,
  decrementProduct,
  incrementProduct,
  selectCart,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectCartPage from './selectors';
import {
  ImageWrapper,
  ProductAddtoCart,
  ProductItem,
  ProductName,
  ProductPrice,
  WrapActions,
} from './styles';

export function CartPage(props) {
  useInjectReducer({ key: 'cartPage', reducer });
  useInjectSaga({ key: 'cartPage', saga });
  const { cartPage, dispatch, history } = props;
  const { isLoading, products, carts, users, cartSelected } = cartPage;

  useEffect(() => {
    if (!users.length) {
      dispatch(beginRequestUsers());
    }
  }, [users]);

  useEffect(() => {
    if (!products.length) {
      dispatch(beginRequestProducts());
    }
  }, [products]);
  useEffect(() => {
    if (!carts.length) {
      dispatch(beginRequestCarts());
    }
  }, [carts]);

  function openNotification(type) {
    notification[type]({
      message: 'Updated Carts',
      description: `Added product success to carts.`,
      duration: 3,
    });
  }

  function addtoCart(prodId) {
    dispatch(addToCart(prodId));
    openNotification('success');
  }

  function genProductItem(product) {
    return (
      <ProductItem>
        <div>
          <ProductName>{product.title}</ProductName>
          <p>{product.category}</p>
        </div>
        <ImageWrapper>
          <Image src={product.image} style={{ maxHeight: '300px' }} />
        </ImageWrapper>
        <div>
          <span>{product.description}</span>
        </div>
        <ProductAddtoCart>
          <ProductPrice>${product.price}</ProductPrice>
          <Button
            shape="round"
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={() => addtoCart(product.id)}
            disabled={!cartSelected}
          >
            {cartSelected ? 'Add to Cart' : 'Select cart to Add'}
          </Button>
        </ProductAddtoCart>
      </ProductItem>
    );
  }

  function genCartItem(cart) {
    const user = ld.find(users, o => o.id === cart.userId);
    const prodsUser = cart.products;
    return (
      <div
        style={{
          border: '1px solid #ecec',
          padding: '16px',
          marginTop: '10px',
        }}
      >
        <List.Item
          actions={[
            <Button
              type="primary"
              shape="round"
              icon={
                cartSelected === cart.id ? <CheckOutlined /> : <PlusOutlined />
              }
              disabled={cartSelected === cart.id}
              onClick={() => dispatch(selectCart(cart.id))}
            >
              {cartSelected === cart.id ? 'Selected to Add' : 'Click to Add'}
            </Button>,
          ]}
        >
          <Skeleton avatar title={false} loading={isLoading} active>
            <List.Item.Meta
              avatar={
                <Avatar src="https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png" />
              }
              title={
                <span
                  style={{ textTransform: 'capitalize', fontWeight: 'bold' }}
                >
                  {user && `${user.name.firstname} ${user.name.lastname}`}
                </span>
              }
            />
          </Skeleton>
        </List.Item>
        <List
          bordered
          dataSource={prodsUser}
          renderItem={(prod, index) => {
            const prodDt = ld.find(products, o => o.id === prod.productId);
            return (
              <List.Item style={{ paddingRight: '90px', position: 'relative' }}>
                <div className="space-align-block">
                  <Space align="center">
                    <img
                      src={prodDt && prodDt.image}
                      style={{ width: '50px', height: '50px' }}
                      alt=""
                    />
                    <Typography.Text>
                      [{index + 1}] {prodDt && prodDt.title}
                    </Typography.Text>{' '}
                  </Space>
                </div>
                <WrapActions>
                  <Actions
                    increment
                    decrement
                    onIncrement={(userId, productId) =>
                      dispatch(incrementProduct(userId, productId))
                    }
                    onDecrement={(userId, productId) =>
                      dispatch(decrementProduct(userId, productId))
                    }
                    quantity={prod.quantity}
                    productId={prodDt && prodDt.id}
                    userId={user && user.id}
                  />
                </WrapActions>
              </List.Item>
            );
          }}
        />
      </div>
    );
  }

  function genProductList() {
    return (
      <List
        loading={isLoading}
        itemLayout="horizontal"
        grid={{ gutter: 16, column: 2 }}
        dataSource={products}
        renderItem={product => genProductItem(product)}
      />
    );
  }

  function genCartList() {
    return (
      <List
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={carts}
        header={<Divider orientation="left">Cart List</Divider>}
        footer={
          <Divider orientation="right">
            <Button
              shape="round"
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={() => history.push('/checkout')}
              disabled={isLoading}
            >
              Checkout
            </Button>
          </Divider>
        }
        renderItem={cart => genCartItem(cart)}
      />
    );
  }

  return (
    <Row gutter={16}>
      <Col span={12} offset={3}>
        {products && genProductList()}
      </Col>
      <Col span={6}>{carts && users && products && genCartList()}</Col>
    </Row>
  );
}

CartPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  cartPage: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  cartPage: makeSelectCartPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CartPage);
