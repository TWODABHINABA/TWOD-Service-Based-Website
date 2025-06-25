import React, { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import api from '../../components/user-management/api';

const AddService = () => {
  const [serviceData, setServiceData] = useState({
    name: '',
    description: '',
    icon: '',
    price: '',
  });

  const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/services');
      setServiceList(res.data);
    } catch (err) {
      console.error('Failed to fetch services:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setServiceData({ ...serviceData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post('/admin/newService', serviceData);
      alert('Service added successfully!');
      setServiceData({
        name: '',
        description: '',
        icon: '',
        price: '',
      });
      fetchServices();
    } catch (err) {
      alert('Failed to add service.');
      console.error('Error adding service:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/services/${id}`);
      alert('Service deleted successfully!');
      fetchServices();
    } catch (err) {
      alert('Failed to delete service.');
      console.error('Error deleting service:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pt-32 px-4 text-white">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
        <h2 className="text-3xl font-bold mb-6 text-center">Add New Service</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1">
            <label className="block mb-2 font-semibold">Service Name</label>
            <input
              type="text"
              name="name"
              value={serviceData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 font-semibold">Icon (Emoji)</label>
            <input
              type="text"
              name="icon"
              value={serviceData.icon}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 🌐"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block mb-2 font-semibold">Price</label>
            <input
              type="text"
              name="price"
              value={serviceData.price}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. $99 or Starting at $49"
              required
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block mb-2 font-semibold">Description</label>
            <textarea
              name="description"
              value={serviceData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>

          <div className="col-span-1 md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white py-3 px-8 rounded-lg text-lg font-semibold"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Service'}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6">Service Listings</h3>
        {loading ? (
          <p className="text-gray-300 text-center">Loading services...</p>
        ) : serviceList.length === 0 ? (
          <p className="text-gray-300 text-center">No services added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceList.map((service) => (
              <div
                key={service._id}
                className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl shadow-md relative"
              >
                <div className="absolute top-4 right-4">
                  <FiTrash2
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    size={22}
                    onClick={() => handleDelete(service._id)}
                    title="Delete Service"
                  />
                </div>
                <div className="text-4xl mb-3">{service.icon}</div>
                <h4 className="text-xl font-bold mb-2">{service.name}</h4>
                <p className="font-semibold text-lg mb-2">{service.price}</p>
                <p className="text-gray-300 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddService;
