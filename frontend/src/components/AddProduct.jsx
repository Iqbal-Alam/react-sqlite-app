import React, { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import "./AddProduct.css"; // Add custom styles for the two-column form
import { Calendar } from "primereact/calendar";
import { useMutation } from "@tanstack/react-query";
import { addProduct } from "../api/api";

const AddProduct = () => {
  // Form state
  const [formData, setFormData] = useState({
    agency_details: "",
    invoice_no: "",
    invoice_date: new Date(),
    medicine_name: "",
    hsn: "",
    pack: "1 * ",
    mfg: "",
    exp: "",
    batch: "",
    qty: null,
    free: 0,
    scheme: 0,
    mrp: null,
    rate: null,
    gst: null,
  });

  const mutation = useMutation({
    mutationKey: ['add-product'],
    mutationFn: addProduct,
    onSuccess: (data)=>{
        console.log('success', data);
    },
    onError: (err)=>{
        console.log(err.message);
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = React.useRef(null);
  //   const total = formData.qty * formData.rate;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit form data to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate(formData);
    // setIsSubmitting(true);

    // try {
    //   const response = await fetch("http://your-api-endpoint/add-product", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     toast.current.show({
    //       severity: "success",
    //       summary: "Success",
    //       detail: "Product added successfully!",
    //       life: 3000,
    //     });
    //     setFormData({
    //       agency_details: "",
    //       invoice_no: "",
    //       invoice_date: "",
    //       medicine_name: "",
    //       hsn: "",
    //       pack: "",
    //       mfg: "",
    //       exp: "",
    //       batch: "",
    //       qty: null,
    //       free: null,
    //       scheme: "",
    //       mrp: null,
    //       rate: null,
    //       gst: null,
    //     });
    //   } else {
    //     throw new Error(data.error || "Failed to add product");
    //   }
    // } catch (error) {
    //   toast.current.show({
    //     severity: "error",
    //     summary: "Error",
    //     detail: error.message,
    //     life: 3000,
    //   });
    // } finally {
    //   setIsSubmitting(false);
    // }
  };
  const total = formData.qty * formData.rate;
  const gstAmount = (total * formData.gst) / 100;
  return (
    <div className="add-product-container">
      <Toast ref={toast} />

      <Card title="Add New Medicine">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="agency_details">Agency Details</label>
            <InputText
              id="agency_details"
              name="agency_details"
              value={formData.agency_details}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="invoice_no">Invoice No</label>
            <InputText
              id="invoice_no"
              name="invoice_no"
              value={formData.invoice_no}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="invoice_date">Invoice Date</label>
            <Calendar
              id="invoice_date"
              name="invoice_date"
              value={formData.invoice_date}
              onChange={handleChange}
              required
              dateFormat="yy-mm-dd"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="medicine_name">Medicine Name</label>
            <InputText
              id="medicine_name"
              name="medicine_name"
              value={formData.medicine_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="hsn">HSN</label>
            <InputText
              id="hsn"
              name="hsn"
              value={formData.hsn}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="pack">Pack</label>
            <InputText
              id="pack"
              name="pack"
              value={formData.pack}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="mfg">MFG</label>
            <InputText
              id="mfg"
              name="mfg"
              value={formData.mfg}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="exp">EXP</label>
            <InputText
              id="exp"
              name="exp"
              value={formData.exp}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="batch">Batch</label>
            <InputText
              id="batch"
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="qty">Quantity</label>
            <InputNumber
              id="qty"
              name="qty"
              value={formData.qty}
              onValueChange={(e) =>
                handleChange({ target: { name: "qty", value: e.value } })
              }
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="free">Free</label>
            <InputNumber
              id="free"
              name="free"
              value={formData.free}
              onValueChange={(e) =>
                handleChange({ target: { name: "free", value: e.value } })
              }
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="scheme">Scheme</label>
            <InputText
              id="scheme"
              name="scheme"
              value={formData.scheme}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="mrp">MRP</label>
            <InputNumber
              id="mrp"
              name="mrp"
              value={formData.mrp}
              onValueChange={(e) =>
                handleChange({ target: { name: "mrp", value: e.value } })
              }
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="rate">Rate</label>
            <InputNumber
              id="rate"
              name="rate"
              value={formData.rate}
              onValueChange={(e) =>
                handleChange({ target: { name: "rate", value: e.value } })
              }
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="total">Total</label>
            <InputNumber
              id="total"
              name="total"
              value={total}
              readOnly
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="gst">GST</label>
            <InputNumber
              id="gst"
              name="gst"
              value={formData.gst}
              onValueChange={(e) =>
                handleChange({ target: { name: "gst", value: e.value } })
              }
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="tax_gst_amt">Tax GST Amt</label>
            <InputNumber
              id="tax_gst_amt"
              name="tax_gst_amt"
              value={gstAmount}
              readOnly
              required
            />
          </div>
          
          <div className="col-span-2 ">
            <Button
              label={isSubmitting ? "Submitting..." : "Submit"}
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddProduct;
