import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { SIGN_UP } from '../../utils/mutations';

const EventForm = ({ agencyCode }) => {
    const [formState, setFormState] = useState({
        micoId: '',
        eventName: '',
        time:''
    });

  const [addEvent, { error }] = useMutation(SIGN_UP);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // eslint-disable-next-line
      const { data } = await addEvent({
        variables: { 
            agencyCode: parseInt(agencyCode), 
            micoId: parseInt(formState.micoId), 
            eventName: formState.eventName,
            time: formState.time
        },
      });

      setFormState({
        micoId: '',
        eventName: '',
        time:''
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    if (name === 'micoId') {
      setFormState({ ...formState, [name]: value });
    } else if (name === 'eventName') {
      setFormState({ ...formState, [name]: value });
    } else if (name === 'time') {
        setFormState({ ...formState, [name]: value });
    }
  };

  return (
    <div>
      <p><b>Please put in new event sign-ups :)</b></p>
      
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-3">
          <input
            name="micoId"
            placeholder="Mico ID"
            value={formState.micoId}
            className="form-input w-100"
            onChange={handleChange}
            autoComplete="off"
          ></input>
        </div>

        <div className="col-3">
          <input
            name="eventName"
            placeholder="Event Name"
            value={formState.eventName}
            className="form-input w-100"
            onChange={handleChange}
            autoComplete="off"
          ></input>
            {/* <select name="eventName">
                <option value="HNJ">Hot and Juicy</option>
                <option value="NLH">Nominated Livehouse</option>
                <option value="GNS">Game Non-Stop</option>
                <option value="TT">Truth Talk</option>
                <option value="SS">Saturday Showbiz</option>
            </select> */}
        </div>
        
        <div className="col-3">
          <input
            name="time"
            placeholder="MM/DD"
            value={formState.time}
            className="form-input w-100"
            onChange={handleChange}
            autoComplete="off"
          ></input>
        </div>

        <div className="col-2">
          <button className="btn btn-primary btn-block py-3" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
