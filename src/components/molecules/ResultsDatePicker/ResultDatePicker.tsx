import React, {useState} from 'react';
import {DatePicker} from 'antd';
import styled from 'styled-components';

import {Typography, Button} from '@atoms';

import {TestsContext} from '@context/testsContext';

const StyledDateContainer = styled.div`
  display: flex;
  align-items: baseline;

  & > * {
    flex: 1 1 auto;
    margin: 5px;
  }
`;

const datePickerStyles = {
  color: 'var(--color-light-primary)',
  backgroundColor: 'var(--color-dark-primary)',
  borderLeft: 'none',
  borderTop: 'none',
  borderRight: 'none',
  borderBottom: '1px solid var(--color-light-primary)',
};

const ResultDatePicker = () => {
  const [toggleGetTest, setToggleGetTest] = useState<boolean>(false);
  const tests: any = React.useContext(TestsContext);

  const handleDatePicker = (_value: any, dateString: any) => {
    tests.setSelectedTest({id: null, testName: null});
    tests.filters.dateFilter = dateString;
    tests.setFilters(tests.filters);
  };

  const getLatestDateTest = React.useCallback(() => {
    tests.setSelectedTest({id: null, testName: null});
    if (tests.filters?.filter?.indexOf('latest') === -1) {
      tests.filters?.filter?.push('latest');
    } else {
      const filtered = tests?.filters?.filter?.filter((filter: string) => filter !== 'latest');
      tests.setFilters({...tests.filters, status: filtered});
    }
  }, [tests?.filters?.filter]);

  React.useEffect(() => {
    if (tests.testsExecution) {
      setToggleGetTest(true);
    }
  }, [tests.testsExecution]);

  return (
    <StyledDateContainer>
      <Typography variant="quaternary">Results for</Typography>
      <DatePicker
        size="large"
        style={datePickerStyles}
        format="MM/DD/YYYY"
        onChange={handleDatePicker}
        disabled={!tests?.testsExecution !== undefined}
      />
      <Button disabled={!toggleGetTest || !tests?.testsExecution !== undefined} onClick={getLatestDateTest}>
        Latest
      </Button>
    </StyledDateContainer>
  );
};

export default ResultDatePicker;
