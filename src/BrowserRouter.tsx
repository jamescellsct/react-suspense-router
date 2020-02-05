import React, { useRef } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { createBrowserHistory } from 'history';

import { Router } from './Router';
import { History } from './types';

type Props = {
  window?: unknown;
  timeout?: number;
};

export const BrowserRouter: React.FC<Props> = ({
  window,
  timeout,
  children,
}) => {
  const history = useRef<History>();
  if (!history.current) {
    history.current = createBrowserHistory({ window });
  }
  return (
    <Router history={history.current} timeout={timeout}>
      {children}
    </Router>
  );
};

export default BrowserRouter;
