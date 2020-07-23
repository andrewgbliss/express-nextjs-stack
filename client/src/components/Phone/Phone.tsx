import React from 'react';
import img from 'assets/img/abybyo-phone.png';

interface Props {
  className: string;
}

const Phone: React.FC<Props> = (props) => {
  return <img src={img} alt="" className={props.className} />;
};

export default Phone;
