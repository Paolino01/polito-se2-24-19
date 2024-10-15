import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import '../../App.css'; 


const Statistics = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [selectedService, setSelectedService] = useState<string>('All Services');
  const [selectedCounter, setSelectedCounter] = useState<string>('All Counters');

  const serviceData = [
    { name: 'Haircut', daily: 15, weekly: 90, monthly: 350 },
    { name: 'Shave', daily: 10, weekly: 70, monthly: 280 },
    { name: 'Hair wash', daily: 8, weekly: 50, monthly: 200 },
    { name: 'Beard trim', daily: 5, weekly: 40, monthly: 150 },
    { name: 'Facial', daily: 3, weekly: 20, monthly: 80 },
  ];

  const counterData = [
    { name: 'Counter 1', Haircut: 50, Shave: 30, HairWash: 20 },
    { name: 'Counter 2', Haircut: 40, Shave: 25, HairWash: 15 },
    { name: 'Counter 3', Haircut: 30, Shave: 20, HairWash: 10 },
    { name: 'Counter 4', Haircut: 20, Shave: 15, HairWash: 5 },
  ];

  const pieData = [
    { name: 'Counter 1', value: 100 },
    { name: 'Counter 2', value: 80 },
    { name: 'Counter 3', value: 60 },
    { name: 'Counter 4', value: 40 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Handle Service and Counter Filtering
  const filteredServiceData = selectedService === 'All Services' 
    ? serviceData 
    : serviceData.filter(service => service.name === selectedService);

  const filteredCounterData = selectedCounter === 'All Counters'
    ? counterData
    : counterData.map(counter => ({ 
        name: counter.name, 
        [selectedService]: counter[selectedService as keyof typeof counter] || 0 
      }));

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-16">
        Statistics
      </h1>

      {/* Date Picker and Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <label className="block text-lg font-semibold mb-2">Select Date Range</label>
          
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg">
          <label className="block text-lg font-semibold mb-2">Filter by Service</label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="block border rounded py-2 px-4"
          >
            <option>All Services</option>
            <option>Haircut</option>
            <option>Shave</option>
            <option>Hair wash</option>
            <option>Beard trim</option>
            <option>Facial</option>
          </select>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg">
          <label className="block text-lg font-semibold mb-2">Filter by Counter</label>
          <select
            value={selectedCounter}
            onChange={(e) => setSelectedCounter(e.target.value)}
            className="block border rounded py-2 px-4">
            <option>All Counters</option>
            <option>Counter 1</option>
            <option>Counter 2</option>
            <option>Counter 3</option>
            <option>Counter 4</option>
          </select>
        </div>
      </div>

      {/* Service Statistics Bar Chart */}
      <div className="mb-12 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Customers Served Per Service</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredServiceData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="daily" fill="#8884d8" name="Daily" />
            <Bar dataKey="weekly" fill="#82ca9d" name="Weekly" />
            <Bar dataKey="monthly" fill="#ffc658" name="Monthly" />
          </BarChart>
        </ResponsiveContainer>
      </div>


      {/* Counter Distribution Pie Chart */}
      <div className="mb-12 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Customer Distribution by Counter
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Counter Service Line Chart */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Counters Serving Statistics
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={counterData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Haircut"
              stroke="#8884d8"
              name="Haircut"
            />
            <Line
              type="monotone"
              dataKey="Shave"
              stroke="#82ca9d"
              name="Shave"
            />
            <Line
              type="monotone"
              dataKey="HairWash"
              stroke="#ffc658"
              name="Hair Wash"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;
