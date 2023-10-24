import { Input } from 'antd';
import React from 'react';

interface Props {
  currentValue: string;
  onChangeValue: (v: string) => void;
}

export const Condition: React.FC<Props> = ({ currentValue, onChangeValue }) => {
  return (
    <Input
      placeholder="Условие"
      value={currentValue}
      onChange={(e) => onChangeValue(e.target.value)}
    />
  );
};
