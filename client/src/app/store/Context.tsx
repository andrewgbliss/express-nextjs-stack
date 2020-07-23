import React, { useContext } from 'react';
import { createStore } from './Store';
import { useLocalStore } from 'mobx-react-lite';

const Context = React.createContext({});

interface Props {
  children: React.ReactElement;
}

const Provider: React.FC<Props> = (props) => {
  const store = useLocalStore(createStore);
  return <Context.Provider value={store}>{props.children}</Context.Provider>;
};

export const useApp = () => useContext(Context);

export const withProvider = (Component: any) => {
  return (props: any) => {
    return (
      <Provider>
        <Component {...props} />
      </Provider>
    );
  };
};

export { Context, Provider };
