import history from '@/utils/history';

export const jumpFn = (path: string, { state }: { state: any }) => {
  return () => {
    history.push({
      pathname: path,
      state,
    });
  }
}