# react-suspense-router

[![Build Status](https://travis-ci.com/dai-shi/react-suspense-router.svg?branch=master)](https://travis-ci.com/dai-shi/react-suspense-router)
[![npm version](https://badge.fury.io/js/react-suspense-router.svg)](https://badge.fury.io/js/react-suspense-router)
[![bundle size](https://badgen.net/bundlephobia/minzip/react-suspense-router)](https://bundlephobia.com/result?p=react-suspense-router)

React Router for React Suspense and Render-as-You-Fetch

## Introduction

The new [Render-as-You-Fetch](https://reactjs.org/docs/concurrent-mode-suspense.html#approach-3-render-as-you-fetch-using-suspense) pattern is mind-blowing.

This is an experimental library that combines react-router and some other libraries.
You can get the benefit of Render-as-You-Fetch out of the box.

## Install

```bash
npm install react-suspense-router
```

## Usage

App.tsx

```tsx
import React, { Suspense } from 'react';

import { BrowserRouter } from 'react-suspense-router';

import Nav from './Nav';
import Routes from './Routes';

const App: React.FC = () => (
  <BrowserRouter suspenseConfig={{ timeoutMs: 1000 }}>
    <Nav />
    <Suspense fallback={<div>Loading...</div>}>
      <Routes />
    </Suspense>
  </BrowserRouter>
);

export default App;
```

Nav.tsx

```tsx
import React from 'react';

import { Link, useSuspensePending } from 'react-suspense-router';

const Nav: React.FC = () => {
  const isPending = useSuspensePending();
  return (
    <div>
      <div style={{ position: 'absolute', top: 0 }}>{isPending && 'Pending...'}</div>
      <ul style={{ marginTop: 20 }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/user/1">User 1</Link>
        </li>
        <li>
          <Link to="/user/2">User 2</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
```

Routes.tsx

```tsx
import React from 'react';

import { Route, LazyFetcher } from 'react-suspense-router';

const Index = React.lazy(() => import('./pages/Index'));
const User = React.lazy(() => import('./pages/User'));
const fetchUserData = LazyFetcher(() => import('./pages/User.data'));

const Routes: React.FC = () => (
  <>
    <Route exact path="/">
      <Index />
    </Route>
    <Route path="/user/:uid" fetchData={fetchUserData}>
      <User />
    </Route>
  </>
);

export default Routes;
```

pages/Index.tsx

```tsx
import React from 'react';

const Index: React.FC = () => (
  <div>
    <h1>Index</h1>
    <p>Hello World</p>
  </div>
);

export default Index;
```

pages/User.tsx

```tsx
import React from 'react';

import { useParams, useRouteData } from 'react-suspense-router';

import { UserData } from './User.data';

const FirstName: React.FC = React.memo(() => {
  const userData = useRouteData() as UserData;
  return (
    <div>
      <h2>First Name</h2>
      <div>{userData.data.first_name}, random={Math.random()}</div>
    </div>
  );
});

const User: React.FC = () => {
  const { uid } = useParams();
  return (
    <div>
      <h1>User</h1>
      <div>uid: {uid}, random={Math.random()}</div>
      <FirstName />
    </div>
  );
};

export default User;
```

pages/User.data.ts

```ts
import { match as Match } from 'react-suspense-router';

export type UserData = {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
};

const fetchUserData = async (match: Match<{ uid?: string }>) => {
  const userId = match.params.uid;
  const response = await fetch(`https://reqres.in/api/users/${userId}`);
  const data = await response.json();
  return data as UserData;
};

export default fetchUserData;
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### BrowserRouter

BrowserRouter for Suspsense

This accepts `suspenseConfig` prop for useTransition.

#### Examples

```javascript
import { BrowserRouter } from 'react-suspense-router';

const App = () => (
  <BrowserRouter suspenseConfig={{ timeoutMs: 3000 }}>
    <Nav />
    <Suspense fallback={<span>Loading...</span>}>
      <Routes />
    </Suspense>
  </BrowserRouter>
);
```

### LazyFetcher

LazyFetcher

This will be used like React.lazy, but for route data.

#### Examples

```javascript
import { LazyFetcher } from 'react-suspense-router';

const fetchUserData = LazyFetcher(() => import('./pages/User.data'));
```

### Route

Route for Suspense

This accepts `fetchData` prop for route data.
It is usaually loaded by `LazyFetcher`.

#### Examples

```javascript
import { Route } from 'react-suspense-router';

const Routes = () => (
  <>
    <Route exact path="/">
      <Index />
    </Route>
    <Route exact path="/user/:uid" fetchData={fetchUserData}>
      <User />
    </Route>
  </>
);
```

### useRouteData

useRouteData hook

This will return route data in components inside a route.
It utilizes proxy-based tracking by React Tracked.

#### Examples

```javascript
import { useRouteData } from 'react-suspense-fetch';

const FirstName = () => {
  const userData = useRouteData();
  return <div>userData.firstName</div>
};
```

### useRouteDataSelector

useRouteDataSelector hook

This will return route data in components inside a route.
It takes a selector function.
Use this if proxy-based tracking doesn't work.

#### Examples

```javascript
import { useRouteDataSelector } from 'react-suspense-fetch';

const selectFirstName = data => data.firstName;
const FirstName = () => {
  const firstName = useRouteDataSelector(selectFirstName);
  return <div>firstName</div>
};
```

### useSuspensePending

useSuspensePending hook

This will return isPending boolean from useTransition in Router.

#### Examples

```javascript
import { useSuspensePending } from 'react-suspense-router';

const Nav = () => {
  const isPending = useSuspensePending();
  return (
    <div>
      {isPending && 'Pending...'}
      ...
    </div>
  );
};
```

## Examples

The [examples](examples) folder contains working examples.
You can run one of them with

```bash
PORT=8080 npm run examples:01_minimal
```

and open <http://localhost:8080> in your web browser.

You can also try them in codesandbox.io:
[01](https://codesandbox.io/s/github/dai-shi/react-suspense-router/tree/master/examples/01_minimal)
[02](https://codesandbox.io/s/github/dai-shi/react-suspense-router/tree/master/examples/02_typescript)
[03](https://codesandbox.io/s/github/dai-shi/react-suspense-router/tree/master/examples/03_nesting)
