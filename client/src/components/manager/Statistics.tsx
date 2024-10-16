import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axiosInstance from '../../utils/axiosInstance';


const Statistics = () => {
    const [timeRange, setTimeRange] = useState('daily'); // day, week, month
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selectedCounter, setSelectedCounter] = useState('');

    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    const months = [
        { value: 'January', label: 'January' },
        { value: 'February', label: 'February' },
        { value: 'March', label: 'March' },
        { value: 'April', label: 'April' },
        { value: 'May', label: 'May' },
        { value: 'June', label: 'June' },
        { value: 'July', label: 'July' },
        { value: 'August', label: 'August' },
        { value: 'September', label: 'September' },
        { value: 'October', label: 'October' },
        { value: 'November', label: 'November' },
        { value: 'December', label: 'December' },
    ];
    
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

    const handleDateChange = (date : any) => {
        setSelectedDate(date);
    }

    const handleMonthChange = (month : any) => {
        setSelectedMonth(month);
    }

    const handleYearChange = (year : any) => {
        setSelectedYear(year);
    }

    const handleServiceChange = (service : any) => {
        setSelectedService(service);
    }

    const handleCounterChange = (counter : any) => {
        setSelectedCounter(counter);
    }

    const handleTimeRangeChange = (timeRange : any) => {
        setTimeRange(timeRange);
    }

    const handleSubmit = async () => {
        let filters = {
            timeRange: timeRange,
            date: '',
            month: '',
            service: selectedService,
            counter: selectedCounter
        }

        if (timeRange === 'daily' && !selectedDate) return
        if (timeRange === 'monthly' && (!selectedMonth || !selectedCounter)) return

        if (timeRange === 'daily') {
            filters = { ...filters, date: selectedDate}
        } else if (timeRange === 'monthly') {
            filters = { ...filters, month: selectedMonth + selectedYear}
        } 

        try {
            const response = await axiosInstance.get('/manager/seeStats', { params: filters });
            console.log(response.data);
        } catch (error) {}
    }

    // Sample data
    const data = [
        { service: 'Service 1', counter: 'Counter 1', clientsServed: 12 },
        { service: 'Service 1', counter: 'Counter 2', clientsServed: 8 },
        { service: 'Service 2', counter: 'Counter 1', clientsServed: 19 },
        { service: 'Service 2', counter: 'Counter 2', clientsServed: 14 },
        { service: 'Service 3', counter: 'Counter 1', clientsServed: 3 },
        { service: 'Service 3', counter: 'Counter 2', clientsServed: 7 },
    ];

    const filteredTotal = data
        .filter(item => 
        (selectedService === 'All' || item.service === selectedService) &&
        (selectedCounter === 'All' || item.counter === selectedCounter)
        )
        .reduce((total, item) => total + item.clientsServed, 0);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Section des filtres */}
            <div className="flex flex-col md:flex-row justify-between mb-8 mt-16">
                <div className="flex space-x-4 mb-4 md:mb-0">
                    <select
                        className="p-2 border rounded"
                        value={timeRange}
                        onChange={(e) => handleTimeRangeChange(e.target.value)}>
                        <option value="daily">Day</option>
                        <option value="weekly">Week</option>
                        <option value="monthly">Month</option>
                    </select>
        
                    {/* Sélecteur basé sur timeRange */}
                    {
                        timeRange === 'daily' ? (
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => handleDateChange(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select a date"
                            className="p-2 border rounded cursor-pointer"/>
                        ) : timeRange === 'weekly' ? (
                            <span></span> // Utilisation de la logique spécifique à la semaine si besoin
                        ) : (
                            <div className="flex space-x-2">
                                <select
                                    className="p-2 border rounded cursor-pointer"
                                    value={selectedMonth}
                                    onChange={(e) => handleMonthChange(e.target.value)}>
                                    
                                    <option value="">Select Month</option>
                                    {months.map((month) => (
                                    <option key={month.value} value={month.value}>
                                        {month.label}
                                    </option>
                                    ))}
                                </select>
                    
                                <select
                                    className="p-2 border rounded cursor-pointer"
                                    value={selectedYear}
                                    onChange={(e) => handleYearChange(e.target.value)}>
                                    
                                    <option value="">Select Year</option>
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )
                    }
        
                    <select
                        className="p-2 border rounded cursor-pointer"
                        value={selectedService}
                        onChange={(e) => handleServiceChange(e.target.value)}>
                        <option value="All">All Services</option>
                        <option value="Service 1">Service 1</option>
                        <option value="Service 2">Service 2</option>
                        <option value="Service 3">Service 3</option>
                    </select>
            
                    <select
                        className="p-2 border rounded cursor-pointer"
                        value={selectedCounter}
                        onChange={(e) => handleCounterChange(e.target.value)}>
                        <option value="All">All Counters</option>
                        <option value="Counter 1">Counter 1</option>
                        <option value="Counter 2">Counter 2</option>
                    </select>
            
                    <button className="p-2 bg-blue-500 text-white rounded">Apply Filters</button>
                </div>
            </div>

            {/* Section d'affichage des données */}
            <div className="bg-white p-6 rounded shadow mb-8">
                <h2 className="text-lg font-semibold mb-4">Total Clients Served</h2>
                <p className="text-2xl font-bold text-center">{filteredTotal}</p>
            </div>
            
            {/* Section des indicateurs de performance */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded shadow text-center">
                    <h3 className="text-sm font-medium text-gray-500">Total Clients Today</h3>
                    <p className="text-2xl font-bold">56</p>
                </div>
                <div className="bg-white p-6 rounded shadow text-center">
                    <h3 className="text-sm font-medium text-gray-500">Total Clients This Week</h3>
                    <p className="text-2xl font-bold">340</p>
                </div>
                <div className="bg-white p-6 rounded shadow text-center">
                    <h3 className="text-sm font-medium text-gray-500">Total Clients This Month</h3>
                    <p className="text-2xl font-bold">1245</p>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
