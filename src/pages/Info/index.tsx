'use client';
import { Form, Select } from 'antd';
import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { useWatch } from 'antd/es/form/Form';

const Info: React.FC = () => {
  const { setIsDisabled } = useContext(AppContext);
  const [form] = Form.useForm();

  const value = useWatch('user', form);
  
  setIsDisabled(value === '2');
  
  return (
   <Form form={form}>
    <Form.Item name={'user'}>
    <Select
      showSearch
      placeholder='Select a person'
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={[
        { value: '1', label: 'Jack' },
        { value: '2', label: 'Lucy' },
        { value: '3', label: 'Tom' },
      ]}
    />
    </Form.Item>
   </Form>
  );
};

export default Info;
