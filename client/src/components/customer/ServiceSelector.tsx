import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
// import { useGetServicesQuery, useAddCustomerMutation } from './features/api/apiSlice'


const ServiceSelector = () => {
    const [selectedService, setSelectedService] = useState('')
    const [requestOK, setRequestOK] = useState(false)

    // const {
    //   data: servicesData,
    //   isLoading,
    //   isSuccess,
    //   isError,
    //   error,
    // } = useGetServicesQuery()
    const services = [
        ["Haircut", 30],
        ["Shave", 15],
        ["Hair wash", 20],
        ["Beard trim", 15],
        ["Hair coloring", 45],
        ["Facial", 60],
        ["Manicure", 45],
        ["Pedicure", 45],
        ["Massage", 60],
    ]
    // const [addCustomer] = useAddCustomerMutation()

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        // addCustomer({ service: selectedService })
        setRequestOK(true)
        console.log(selectedService)
    }

    const handleServiceChange = (event: any) => {
        setSelectedService(event.target.value)
    }
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
          {
            !requestOK ? (
            <form 
              onSubmit={handleSubmit} 
              action="#" 
              method="post" 
              className="bg-white shadow-lg rounded-lg max-w-lg w-full p-8 m-4 border"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Choose Your Service</h2>

              <label htmlFor="services" className="block text-lg font-medium text-gray-700 mb-2">Select a Service</label>
              
              <select 
                value={selectedService} 
                onChange={handleServiceChange} 
                className="block w-full py-3 px-4 mb-6 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500" 
                id="services" 
                name="services"
              >
                <option value="" disabled>Select a service</option>
                {services.map((service, index) => (
                  <option key={index} value={service[0]}>{service[0]} - {service[1]} mins</option>
                ))}
              </select>

              <button 
                type="submit" 
                className="w-full py-3 px-6 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-500 transition duration-300 ease-in-out"
              >
                Submit
              </button>
            </form>
          ) : (
            <div className="bg-white shadow-lg rounded-lg max-w-lg w-full p-8 m-4 border text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Here's Your QR Code!</h2>
              <p className="text-gray-700 mb-4">Scan the QR code to get your ticket</p>
              <QRCodeSVG className="mx-auto mb-6" value="https://reactjs.org" size={180} />
              <button 
                onClick={() => setRequestOK(false)}
                className="w-full py-3 px-6 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-500 transition duration-300 ease-in-out"
              >
                Go Back
              </button>
            </div>
          )}
        </div>
      );
}

export default ServiceSelector