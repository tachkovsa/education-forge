import { Space, Typography } from 'antd';
import { Constructor } from '../../components/constructor';

import styles from './main.module.css';

const { Title, Text, Paragraph } = Typography;

export const MainPage = () => {
  return (
    <div className={styles.page}>
      <Space direction="vertical">
        <Typography>
          <Title>Конструктор результатов обучения</Title>
          <Paragraph>
            Данный прототип создан в рамках проектной работы командой №2 для проведения исследований
            и опросов целевой аудитории данного сервиса.
          </Paragraph>
          <Constructor />
        </Typography>
      </Space>
    </div>
  );
};
