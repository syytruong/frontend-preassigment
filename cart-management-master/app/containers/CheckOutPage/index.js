/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-lonely-if */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/**
 *
 * CheckOutPage
 *
 */

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Table, Tag, List, Space } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import cartPageReducer from 'containers/CartPage/reducer';
import makeSelectCartPage from 'containers/CartPage/selectors';
import ld from 'lodash';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import makeSelectCheckOutPage from './selectors';

export function CheckOutPage(props) {
  useInjectReducer({ key: 'checkOutPage', reducer });
  useInjectReducer({ key: 'cartPage', reducer: cartPageReducer });
  useInjectSaga({ key: 'checkOutPage', saga });
  const { carts, products, users } = props.cartPage;
  const [productList, setProductList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [productRemovedList, setProductRemovedList] = useState([]);
  const columns = [
    {
      title: 'Product',
      dataIndex: 'title',
      render: (text, record) => (
        <div className="space-align-block">
          <Space align="center">
            <img
              src={record.image}
              style={{ width: '50px', height: '50px' }}
              alt=""
            />
            <span className="mock-block">{text}</span>
          </Space>
        </div>
      ),
      width: '40%',
    },
    {
      title: 'Children selected',
      width: '30%',
      render: (text, record) => (
        <List
          size="small"
          dataSource={record.userIds}
          renderItem={id => {
            const user = getUserById(id);
            return (
              <List.Item>
                <div className="space-align-block">
                  <Space align="center">
                    <Avatar src="https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png" />
                    <span
                      className="mock-block"
                      style={{
                        textTransform: 'capitalize',
                        fontWeight: 'bold',
                      }}
                    >
                      {user && `${user.name.firstname} ${user.name.lastname}`}
                    </span>
                  </Space>
                </div>
              </List.Item>
            );
          }}
        />
      ),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: price => (
        <span>
          {Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(price)}
        </span>
      ),
    },
    {
      title: 'Rebate',
      render: (text, record) => (
        <Tag
          color={
            record.quantity > 2
              ? 'geekblue'
              : record.quantity === 2
              ? 'green'
              : 'unset'
          }
        >
          {record.quantity > 2 ? '30%' : record.quantity === 2 ? '20%' : ''}
        </Tag>
      ),
    },
    {
      title: 'Amount',
      render: (text, record) => (
        <span>
          {Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(
            record.quantity > 2
              ? record.quantity * record.price * 0.7
              : record.quantity === 2
              ? record.quantity * record.price * 0.8
              : record.quantity * record.price,
          )}
        </span>
      ),
    },
  ];

  function getTotalAmount() {
    let total = 0;
    productList.map(product => {
      if (product.quantity > 2) {
        total += product.quantity * product.price * 0.7;
      } else if (product.quantity === 2) {
        total += product.quantity * product.price * 0.8;
      } else {
        total += product.quantity * product.price;
      }
    });

    return total;
  }

  function getUserById(userId) {
    const userIndex = ld.findIndex(users, { id: userId });
    return users[userIndex];
  }

  function getProductById(prodId) {
    const productIndex = ld.findIndex(products, { id: prodId });
    return products[productIndex];
  }

  useEffect(() => {
    getProductById(1);
    let productsSelected = [];
    let productsRemoved = [];
    carts.map(cart => {
      cart.products.map(product => {
        if (product.quantity) {
          if (ld.find(productsSelected, o => o.id === product.productId)) {
            productsSelected = productsSelected.map(prod => {
              if (prod.id === product.productId) {
                prod.quantity += product.quantity;
                prod.userIds = [...prod.userIds, cart.userId];
              }
              return prod;
            });
          } else {
            productsSelected = [
              ...productsSelected,
              {
                quantity: product.quantity,
                status: product.status,
                userIds: [cart.userId],
                ...getProductById(product.productId),
              },
            ];
          }
        } else {
          if (ld.find(productsRemoved, o => o.id === product.productId)) {
            productsRemoved = productsRemoved.map(prod => {
              if (prod.id === product.productId) {
                prod.userIds = [...prod.userIds, cart.userId];
              }
              return prod;
            });
          } else {
            productsRemoved = [
              ...productsRemoved,
              {
                status: product.status,
                userIds: [cart.userId],
                ...getProductById(product.productId),
              },
            ];
          }
        }
      });
    });
    setProductList(preState => [
      ...preState,
      ...productsSelected.sort(
        (a, b) => parseFloat(b.quantity) - parseFloat(a.quantity),
      ),
    ]);
    setProductRemovedList(preState => [...preState, ...productsRemoved]);
  }, []);

  return (
    <Row gutter={16}>
      <Col span={16} offset={4}>
        <Button
          icon={<ArrowLeftOutlined />}
          shape="round"
          type="primary"
          onClick={() => props.history.goBack()}
        >
          Click to Back
        </Button>
        <Divider />
        {productList.length && (
          <Table
            bordered
            showHeader
            columns={columns}
            dataSource={productList}
            pagination={false}
            footer={() => (
              <div style={{ textAlign: 'right' }}>
                <b>Total: </b>
                {Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(getTotalAmount())}
              </div>
            )}
          />
        )}
        <Divider />
        {productRemovedList.length > 0 && (
          <Table
            bordered
            showHeader
            columns={[
              {
                title: 'Product',
                dataIndex: 'title',
                render: (text, record) => (
                  <div className="space-align-block">
                    <Space align="center">
                      <img
                        src={record.image}
                        style={{ width: '50px', height: '50px' }}
                        alt=""
                      />
                      <span className="mock-block">{text}</span>
                    </Space>
                  </div>
                ),
                width: '50%',
              },
              {
                title: 'Children selected',
                width: '50%',
                render: (text, record) => (
                  <List
                    size="small"
                    dataSource={record.userIds}
                    renderItem={id => {
                      const user = getUserById(id);
                      return (
                        <List.Item>
                          <div className="space-align-block">
                            <Space align="center">
                              <Avatar src="https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png" />
                              <span
                                className="mock-block"
                                style={{
                                  textTransform: 'capitalize',
                                  fontWeight: 'bold',
                                }}
                              >
                                {user &&
                                  `${user.name.firstname} ${
                                    user.name.lastname
                                  }`}
                              </span>
                            </Space>
                          </div>
                        </List.Item>
                      );
                    }}
                  />
                ),
              },
            ]}
            dataSource={productRemovedList}
            pagination={false}
            title={() => (
              <div style={{ textAlign: 'center', color: 'red' }}>
                <b>Product List Removed</b>
              </div>
            )}
          />
        )}
      </Col>
    </Row>
  );
}

CheckOutPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.object,
  cartPage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  checkOutPage: makeSelectCheckOutPage(),
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
)(CheckOutPage);
