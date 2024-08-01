'use client';
import type { ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProFormField,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';

type DataSourceType = {
  id: React.Key;
  title?: number;
  desc?: string; // Đã thay đổi từ 'decs' thành 'desc'
  state?: number;
  created_at?: number;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = new Array(5).fill(1).map((_, index) => {
  return {
    id: (Date.now() + index).toString(),
    title: index,
    state: index,
    created_at: 1590486176000,
  };
});

function Table2() {
  const { valueTable1 } = useContext(AppContext);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id)
  );
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>(
    () => defaultData
  );

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: 'ID',
      dataIndex: 'title',
      width: '30%',
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
          {
            message: '必须包含数字',
            pattern: /[0-9]/,
          },
          {
            max: 16,
            whitespace: true,
            message: '最长为 16 位',
          },
          {
            min: 6,
            whitespace: true,
            message: '最小为 6 位',
          },
        ],
      },
    },
    {
      title: 'STATE',
      key: 'state',
      dataIndex: 'state',
    },
    {
      title: 'DESC',
      valueType: 'text',
      editable: false,
      dataIndex: 'desc',
      width: '30%',
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
        ], 
      },
      fieldProps: {
        placeholder: 'dsfds',
      },
      render: (dom, entity) => {
        return <a>{(entity.state as number) * (entity.title as number) + Number(valueTable1)}</a>;
      },
      dependencies: ['state', 'title',valueTable1],
    },
    {
      title: 'OPTION',
      valueType: 'option',
      width: 250,
      render: () => {
        return null;
      },
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        headerTitle='可编辑表格'
        columns={columns}
        rowKey='id'
        scroll={{
          x: 960,
        }}
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => ({
            id: Date.now(),
          }),
        }}
        toolBarRender={() => {
          return [
            <Button
              type='primary'
              key='save'
              onClick={() => {
                // dataSource 就是当前数据，可以调用 api 将其保存
                console.log(dataSource);
              }}
            >
              保存数据
            </Button>,
          ];
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete];
          },
          onValuesChange: (record, recordList) => {
            setDataSource(recordList);
          },
          onChange: setEditableRowKeys,
        }}
      />
      <ProCard title='表格数据' headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode='read'
          valueType='jsonCode'
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
}
export default Table2;
