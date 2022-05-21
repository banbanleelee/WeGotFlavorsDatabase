import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery  } from '@apollo/client';


import { QUERY_SINGLE_AGENCY } from '../utils/queries';

import EventForm from '../components/EventForm';
import DeleteEventForm from '../components/DeleteEventForm';


const Agency = () => {
  // Use `useParams()` to retrieve value of the route parameter `:code`
  const { code } = useParams();

  console.log(`code: ${typeof code}`);

  const { loading, error, data } = useQuery (QUERY_SINGLE_AGENCY, {
    variables: { 
        agencyCode: parseInt(code),
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) return `Error! ${error.message}`;

  const agency = data?.agencySlotByCode || [];

  console.log(`agency: ${agency.agencyCode}`)
  console.log(`pidlength: ${(agency.participatedIds.length)}`);

  const participantsCount = agency.participatedIds.length;
  const participant = agency.participatedIds.map((each) =>
    <div className="row list-group">
        <div className="col-10">
            <p className="card-text"><b>{each.micoId}</b> signed up for <b>{each.eventName}</b> on {each.time}</p>
        </div>
        
    </div>
  );

  return (
    <div className="my-3 card d-flex justify-content-center">
        <h2 className="card-header bg-dark text-light p-2 m-0">
            Agency {agency.agencyCode}
        </h2>
        <div className="card-body">
            <div className="card-title p-4">
                    <p><b>Available slots this month: </b> {agency.slotAvailable}</p>
                    <p><b>Remaining slots this month: </b> {agency.slotRemained}</p>
                </div>

            <div className="card-body p-4">
                { participantsCount>0 ? (
                    <div>{participant}</div>
                ) : (
                    <p><b>No one signed up in this agency yet...</b></p>
                    )
                }
            </div>

            <div className="p-4">
                <EventForm agencyCode={agency.agencyCode} />
            </div>
            <div className="p-4">
                <DeleteEventForm agencyCode={agency.agencyCode} />
            </div>
        </div>
    </div>
    
  );
};

export default Agency;
