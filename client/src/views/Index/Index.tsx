import React, { useEffect } from 'react';
import Layout from 'components/Layout/Layout';
import Jumbotron from 'sections/Jumbotron/Jumbotron';
import Api from 'services/Api';

interface Props {
  showLogin?: boolean;
}

const Index: React.FC<Props> = (props) => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await Api.get('/api/v1/info');
      console.log(response);
    };
    fetchData();
  }, []);
  return (
    <Layout showLogin={props.showLogin}>
      <Jumbotron />
    </Layout>
  );
};

export default Index;
