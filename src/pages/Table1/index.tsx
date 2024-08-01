'use client';
import type { ProColumns } from '@ant-design/pro-components';
import {
  EditableProTable,
  ProCard,
  ProFormField,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useContext, useMemo, useState } from 'react';
import { AppContext } from '../../App';

type DataSourceType = {
  id: React.Key;
  title?: number;
  desc?: string; // Đã thay đổi từ 'decs' thành 'desc'
  state?: number;
  created_at?: number;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = new Array(1).fill(1).map((_, index) => {
  return {
    id: (Date.now() + index).toString(),
    title: index,
    state: index,
    created_at: 1590486176000,
  };
});

function Table1() {
  const { setValueTable1, isDisabled, dataSource, setDataSource } = useContext(AppContext);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id)
  );

  const columns: ProColumns<DataSourceType>[] = useMemo(() => {
    return [
      {
        title: 'ID',
        dataIndex: 'title',
        editable: false,
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
        editable: isDisabled,
        onCell: (value) => {
          setValueTable1(value.state?.toString() ?? '');
          return null;
        },
      },
    ]
  }, [isDisabled, setValueTable1]);

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
export default Table1;
