import {useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {Tabs} from 'antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {Execution} from '@models/execution';

import {CLICommands, ExecutionsVariablesList, LogOutput} from '@molecules';

import {usePluginSlot, usePluginSlotList, usePluginState} from '@plugins/hooks';
import {LogOutputBannerInterface, TestExecutionTabsInterface} from '@plugins/types';

import {useEntityDetailsPick} from '@store/entityDetails';
import {useExecutionDetailsPick} from '@store/executionDetails';
import {useExecutorsPick} from '@store/executors';

import {decomposeVariables} from '@utils/variables';

import TestExecutionArtifacts from './TestExecutionArtifacts';

const TestExecutionTabs: React.FC = () => {
  const {data: execution} = useExecutionDetailsPick('data') as {data: Execution};
  const {details} = useEntityDetailsPick('details');
  const [, setTestExecutionTabsData] = usePluginState<TestExecutionTabsInterface>('testExecutionTabs');
  const {id: entityId, execDetailsTab} = useParams();

  const {featuresMap} = useExecutorsPick('featuresMap');

  const {
    testType,
    executionResult: {status, output, errorMessage},
    variables,
    id,
    testName,
    testSuiteName,
    startTime,
  } = execution;

  const isRunning = status === 'running';

  const decomposedVars = decomposeVariables(variables || {});

  const whetherToShowArtifactsTab = featuresMap[testType]?.includes('artifacts');

  const setExecutionTab = useDashboardNavigate((next: string) => `/tests/${entityId}/executions/${id}/${next}`);

  useEffect(() => {
    setTestExecutionTabsData({execution, test: details});
  }, [execution, details]);

  // TODO: Add 'render' option for plugins, and use `navigate` + testExecutionTabs instead
  const [, setLogOutputBannerData] = usePluginState<LogOutputBannerInterface>('testExecutionLogOutputBanner');
  const logBanner = usePluginSlot('testExecutionLogOutputBanner');
  useEffect(() => {
    setLogOutputBannerData({setExecutionTab});
  }, []);

  const defaultExecutionTabs = [
    {
      value: {
        key: 'log-output',
        label: 'Log Output',
        children: (
          <LogOutput logOutput={output || errorMessage} executionId={id} isRunning={isRunning} banner={logBanner} />
        ),
      },
      metadata: {
        order: Infinity,
      },
    },
    {
      value: {
        key: 'artifacts',
        label: 'Artifacts',
        children: (
          <TestExecutionArtifacts
            id={id}
            testName={testName}
            testSuiteName={testSuiteName}
            startTime={startTime.toString()}
          />
        ),
      },
      metadata: {
        order: 3,
        visible: () => whetherToShowArtifactsTab,
      },
    },
    {
      value: {
        key: 'cli-commands',
        label: 'CLI Commands',
        children: <CLICommands isExecutions type={testType} id={id} modifyMap={{status}} />,
      },
      metadata: {
        order: 2,
      },
    },
    {
      value: {
        key: 'variables',
        label: 'Variables',
        children: <ExecutionsVariablesList variables={decomposedVars} />,
      },
      metadata: {
        order: 1,
        visible: () => decomposedVars.length,
      },
    },
  ];

  const items = usePluginSlotList('testExecutionTabs', defaultExecutionTabs);

  return <Tabs defaultActiveKey="log-output" activeKey={execDetailsTab} onChange={setExecutionTab} items={items} />;
};

export default TestExecutionTabs;
