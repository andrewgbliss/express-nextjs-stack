import React from 'react';
import Navbar from './Navbar/Navbar';

interface Props {
  showLogin?: boolean;
}

const Header: React.FC<Props> = (props) => {
  return (
    <>
      <Navbar {...props} />
    </>
  );
};

export default Header;
