// controllers/productController.js
const db = require("../db/database");

function getAllProducts(req, res) {
  try {
    const products = db.prepare("SELECT * FROM products").all();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve products." });
  }
}

function addProduct(req, res) {
  const {
    agency_details,
    invoice_no,
    invoice_date,
    medicine_name,
    hsn,
    pack,
    mfg,
    exp,
    batch,
    qty,
    free,
    scheme,
    mrp,
    rate,
    gst,
  } = req.body;

  const created_at = new Date().toISOString();
  const updated_at = created_at;
  try {
    const stmt = db.prepare(`
      INSERT INTO products (
      agency_details, invoice_no, invoice_date, medicine_name,
      hsn, pack, mfg, exp, batch, qty, free, scheme,
      mrp, rate, gst,
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(
      agency_details,
      invoice_no,
      invoice_date,
      medicine_name,
      hsn,
      pack,
      mfg,
      exp,
      batch,
      qty,
      free,
      scheme,
      mrp,
      rate,
      gst,
      created_at,
      updated_at
    );
    res
      .status(201)
      .json({ message: "Product created.", id: info.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: "Failed to create product." });
  }
}

function updateProduct(req, res) {
  const {
    id,
    agency_details,
    invoice_no,
    invoice_date,
    medicine_name,
    hsn,
    pack,
    mfg,
    exp,
    batch,
    qty,
    free,
    scheme,
    mrp,
    rate,
    gst,
  } = req.body;

  const updated_at = new Date().toISOString();

  try {
    const stmt = db.prepare(`
      UPDATE products SET
        agency_details = ?, invoice_no = ?, invoice_date = ?, medicine_name = ?,
        hsn = ?, pack = ?, mfg = ?, exp = ?, batch = ?, qty = ?, free = ?, scheme = ?,
        mrp = ?, rate = ?, gst = ?, updated_at = ?
      WHERE id = ?
    `);
    const info = stmt.run(
      agency_details,
      invoice_no,
      invoice_date,
      medicine_name,
      hsn,
      pack,
      mfg,
      exp,
      batch,
      qty,
      free,
      scheme,
      mrp,
      rate,
      gst,
      updated_at,
      id
    );

    if (info.changes === 0) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.json({ message: "Product updated." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update product." });
  }
}

function sellProduct(req, res) {
  const { id, qty } = req.body; // qty should be the updated quantity (after selling)
  const updated_at = new Date().toISOString();

  try {
    const stmt = db.prepare(`
      UPDATE products
      SET qty = ?, updated_at = ?
      WHERE id = ?
    `);
    const info = stmt.run(qty, updated_at, id);

    if (info.changes === 0) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.json({ message: "Product sold and quantity updated." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to sell product." });
  }
}

function deleteProduct(req, res) {
  const { id } = req.body;

  try {
    const stmt = db.prepare(`DELETE FROM products WHERE id = ?`);
    const info = stmt.run(id);

    if (info.changes === 0) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.json({ message: "Product deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete product." });
  }
}

module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  sellProduct,
  deleteProduct,
};
