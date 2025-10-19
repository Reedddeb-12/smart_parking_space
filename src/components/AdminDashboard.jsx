import React, { useState } from 'react';
import { MapPin, Users, BarChart3, Activity, Plus, Edit2, Trash2, Save } from 'lucide-react';
import { getAvailabilityColor } from '../utils/helpers';

const AdminDashboard = ({ 
  parkingLots, 
  setParkingLots, 
  bookings, 
  mlPredictions, 
  cvDetections,
  addNotification 
}) => {
  const [showAddLotForm, setShowAddLotForm] = useState(false);
  const [editingLot, setEditingLot] = useState(null);
  const [newLotForm, setNewLotForm] = useState({
    name: '', location: '', total: '', distance: '', price: '', lat: '', lng: ''
  });

  const handleAddLot = () => {
    if (!newLotForm.name || !newLotForm.location || !newLotForm.total || !newLotForm.price) {
      alert('Please fill all required fields');
      return;
    }

    const newLot = {
      id: Date.now(),
      name: newLotForm.name,
      location: newLotForm.location,
      total: parseInt(newLotForm.total),
      distance: newLotForm.distance || '0 km',
      price: parseInt(newLotForm.price),
      coords: {
        lat: parseFloat(newLotForm.lat) || 0,
        lng: parseFloat(newLotForm.lng) || 0
      },
      available: parseInt(newLotForm.total)
    };

    setParkingLots(prev => [...prev, newLot]);
    addNotification(`Added parking lot: ${newLot.name}`, 'success');
    setShowAddLotForm(false);
    setNewLotForm({ name: '', location: '', total: '', distance: '', price: '', lat: '', lng: '' });
  };

  const handleEditLot = (lot) => {
    setEditingLot(lot.id);
    setNewLotForm({
      name: lot.name,
      location: lot.location,
      total: lot.total.toString(),
      distance: lot.distance,
      price: lot.price.toString(),
      lat: lot.coords.lat.toString(),
      lng: lot.coords.lng.toString()
    });
  };

  const handleUpdateLot = () => {
    setParkingLots(prev => prev.map(lot => 
      lot.id === editingLot ? {
        ...lot,
        name: newLotForm.name,
        location: newLotForm.location,
        total: parseInt(newLotForm.total),
        distance: newLotForm.distance,
        price: parseInt(newLotForm.price),
        coords: { lat: parseFloat(newLotForm.lat), lng: parseFloat(newLotForm.lng) }
      } : lot
    ));
    addNotification('Parking lot updated', 'success');
    setEditingLot(null);
    setNewLotForm({ name: '', location: '', total: '', distance: '', price: '', lat: '', lng: '' });
  };

  const handleDeleteLot = (id) => {
    if (window.confirm('Are you sure you want to delete this parking lot?')) {
      setParkingLots(prev => prev.filter(lot => lot.id !== id));
      addNotification('Parking lot deleted', 'success');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <MapPin className="text-blue-600 mb-3" size={32} />
          <div className="text-2xl font-bold text-gray-800">{parkingLots.length}</div>
          <div className="text-sm text-gray-600">Total Parking Lots</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <Users className="text-green-600 mb-3" size={32} />
          <div className="text-2xl font-bold text-gray-800">{bookings.length}</div>
          <div className="text-sm text-gray-600">Total Bookings</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <BarChart3 className="text-purple-600 mb-3" size={32} />
          <div className="text-2xl font-bold text-gray-800">
            {parkingLots.reduce((acc, lot) => acc + (lot.available || 0), 0)}
          </div>
          <div className="text-sm text-gray-600">Available Slots</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <Activity className="text-orange-600 mb-3" size={32} />
          <div className="text-2xl font-bold text-gray-800">95%</div>
          <div className="text-sm text-gray-600">System Uptime</div>
        </div>
      </div>

      {/* Add Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowAddLotForm(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition flex items-center gap-2"
        >
          <Plus size={20} /> Add New Parking Lot
        </button>
      </div>

      {/* Form */}
      {(showAddLotForm || editingLot) && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {editingLot ? 'Edit Parking Lot' : 'Add New Parking Lot'}
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Parking Lot Name *</label>
              <input
                type="text"
                value={newLotForm.name}
                onChange={(e) => setNewLotForm({...newLotForm, name: e.target.value})}
                placeholder="e.g., City Center Mall"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
              <input
                type="text"
                value={newLotForm.location}
                onChange={(e) => setNewLotForm({...newLotForm, location: e.target.value})}
                placeholder="e.g., Sector 17, Chandigarh"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Total Slots *</label>
              <input
                type="number"
                value={newLotForm.total}
                onChange={(e) => setNewLotForm({...newLotForm, total: e.target.value})}
                placeholder="e.g., 200"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price per Hour (₹) *</label>
              <input
                type="number"
                value={newLotForm.price}
                onChange={(e) => setNewLotForm({...newLotForm, price: e.target.value})}
                placeholder="e.g., 40"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Distance (Optional)</label>
              <input
                type="text"
                value={newLotForm.distance}
                onChange={(e) => setNewLotForm({...newLotForm, distance: e.target.value})}
                placeholder="e.g., 2.5 km"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Latitude (Optional)</label>
              <input
                type="number"
                step="0.000001"
                value={newLotForm.lat}
                onChange={(e) => setNewLotForm({...newLotForm, lat: e.target.value})}
                placeholder="e.g., 30.741"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Longitude (Optional)</label>
              <input
                type="number"
                step="0.000001"
                value={newLotForm.lng}
                onChange={(e) => setNewLotForm({...newLotForm, lng: e.target.value})}
                placeholder="e.g., 76.768"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={editingLot ? handleUpdateLot : handleAddLot}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition flex items-center gap-2"
            >
              <Save size={18} /> {editingLot ? 'Update' : 'Save'} Parking Lot
            </button>
            <button
              onClick={() => {
                setShowAddLotForm(false);
                setEditingLot(null);
                setNewLotForm({ name: '', location: '', total: '', distance: '', price: '', lat: '', lng: '' });
              }}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Parking Lots List */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Manage Parking Lots</h3>
        {parkingLots.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="mx-auto text-gray-400 mb-4" size={64} />
            <p className="text-gray-600 mb-4">No parking lots added yet</p>
            <button
              onClick={() => setShowAddLotForm(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add Your First Parking Lot
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {parkingLots.map(lot => {
              const prediction = mlPredictions[lot.id] || 0.5;
              
              return (
                <div key={lot.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-800">{lot.name}</h4>
                      <p className="text-gray-600 text-sm">{lot.location}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                        <div>
                          <span className="text-xs text-gray-500">Total Slots</span>
                          <p className="font-semibold">{lot.total}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Available</span>
                          <p className={`font-semibold ${getAvailabilityColor(lot.available || 0, lot.total)}`}>
                            {lot.available || 0}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">Price/hr</span>
                          <p className="font-semibold">₹{lot.price}</p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">ML Prediction</span>
                          <p className="font-semibold text-blue-600">{Math.round(prediction * 100)}%</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEditLot(lot)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteLot(lot.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
