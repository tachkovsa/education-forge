import { useState } from 'react';
import styles from './constructor.module.css';
import { Button, Input, Space, Tag, Typography } from 'antd';
import { Blooms } from './blooms';
import { Who } from './who';
import { Condition } from './condition';

import classnames from 'classnames';
import { Goal } from './goal';

export const Constructor = () => {
  const [step, setStep] = useState(1);

  const [who, setWho] = useState('');
  const [what, setWhat] = useState('');
  const [goal, setGoal] = useState('');
  const [condition, setCondition] = useState('');

  const getResultText = () => `${who} сможет ${what} ${goal} ${condition}`;

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <Space direction="vertical" align="start" size="large" className={styles.fullWidth}>
      <div className={styles.resultBlock}>
        {(step === 5 && (
          <div className={classnames(styles.resultText, styles.finishText)}>{getResultText()}</div>
        )) || (
          <div className={classnames(styles.resultText, step === 5 ? styles.finishText : null)}>
            <span
              className={classnames(styles.substitution, step === 1 ? styles.curPathMarker : null)}
            >
              {who === '' ? '[кто]' : who}
            </span>
            &nbsp;сможет&nbsp;
            <span
              className={classnames(styles.substitution, step === 2 ? styles.curPathMarker : null)}
            >
              {what === '' ? '[глагол]' : what}
            </span>
            &nbsp;
            <span
              className={classnames(styles.substitution, step === 3 ? styles.curPathMarker : null)}
            >
              {goal === '' ? '[цель]' : goal}
            </span>
            &nbsp;
            <span
              className={classnames(styles.substitution, step === 4 ? styles.curPathMarker : null)}
            >
              {condition === '' ? '[условие]' : condition}
            </span>
          </div>
        )}
      </div>
      <Space direction="vertical" className={styles.form} size="large">
        <Space direction="vertical" className={styles.inputs}>
          {(step === 1 && <Who currentValue={who} onChangeValue={setWho} />) ||
            (step === 2 && <Blooms onSetVerb={setWhat} />) ||
            (step === 3 && <Goal currentValue={goal} onChangeValue={setGoal} />) ||
            (step === 4 && <Condition currentValue={condition} onChangeValue={setCondition} />)}
        </Space>
        <Space direction="horizontal" className={styles.actions} size="small">
          <Button type="default" onClick={prevStep} disabled={step === 1}>
            Назад
          </Button>
          {step < 5 && (
            <Button type="primary" onClick={nextStep} disabled={step === 5}>
              {step < 5 ? 'Далее' : 'Завершить'}
            </Button>
          )}
          {step === 5 && (
            <Button
              type="primary"
              onClick={() => {
                navigator.clipboard.writeText(getResultText());
              }}
            >
              Скопировать
            </Button>
          )}
        </Space>
      </Space>
    </Space>
  );
};
