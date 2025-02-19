import {Input} from 'antd';

import {FormItem, FormItemLabel} from '@custom-antd';

import {required} from '@utils/form';

import {TooltipStatus, getValidationTooltip} from './tooltipUtils';

type BranchProps = {
  status?: TooltipStatus;
  message?: string;
};

const Branch: React.FC<BranchProps> = props => {
  const {status = TooltipStatus.None, message} = props;

  return (
    <FormItem
      name="branch"
      label={<FormItemLabel status={status} required text="Branch" />}
      rules={[required]}
      // required mark is shown in custom label component
      required={false}
      tooltip={getValidationTooltip(status, message)}
      key="branch"
    >
      <Input placeholder="e.g.: main" />
    </FormItem>
  );
};

export default Branch;
