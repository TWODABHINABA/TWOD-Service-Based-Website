import React, { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import api from '../../components/user-management/api';

const AddService = () => {
  const [serviceData, setServiceData] = useState({
    name: '',
    image: '',
    offerDetails: [
      {
        price: '',
        description: {
          heading: '',
          features: '', // comma-separated string for input
        },
      },
    ],
  });

  const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);

const token = localStorage.getItem('token');
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
        if (!token) return;
        const checkAdmin = async () => {
            try {
                const res = await api.get('/admin/me', {
                    headers: {  
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setIsAdmin(res.data.role === 'admin');
            } catch (error) {
                console.error('Failed to check admin status:', error);
                setIsAdmin(false);
            }
        };
        checkAdmin();
    }, [token]);

    useEffect(() => {
    if (token && isAdmin) {
      fetchServices();
    }
  }, [token, isAdmin]);

    if (!token) {
        return <div className="mt-20 text-center text-white" style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>You must be logged in to view this page.</div>;
    }

    if (!isAdmin) {
        return <div className="mt-20 text-center text-white" style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>Only admin has access to this page.</div>;
    }

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get('/services');
      setServiceList(res.data);
    } catch (err) {
      console.error('Failed to fetch services:', err);
    } finally {
      setLoading(false);
    }
  };

  

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setServiceData({
      ...serviceData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
      offerDetails: serviceData.offerDetails.map((od) => ({
        ...od,
        [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
      })),
    });
  };

  const handleOfferDetailChange = (index, field, value, subfield) => {
    const updatedOfferDetails = [...serviceData.offerDetails];
    if (subfield) {
      updatedOfferDetails[index].description[subfield] = value;
    } else {
      updatedOfferDetails[index][field] = value;
    }
    setServiceData({ ...serviceData, offerDetails: updatedOfferDetails });
  };

  const addOfferDetail = () => {
    setServiceData({
      ...serviceData,
      offerDetails: [
        ...serviceData.offerDetails,
        { price: '', description: { heading: '', features: '' } },
      ],
    });
  };

  const removeOfferDetail = (index) => {
    const updatedOfferDetails = serviceData.offerDetails.filter((_, i) => i !== index);
    setServiceData({ ...serviceData, offerDetails: updatedOfferDetails });
  };

  

  const handleEdit = (service) => {
    setEditingServiceId(service._id);
    setServiceData({
      name: service.name || '',
      image: '', // image upload is handled separately; keep empty unless user uploads new
      offerDetails: service.offerDetails.map((od) => ({
        price: od.price,
        description: {
          heading: od.description.heading,
          features: Array.isArray(od.description.features)
            ? od.description.features.join(', ')
            : od.description.features || '',
        },
      })),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const preparedData = {
        name: serviceData.name,
        offerDetails: serviceData.offerDetails.map((od) => ({
          price: Number(od.price),
          description: {
            heading: od.description.heading,
            features: od.description.features
              .split(',')
              .map((f) => f.trim())
              .filter((f) => f),
          },
        })),
        image: serviceData.image,
      };
      if (editingServiceId) {
        await api.patch(`/admin/services/${editingServiceId}`, preparedData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        alert('Service updated successfully!');
      } else {
        await api.post('/admin/newService', preparedData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        alert('Service added successfully!');
      }
      setServiceData({
        name: '',
        offerDetails: [
          { price: '', description: { heading: '', features: '' } },
        ],
      });
      setEditingServiceId(null);
      fetchServices();
    } catch (err) {
      alert(editingServiceId ? 'Failed to update service.' : 'Failed to add service.');
      console.error('Error saving service:', err);
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
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
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
            <label className="block mb-2 font-semibold">Service Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/30 outline-none"
            />
            
          </div>
          <div className="col-span-1">
            <label className="block mb-2 font-semibold">Offer Details</label>
            {serviceData.offerDetails.map((offer, idx) => (
              <div key={idx} className="mb-4 p-4 bg-white/5 rounded-lg border border-white/20">
                <div className="flex gap-2 items-center mb-2">
                  <span className="font-semibold">Offer {idx + 1}</span>
                  {serviceData.offerDetails.length > 1 && (
                    <button type="button" onClick={() => removeOfferDetail(idx)} className="text-red-500 ml-auto">Remove</button>
                  )}
                </div>
                <input
                  type="number"
                  placeholder="Price"
                  value={offer.price}
                  onChange={(e) => handleOfferDetailChange(idx, 'price', e.target.value)}
                  className="w-full mb-2 px-3 py-2 rounded bg-white/10 border border-white/30 outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Heading"
                  value={offer.description.heading}
                  onChange={(e) => handleOfferDetailChange(idx, 'description', e.target.value, 'heading')}
                  className="w-full mb-2 px-3 py-2 rounded bg-white/10 border border-white/30 outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Features (comma separated)"
                  value={offer.description.features}
                  onChange={(e) => handleOfferDetailChange(idx, 'description', e.target.value, 'features')}
                  className="w-full px-3 py-2 rounded bg-white/10 border border-white/30 outline-none"
                  required
                />
              </div>
            ))}
            <button type="button" onClick={addOfferDetail} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Add Offer</button>
          </div>
          <div className="col-span-1 text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white py-3 px-8 rounded-lg text-lg font-semibold"
              disabled={loading}
            >
              {loading ? (editingServiceId ? 'Updating...' : 'Adding...') : (editingServiceId ? 'Update Service' : 'Add Service')}
            </button>
            {editingServiceId && (
              <button
                type="button"
                className="ml-4 bg-gray-500 hover:bg-gray-600 transition duration-300 text-white py-3 px-8 rounded-lg text-lg font-semibold"
                onClick={() => {
                  setEditingServiceId(null);
                  setServiceData({
                    name: '',
                    offerDetails: [
                      { price: '', description: { heading: '', features: '' } },
                    ],
                  });
                }}
              >
                Cancel
              </button>
            )}
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
                <div className="absolute top-4 right-4 flex gap-2">
                  <FiTrash2
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    size={22}
                    onClick={() => handleDelete(service._id)}
                    title="Delete Service"
                  />
                  <button
                    className="ml-2 text-blue-400 hover:text-blue-600 underline text-sm"
                    onClick={() => handleEdit(service)}
                    title="Edit Service"
                    type="button"
                  >
                    Edit
                  </button>
                </div>
                {service.image && service.image.url && (
                  <img src={service.image.url} alt={service.name} className="h-24 w-full object-contain mb-2 rounded" />
                )}
                <h4 className="text-xl font-bold mb-2">{service.name}</h4>
                {service.offerDetails && service.offerDetails.length > 0 && (
                  <div className="mb-2">
                    {service.offerDetails.map((od, i) => (
                      <div key={i} className="mb-2 p-2 bg-white/5 rounded">
                        <div className="font-semibold">Price: {od.price}</div>
                        <div className="font-semibold">{od.description.heading}</div>
                        <ul className="list-disc ml-5 text-sm text-gray-300">
                          {od.description.features && od.description.features.map((f, j) => (
                            <li key={j}>{f}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddService;
