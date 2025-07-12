import React, { useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const DynamicModal = ({ visible, title, ContentComponent, data, onClose, onSubmit }) => {
  const contentRef = useRef();

  const handleSubmit = () => {
  const formData = contentRef.current?.getData?.();
  if (!formData) {
    console.warn("No form data found");
    return;
  }

  onSubmit?.(formData); // 🔁 passes latest data to Dashboard
};

  return (
    <Dialog
      header={title}
      visible={visible}
      modal
      style={{ width: '50vw' }}
      onHide={onClose}
      footer={
        <div>
          <Button label="Cancel" icon="pi pi-times" onClick={onClose} className="p-button-text" />
          <Button label="Submit" icon="pi pi-check" onClick={handleSubmit} />
        </div>
      }
    >
      {ContentComponent && <ContentComponent ref={contentRef} data={data} />}
    </Dialog>
  );
};

export default DynamicModal;
