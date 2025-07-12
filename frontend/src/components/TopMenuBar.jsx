// components/TopMenuBar.jsx
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom'; // optional if using React Router

const TopMenuBar = () => {
  const navigate = useNavigate(); // remove if not using routing

  const items = [
    {
      label: 'Create Product',
      icon: 'pi pi-plus',
      command: () => navigate('/add-product') // or trigger modal
    },
    {
      label: 'All Products',
      icon: 'pi pi-box',
      command: () => navigate('/dashboard')
    }
  ];

  const start = <h1>MyGlobalApp</h1>;
  const end = <span className="text-sm text-gray-600">Welcome, Iqbal</span>;

  return (
    <div className="mb-4">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
};

export default TopMenuBar;
