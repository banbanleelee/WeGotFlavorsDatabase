import React from 'react';
import { useQuery } from '@apollo/client';

import AgencyList from '../components/AgencyList';
import AgencyForm from '../components/AgencyForm';

import { QUERY_ALL_AGENCY } from '../utils/queries';

const Home = () => {
  const { loading, error, data } = useQuery(QUERY_ALL_AGENCY);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const agencies = data?.allAgencySlots || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <AgencyForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <AgencyList
              allAgencySlots={agencies}
              title="All agencies as follows..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
