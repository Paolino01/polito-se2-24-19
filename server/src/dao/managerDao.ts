import db from '../db'; // Import the DB connection

export const getCustomerStatsByServiceType = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                t.serviceid, 
                s.name, 
                COUNT(t.serviceid) as customer_count 
            FROM ticket t
            JOIN services s ON t.serviceid = s.serviceid
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

// Get stats by counter
export const getCustomerStatsByCounter = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                t.counterid, 
                t.serviceid, 
                s.name, 
                COUNT(t.serviceid) as customer_count 
            FROM ticket t
            JOIN services s ON t.serviceid = s.serviceid
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