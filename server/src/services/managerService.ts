import { getCustomerStatsByServiceType, getCustomerStatsByCounter } from '../dao/managerDao';

// Return stats based on selected type (service or counter) and reportType (daily, weekly, monthly)
export const getStats = async (type: string, reportType: string): Promise<any> => {
    try {
        if (type === 'service') {
            return await getCustomerStatsByServiceType(reportType);  
        } else if (type === 'counter') {
            return await getCustomerStatsByCounter(reportType);  
        } else {
            throw new Error('Invalid type specified. Use "service" or "counter".');
        }
    } catch (error) {
        throw new Error('Error fetching stats: ' + error);
    }
};