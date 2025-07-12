import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';

const EditForm = ({ data }) => {
//   const [name, setName] = useState('');

//   useEffect(() => {
//     setName(data?.name || '');
//   }, [data]);

  return (
    <div className="field m-4">
      <label htmlFor="name">EditForm: {JSON.stringify(data)}</label>
      {/* <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full" /> */}
    </div>
  );
};

export default EditForm;
