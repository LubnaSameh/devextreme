import fs from 'fs'; // عشان نقرأ ملف db.json
import path from 'path'; // عشان نحدد المسار

export default function handler(req, res) {
    const dbPath = path.join(process.cwd(), 'api', 'db.json'); // تحديد مكان db.json

    // قراءة البيانات من ملف JSON
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ message: "Error reading database", error: err });
            return;
        }

        // تحويل البيانات من String إلى JSON
        const db = JSON.parse(data);
        const { url } = req;

        // تحديد أي Route المفروض يشتغل
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
            res.status(404).json({ message: "Not Found" });
        }
    });
}
