import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteItem, getAllProducts, sellItem, updateItem } from "../api/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { format } from "date-fns";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import DeleteForm from "./DeleteForm";
import UpdateForm from "./UpdateForm";
import DynamicModal from "./DynamicModal";
import SellForm from "./SellForm";
import TopMenuBar from "./TopMenuBar";

const Dashboard = ({toast}) => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  isLoading && <h1>Loading...</h1>;
  isError && <h1>{error.message}</h1>;

  const sellMutation = useMutation({
    mutationFn: sellItem,
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });

  const updateMutation = useMutation({
    mutationFn: updateItem,
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });

  const formatDate = (rawDate) => {
    try {
      const parsed = new Date(rawDate);
      return isNaN(parsed.getTime()) ? rawDate : format(parsed, "dd-MM-yyyy");
    } catch {
      return rawDate;
    }
  };

  const calculateTotal = (row) => {
    return (row.qty || 0) * (row.rate || 0);
  };

  const calculateGstAmount = (row) => {
    const total = calculateTotal(row);
    return (total * (row.gst || 0)) / 100;
  };

  const [modalState, setModalState] = useState({
    visible: false,
    title: "",
    ContentComponent: null,
    data: null,
    action: "",
  });

  const openModal = (title, Component, data, action) => {
    setModalState({
      visible: true,
      title,
      ContentComponent: Component,
      data,
      action,
    });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, visible: false }));
  };

  const handleModalSubmit = (formData) => {
    console.log("Submitted:", modalState.data, formData);
    switch (modalState.action) {
      case "sell":
        sellMutation.mutate(formData, {
          onSuccess: () => {
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Product Sell successfully',
                life: 3000
            });
            closeModal();
          },
          onError: (err) => console.error("Sell failed", err),
        });
        break;

      case "update":
        console.log('update', formData);
        updateMutation.mutate(formData, {
          onSuccess: () => {
            toast.current?.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Product updated successfully',
                life: 3000
            });
            closeModal();
          },
          onError: (err) =>{
              console.error("Update failed", err);
              toast.current?.show({
                severity: 'danger',
                summary: 'Error',
                detail: err.message,
                life: 3000
            });

          } 
        });
        break;

      case "delete":
        deleteMutation.mutate(formData, {
          onSuccess: () => {
            closeModal();
          },
          onError: (err) => console.error("Delete failed", err),
        });
        break;

      default:
        console.warn("Unknown modal action:", modalState.action);
    }
    closeModal();
  };

  return (
    <div>
        <TopMenuBar></TopMenuBar>
      <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
        <Column field="id" header="ID" />
        <Column field="agency_details" header="Agency Details" />
        <Column field="invoice_no" header="Invoice No" />
        <Column
          field="invoice_date"
          header="Invoice Date"
          body={(rowData) => formatDate(rowData.exp)}
        />
        <Column field="medicine_name" header="Medicine Name" />
        <Column field="hsn" header="HSN" />
        <Column field="pack" header="Pack" />
        <Column field="mfg" header="MFG" />
        <Column
          field="exp"
          header="EXP"
          body={(rowData) => formatDate(rowData.exp)}
        />
        <Column field="batch" header="Batch" />
        <Column field="qty" header="Qty" />
        <Column field="free" header="Free" />
        <Column field="scheme" header="Scheme" />
        <Column field="mrp" header="MRP" />
        <Column field="rate" header="Rate" />
        <Column field="gst" header="GST" />
        <Column
          header="Total"
          body={(rowData) => (
            <Badge
              value={calculateTotal(rowData).toFixed(2)}
              severity="secondary"
            />
          )}
        />
        <Column
          header="GST Amount"
          body={(rowData) => (
            <Badge
              value={calculateGstAmount(rowData).toFixed(2)}
              severity="secondary"
            />
          )}
        />
        <Column
          header="Actions"
          body={(rowData) => (
            <div className="flex gap-2">
              <Button
                label="Sell"
                severity="success"
                onClick={() =>
                  openModal("Sell Item", SellForm, rowData, "sell")
                }
              />
              <Button
                label="Update"
                severity="info"
                onClick={() =>
                  openModal("Update Item", UpdateForm, rowData, "update")
                }
              />
              <Button
                label="Delete"
                severity="danger"
                onClick={() =>
                  openModal("Delete Item", DeleteForm, rowData, "delete")
                }
              />
            </div>
          )}
        />
      </DataTable>

      <DynamicModal
        visible={modalState.visible}
        title={modalState.title}
        ContentComponent={modalState.ContentComponent}
        data={modalState.data}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default Dashboard;
