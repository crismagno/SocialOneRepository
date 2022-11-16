import React from 'react';
import {IIfProps} from './types';

export const If: React.FC<IIfProps> = ({
  condition,
  children,
}): JSX.Element | any => {
  return (condition && children) || null;
};

export default If;
