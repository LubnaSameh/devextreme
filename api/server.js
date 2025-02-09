import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// حل مشكلة __dirname في ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
    const dbPath = path.join(__dirname, 'db.json'); // تأكد إن `db.json` في نفس الفولدر

    try {
        const data = await readFile(dbPath, 'utf8');
        const db = JSON.parse(data);
        const { url } = req;

        if (url.includes('/api/employees')) {
            res.status(200).json(db.employees);
        } else if (url.includes('/api/orders')) {
            res.status(200).json(db.orders);
        } else if (url.includes('/api/appointments')) {
            res.status(200).json(db.appointments);
        } else if (url.includes('/api/sales')) {
            res.status(200).json(db.sales);
        } else if (url.includes('/api/products')) {
            res.status(200).json(db.products);
        } else if (url.includes('/api/stock_prices')) {
            res.status(200).json(db.stock_prices);
        } else {
            console.error("404 Not Found for URL:", url);
            res.status(404).json({ message: "Not Found" });
        }
    } catch (err) {
        console.error("Error reading database:", err);
        res.status(500).json({ message: "Error reading database", error: err });
    }
}
