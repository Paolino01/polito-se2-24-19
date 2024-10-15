import { getCustomerStatsByServiceType, getCustomerStatsByCounter } from '../dao/managerDao';

// return stats based on selected type(service or counter)
export const getStats = async (type: string): Promise<any> => {
    try {
        if (type === 'service') {
            return await getCustomerStatsByServiceType();  // Fetch service stats
        } else if (type === 'counter') {
            return await getCustomerStatsByCounter();  // Fetch counter stats
        } else {
            throw new Error('Invalid type specified. Use "service" or "counter".');
        }
    } catch (error) {
        throw new Error('Error fetching stats: ' + error);
    }
};