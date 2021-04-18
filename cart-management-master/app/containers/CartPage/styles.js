import styled from 'styled-components';
import { List } from 'antd';

const { Item } = List;

export const ProductItem = styled(Item)`
  background-color: #fff;
  border-radius: 15px;
  padding: 15px !important;
`;

export const ImageWrapper = styled.div`
  margin: 15px 15%;
  max-width: 70%;
`;

export const ProductName = styled.p`
  font-weight: bold;
  font-size: 15px;
`;

export const ProductPrice = styled.span`
  font-weight: bolder;
  margin-right: 16px;
`;

export const ProductAddtoCart = styled.div`
  text-align: center;
  margin-top: 15px;
`;

export const WrapActions = styled.div`
  position: absolute;
  top: 15px;
  right: 7px;
  text-align: right;
`;
