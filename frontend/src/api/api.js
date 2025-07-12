const apiUrl = "http://localhost:5000/";

export const getAllProducts = async () => {
  const res = await fetch(`${apiUrl}api/products`);
  const data = await res.json();
  return data;
};

export const addProduct = (dataToSend) => {
  fetch(`${apiUrl}api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const sellItem = async (item) => {
// routes/productRoutes.js
  const res = await fetch(`${apiUrl}api/products/sell`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Sell failed");
  return res.json();
};

export const updateItem = async (item) => {
  const res = await fetch(`${apiUrl}api/products/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Update failed");
  return res.json();
};

export const deleteItem = async (item) => {
  const res = await fetch(`${apiUrl}api/products/delete`, {
    method: "POST", // or DELETE
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error("Delete failed");
  return res.json();
};
