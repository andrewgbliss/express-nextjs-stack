import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

interface Props {
  children: React.ReactElement;
  showLogin?: boolean;
}

const Layout: React.FC<Props> = (props) => {
  return (
    <>
      <Header showLogin={props.showLogin} />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
