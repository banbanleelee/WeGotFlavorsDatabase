import React from 'react';
import { Link } from 'react-router-dom';

const AgencyList = ({ allAgencySlots, title }) => {
  console.log(allAgencySlots);

  if (!allAgencySlots.length) {
    return <h3>No Agency data... 
    Please contact Sally to seed the data...</h3>;
  }

  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {allAgencySlots &&
          allAgencySlots.map((agency) => (
            <div key={agency.agencyCode} className="col-12 col-xl-6">
              <div className="card mb-3 row">
                <div className="bg-dark text-light p-2 m-0 col-2">
                  <h4>{agency.agencyCode}</h4>
                </div>
                <div className="bg-light text-dark p-2 m-0 col-4 ">
                  <h6>Available Slots: {agency.slotAvailable}</h6>
                </div>
                <div className="bg-white text-dark p-2 m-0 col-4 ">
                  <h6>Remaining Slots: {agency.slotRemained}</h6>
                </div>
                <button className="btn btn-dark btn-block btn-squared align-middle col-2">
                  <Link className="text-light"
                    to={`/agency/${agency.agencyCode}`}
                  >
                    Edit
                  </Link>
                </button>
                
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AgencyList;
