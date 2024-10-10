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
        <div className="w-full h-full">
    
          {
            !requestOK &&
    
            <form onSubmit={handleSubmit} action="#" method="post" className="max-w-[800px] mx-auto my-20">
    
              <label htmlFor="services" className="text-3xl font-semibold">Select the service you want</label><br/>
    
              <select value={selectedService} onChange={handleServiceChange} className="my-10 py-2 px-4 border rounded" id="services" name="services">
                <option value="" disabled>Select a service</option>
                {
                  services.map((service, index) => {
                    return <option key={index} value={service[0]}>{service[0]} - {service[1]} mns</option>
                  })
                }
              </select><br/>
    
              <button type="submit" className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-500">Submit</button>
            </form>
          }
    
          {
            requestOK &&
            <div className="max-w-[800px] mx-auto my-20">
              <p className="text-3xl font-semibold">Scan the QR code to get your ticket ;)</p>
              <QRCodeSVG className="my-10" value="https://reactjs.org" />
            </div>
          }
    
        </div>
      )
    
}

export default ServiceSelector