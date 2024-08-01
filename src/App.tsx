import { Col, Row } from 'antd';
import { createContext, useState } from 'react';
import Info from './pages/Info';
import Table1 from './pages/Table1';
import Table2 from './pages/Table2';
import './App.css'
import Total from './pages/Total';

type ContextApp = {
  valueTable1: string;
  setValueTable1: (value: string) => void;
  isDisabled: boolean;
  setIsDisabled: (value: boolean) => void;
  dataSource:readonly   DataSourceType[];
  setDataSource: (value:  readonly DataSourceType[]) => void;
}
type DataSourceType = {
  id: React.Key;
  title?: number;
  desc?: string; // Đã thay đổi từ 'decs' thành 'desc'
  state?: number;
  created_at?: number;
  children?: DataSourceType[];
};
const init = {}
export const AppContext = createContext<ContextApp>(init as unknown as ContextApp);
export default function App() {

  const defaultData: DataSourceType[] = new Array(1).fill(1).map((_, index) => {
    return {
      id: (Date.now() + index).toString(),
      title: index,
      state: index,
      created_at: 1590486176000,
    };
  });
  const [valueTable1, setValueTable1] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>(() => defaultData);
  const value = {valueTable1, setValueTable1, isDisabled, setIsDisabled, dataSource, setDataSource};


  return (
    <AppContext.Provider value={value}>
     <Row>
        <Col span={12}>
          <Table1 />
          <Table2 />
        </Col>
        <Col span={12}>
          <Info />
          <Total />
        </Col>
      </Row>
    </AppContext.Provider>
  );
}
