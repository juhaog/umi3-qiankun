import { Input } from 'antd';
import styles from './index.less';

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>子系统</h1>
      <Input placeholder='请输入' />
    </div>
  );
}
