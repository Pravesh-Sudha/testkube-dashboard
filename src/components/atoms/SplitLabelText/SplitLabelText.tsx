import React from 'react';

import {Text} from '@custom-antd';

import {labelRegex} from '@molecules/LabelsSelect/utils';

import Colors from '@styles/Colors';

import {SplitLabelTextContainer} from './SplitLabelText.styled';

type SplitLabelProps = {
  value: string;
  textClassName?: string;
};

const SplitLabelText: React.FC<SplitLabelProps> = props => {
  const {value, textClassName = 'regular'} = props;

  if (!labelRegex.test(value)) {
    return (
      <Text color={Colors.slate200} className={textClassName}>
        {value}
      </Text>
    );
  }

  const [key, ...rest] = value.split(':');

  return (
    <SplitLabelTextContainer>
      <Text color={Colors.slate400} className={textClassName}>
        {key}:{' '}
      </Text>
      <Text color={Colors.slate200} className={textClassName} ellipsis>
        {rest.join(':')}
      </Text>
    </SplitLabelTextContainer>
  );
};

export default SplitLabelText;
