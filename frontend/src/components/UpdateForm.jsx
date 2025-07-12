import React, { useState, forwardRef, useImperativeHandle } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";

const UpdateForm = forwardRef(({ data = {} }, ref) => {
  const [formData, setFormData] = useState({
    agency_details: data.agency_details || "",
    invoice_no: data.invoice_no || "",
    invoice_date: new Date(data.invoice_date) || null,
    medicine_name: data.medicine_name || "",
    hsn: data.hsn || "",
    pack: data.pack || "",
    mfg: data.mfg || "",
    exp: new Date(data.exp) || null,
    batch: data.batch || "",
    qty: data.qty || 0,
    free: data.free || 0,
    scheme: data.scheme || 0,
    mrp: data.mrp || 0,
    rate: data.rate || 0,
    gst: data.gst || 0,
  });

  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date.getTime());
  };

  useImperativeHandle(ref, () => ({
    getData: () => ({
      ...data, // keep id, created_at, etc.
      ...formData,
      invoice_date: isValidDate(formData.invoice_date)
        ? formData.invoice_date.toISOString().split("T")[0]
        : null,
      exp: isValidDate(formData.exp)
        ? formData.exp.toISOString().split("T")[0]
        : null,
    }),
  }));

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderInput = (label, name, type = "text") => (
    <div className="field flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <InputText
        id={name}
        value={formData[name]}
        onChange={(e) => handleChange(name, e.target.value)}
      />
    </div>
  );

  const renderNumber = (label, name) => (
    <div className="field flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <InputNumber
        inputId={name}
        value={formData[name]}
        onValueChange={(e) => handleChange(name, e.value)}
        showButtons
      />
    </div>
  );

  const renderDate = (label, name) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <Calendar
        id={name}
        value={formData[name]}
        onChange={(e) => handleChange(name, e.value)}
        dateFormat="yy-mm-dd"
        showIcon
      />
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-3 m-4">
      <div className="">{renderInput("Agency Details", "agency_details")}</div>
      <div className="">{renderInput("Invoice No", "invoice_no")}</div>
      <div className="">{renderInput("Medicine Name", "medicine_name")}</div>
      <div className="">{renderInput("HSN", "hsn")}</div>
      <div className="">{renderInput("Pack", "pack")}</div>
      <div className="">{renderInput("MFG", "mfg")}</div>
      <div className="">{renderInput("Batch", "batch")}</div>
      <div className="">{renderDate("EXP", "exp")}</div>
      <div className="">{renderDate("Invoice Date", "invoice_date")}</div>
      <div className="">{renderNumber("Quantity", "qty")}</div>
      <div className="">{renderNumber("Free", "free")}</div>
      <div className="">{renderNumber("Scheme", "scheme")}</div>
      <div className="">{renderNumber("MRP", "mrp")}</div>
      <div className="">{renderNumber("Rate", "rate")}</div>
      <div className="">{renderNumber("GST", "gst")}</div>
    </div>
  );
});

export default UpdateForm;
