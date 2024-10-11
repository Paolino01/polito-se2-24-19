import {
    BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
    CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Statistics = () => {
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

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Statistics</h1>
    
          {/* Service Statistics Bar Chart */}
          <div className="mb-12 bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Customers Served Per Service</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serviceData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
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
            <h2 className="text-2xl font-semibold mb-4">Customer Distribution by Counter</h2>
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
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
    
          {/* Counter Service Line Chart */}
          <div className="bg-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Counters Serving Statistics</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={counterData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Haircut" stroke="#8884d8" name="Haircut" />
                <Line type="monotone" dataKey="Shave" stroke="#82ca9d" name="Shave" />
                <Line type="monotone" dataKey="HairWash" stroke="#ffc658" name="Hair Wash" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      );
}

export default Statistics;