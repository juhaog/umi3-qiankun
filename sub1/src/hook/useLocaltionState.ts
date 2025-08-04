import { useEffect, useState } from 'react';
import history from '@/utils/history';
import { isEqual } from 'lodash';

export default function useLocationState(path: string) {
  const { state: defaultState, pathname, search } = history.location;
  const state = defaultState || {};
  const [locationState, setLocationState] = useState({ ...state, query: getQuery()});
  function getQuery() {
    const query = {};
    search.slice(1).split('&').forEach((item) => {
      const [key, value] = item.split('=');
      query[key] = value;
    });
    return query;
  }
  useEffect(() => {
    const query = getQuery();
    const { query: defaultQuery, ...other } = locationState;
    if (pathname === path && !isEqual(state, other)) {
      setLocationState({ ...state, query });
    }
  }, [state, search]);
  return locationState;
}