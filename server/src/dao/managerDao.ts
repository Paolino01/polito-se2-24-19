import db from '../db'; // Import the DB connection

// Get customer stats by service type
export const getCustomerStatsByServiceType = (reportType: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        let query = `
            SELECT 
                t.serviceid, 
                s.name, 
                COUNT(t.serviceid) as customer_count 
            FROM ticket t
            JOIN services s ON t.serviceid = s.serviceid
            WHERE t.date >= date('now', `;
        
        // Adjust the query based on reportType
        if (reportType === 'daily') {
            query += `'start of day')`;  // For daily reports
        } else if (reportType === 'weekly') {
            query += `'now', '-7 days')`;  // For weekly reports
        } else if (reportType === 'monthly') {
            query += `'now', 'start of month')`;  // For monthly reports
        } else {
            return reject(new Error('Invalid report type specified. Use "daily", "weekly", or "monthly".'));
        }

        query += `
            GROUP BY t.serviceid, s.name;
        `;

        db.all(query, (err: Error, rows: any[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Get customer stats by counter
export const getCustomerStatsByCounter = (reportType: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        let query = `
            SELECT 
                t.counterid, 
                t.serviceid, 
                s.name, 
                COUNT(t.serviceid) as customer_count 
            FROM ticket t
            JOIN services s ON t.serviceid = s.serviceid
            WHERE t.date >= date('now', `;

        // Adjust the query based on reportType
        if (reportType === 'daily') {
            query += `'start of day')`;  // For daily reports
        } else if (reportType === 'weekly') {
            query += `'now', '-7 days')`;  // For weekly reports
        } else if (reportType === 'monthly') {
            query += `'now', 'start of month')`;  // For monthly reports
        } else {
            return reject(new Error('Invalid report type specified. Use "daily", "weekly", or "monthly".'));
        }

        query += `
            GROUP BY t.counterid, t.serviceid;
        `;

        db.all(query, (err: Error, rows: any[]) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};