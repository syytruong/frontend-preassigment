/* eslint-disable react/prop-types */
/**
 *
 * Actions
 *
 */

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

function Actions(props) {
  const { productId, userId } = props;
  return (
    <div style={{ minWidth: '105px' }}>
      {props.increment && (
        <>
          &nbsp;
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            type="primary"
            ghost
            onClick={() => props.onIncrement(userId, productId)}
            style={{
              borderColor: props.selected ? '#fff' : '',
              color: props.selected ? '#fff' : '',
            }}
          />
        </>
      )}
      <span style={{ fontSize: 15, margin: '0 5px' }}>{props.quantity}</span>
      {props.decrement && (
        <>
          <Button
            shape="circle"
            icon={<MinusOutlined />}
            danger
            onClick={() => props.onDecrement(userId, productId)}
            disabled={props.quantity === 0}
          />
        </>
      )}
    </div>
  );
}

Actions.propTypes = {};

export default Actions;
