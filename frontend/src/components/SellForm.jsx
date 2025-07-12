import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

const SellForm = forwardRef(({ data }, ref) => {
  const [formData, setFormData] = useState(data);
  const [sellQty, setSellQty] = useState(data.qty);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useImperativeHandle(ref, () => ({
    getData: () => {
      const remainingQty = data.qty - sellQty;

      return {
        ...data,
        qty: remainingQty > 0 ? remainingQty : 0, 
      };
    },
  }));
  return (
    <div className="m-4">
      <Card title="Sell Medicine" className="md:w-25rem">
        <form className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="medicine_name">Medicine Name</label>
            <InputText
              id="medicine_name"
              name="medicine_name"
              value={formData.medicine_name || ""}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="qty">Quantity</label>
            <InputText
              id="qty"
              name="qty"
              onChange={(e) => setSellQty(e.target.value || 0)}
              value={sellQty}
              min={1}
              max={data.qty}
              required
            />
          </div>
        </form>
      </Card>
    </div>
  );
});

export default SellForm;
