import styles from './who.module.css';
import { Input, Space, Tag } from 'antd';
import React from 'react';

import whoPresets from './who-presets.json';

interface Props {
  currentValue: string;
  onChangeValue: (v: string) => void;
}

export const Who: React.FC<Props> = ({ currentValue, onChangeValue }) => {
  return (
    <Space direction="vertical" size="middle">
      <Input
        placeholder="Кто?"
        value={currentValue}
        onChange={(e) => onChangeValue(e.target.value)}
        allowClear
        size="large"
        className={styles.input}
      />
      <Space size={[0, 8]} wrap>
        {whoPresets.map((v) => (
          <Tag
            onClick={() => onChangeValue(v)}
            color={currentValue === v ? '#2db7f5' : 'default'}
            className={styles.tag}
          >
            {v}
          </Tag>
        ))}
      </Space>
    </Space>
  );
};
