import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_SIGN_UP } from '../../utils/mutations';

const DeleteEventForm = ({ agencyCode }) => {
  const [micoId, setmicoId] = useState('');

  const [deleteEvent, { error }] = useMutation(REMOVE_SIGN_UP);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // eslint-disable-next-line
      const { data } = await deleteEvent({
        variables: { 
            agencyCode: parseInt(agencyCode), 
            micoId: parseInt(micoId), 
        },
      });

      setmicoId('');
      window.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    if (name === 'micoId') {
        setmicoId(value);
    } 
  };

  return (
    <div>
        <p><b>Delete appointment if needed</b></p>

      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-10">
          <input
            name="micoId"
            placeholder="Mico ID"
            value={micoId}
            className="form-input w-100"
            onChange={handleChange}
            autoComplete="off"
          ></input>
        </div>

        <div className="col-2">
          <button className="btn btn-primary btn-block py-3" type="submit">
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteEventForm;
