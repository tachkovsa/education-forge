import { Button, Input, Radio, RadioChangeEvent, Row, Col, Space } from 'antd';
import { useState } from 'react';

import bloomLevelsData from './bloom-levels.json';

interface Props {
  defaultLevel?: string;
  onSetVerb: Function;
}

export const Blooms: React.FC<Props> = ({ defaultLevel = 'remembering', onSetVerb }) => {
  const [level, setLevel] = useState(defaultLevel ?? null);
  const [verb, setVerb] = useState<string | null>(null);

  const [isCustomVerb, setIsCustomVerb] = useState(false);

  const onLevelChange = (e: RadioChangeEvent) => setLevel(e.target.value);
  const onVerbChange = (v: string) => {
    setVerb(v);
    onSetVerb(v);
  };

  return (
    <>
      <Row>
        <Col span={8}>
          <Radio.Group onChange={onLevelChange} value={level}>
            <Space direction="vertical">
              {bloomLevelsData.map((level: any) => (
                <Radio value={level.id}>{level.title}</Radio>
              ))}
            </Space>
          </Radio.Group>
        </Col>
        <Col span={16}>
          <Space wrap align="start" direction="horizontal">
            {bloomLevelsData
              .find((l) => l.id === level)
              ?.values.map((v: string) => (
                <Button type={v === verb ? 'primary' : 'default'} onClick={() => onVerbChange(v)}>
                  {v}
                </Button>
              ))}
          </Space>
        </Col>
      </Row>
    </>
    // <Space direction="horizontal" align="start">
    //
    //     <Space wrap align="start">
    //
    //     </Space>
    // </Space>
  );
};
