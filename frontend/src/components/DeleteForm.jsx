import React, { forwardRef, useImperativeHandle } from 'react';
import { Message } from 'primereact/message';

const DeleteForm = forwardRef(({ data }, ref) => {
  useImperativeHandle(ref, () => ({
    getData: () => ({
      id: data?.id,
    }),
  }));

  return (
    <div className="p-4">
      <Message
        severity="warn"
        text={`Are you sure you want to delete "${data?.medicine_name}" (Invoice: ${data?.invoice_no})?`}
      />
    </div>
  );
});

export default DeleteForm;
