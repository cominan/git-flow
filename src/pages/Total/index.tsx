import { useContext } from 'react';
import { AppContext } from '../../App';

export default function Total() {
  const { dataSource } = useContext(AppContext);
  console.log(dataSource);

  return <p>Total</p>;
}
