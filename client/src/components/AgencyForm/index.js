import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_AGENCY} from '../../utils/mutations';
import { QUERY_ALL_AGENCY } from '../../utils/queries';

const AgencyForm = () => {
  const [formState, setFormState] = useState({
    agencyCode: '',
    slotAvailable: '',
  });

  const [addAgency, { error }] = useMutation(ADD_AGENCY, {
    // The update method allows us to access and update the local cache
    update(cache, { data: { addAgency } }) {
      console.log(addAgency);
      console.log(error);
      try {
        const { allAgencySlots } = cache.readQuery({ query: QUERY_ALL_AGENCY });

        // Then we update the cache by combining existing profile data with the newly created data returned from the mutation
        cache.writeQuery({
          query: QUERY_ALL_AGENCY,
          // If we want new data to show up before or after existing data, adjust the order of this array
          data: { allAgencySlots: [addAgency, ...allAgencySlots ] },
        });
      } catch (err) {
        console.error(err);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(`form submitted`);
    console.log(`formstate: ${formState}`);
    console.log(`agencycode: ${typeof parseInt(formState.agencyCode)}`);
    try {
      const { data } = await addAgency({
        variables: {agencyCode: parseInt(formState.agencyCode), slotAvailable: parseInt(formState.slotAvailable)},
      });

      console.log(`data: ${data}`);

      setFormState({
        agencyCode: '',
        slotAvailable: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(`name: ${name}`);
    if (name === 'agencyCode') {
      setFormState({ ...formState, [name]: value });
    } else if (name === 'slotAvailable') {
      setFormState({ ...formState, [name]: value });
    }
  };

  return (
    <div>
      <h3>Please register new agencies here :)</h3>
      <form
        className="flex-row justify-center justify-space-between-md align-center"
        onSubmit={handleFormSubmit}
      >
        <div className="col-4 ">
          <input
            name="agencyCode"
            placeholder="Agency Code"
            value={formState.agencyCode}
            className="form-input w-100"
            style={{ lineHeight: '1.5' }}
            onChange={handleChange}
            autoComplete="off"
          ></input>
        </div>

        <div className="col-6 col-sm-4">
          <input
            name="slotAvailable"
            placeholder="Maximum Slots"
            value={formState.slotAvailable}
            className="form-input w-100"
            style={{ lineHeight: '1.5' }}
            onChange={handleChange}
            autoComplete="off"
          ></input>
        </div>

        <div className="col-2 col-sm-4">
          <button className="btn btn-primary btn-block py-3" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgencyForm;
