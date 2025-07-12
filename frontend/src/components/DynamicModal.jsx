import React, { useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

const DynamicModal = ({ visible, title, ContentComponent, data, onClose, onSubmit }) => {
  const contentRef = useRef();

  const handleSubmit = () => {
    const formData = contentRef.current?.getData?.();
    if (!formData) {
      console.warn("No form data found");
      return;
    }
    onSubmit?.(formData);
  };

  return (
    <Dialog
      header={title}
      visible={visible}
      modal
      className="responsive-dialog"
      breakpoints={{ '960px': '75vw', '640px': '95vw' }} // PrimeReact built-in breakpoints
      style={{ width: '50vw' }}
      onHide={onClose}
      footer={
        <div className="flex justify-end gap-2">
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
