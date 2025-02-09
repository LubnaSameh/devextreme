import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const dbPath = path.join(process.cwd(), 'api', 'db.json'); // تأكد إن db.json في مكانه

    // طباعة المسار للتأكد إنه صحيح
    console.log("Database path:", dbPath);

    // اختبار أساسي يثبت إن السيرفر شغال
    if (req.url === "/api") {
        return res.status(200).json({ message: "Server is running on Vercel!" });
    }

    // قراءة ملف db.json
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading database:", err);
            res.status(500).json({ message: "Error reading database", error: err });
            return;
        }

        const db = JSON.parse(data);
        const { url } = req;

        // طباعة URL عشان نعرف المشكلة فين
        console.log("Requested URL:", url);

        // تحقق من كل الـ routes المتاحة
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
    });
}
