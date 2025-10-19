import React, { useState } from 'react';
import { Car, CreditCard } from 'lucide-react';
import { getAvailabilityColor, generateQRCode, calculatePrice } from '../utils/helpers';

const BookingPage = ({ 
  parkingLots, 
  mlPredictions, 
  cvDetections, 
  currentTime, 
  setBookings, 
  setActiveTab,
  addNotification 
}) => {
  const [selectedLot, setSelectedLot] = useState(parkingLots[0] || null);
  const [selectedDuration, setSelectedDuration] = useState(2);
  const [bookingStep, setBookingStep] = useState(0);

  const handleBooking = () => {
    if (!selectedLot) return;

    const booking = {
      id: Date.now(),
      lot: selectedLot,
      duration: selectedDuration,
      timestamp: new Date(),
      qrCode: generateQRCode(),
      price: calculatePrice(selectedLot.price, selectedDuration)
    };

    setBookings(prev => [booking, ...prev]);
    addNotification(`Booking confirmed at ${selectedLot.name}`, 'success');
    setBookingStep(0);
    setActiveTab('bookings');
  };

  if (!selectedLot) {
    return (
      <div className="text-center py-12">
        <Car className="mx-auto text-gray-400 mb-4" size={64} />
        <p className="text-gray-600">Select a parking lot to book</p>
        <button
          onClick={() => setActiveTab('search')}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Find Parking
        </button>
      </div>
    );
  }

  if (bookingStep === 0) {
    const prediction = mlPredictions[selectedLot.id] || 0.5;
    const cvData = cvDetections[selectedLot.id];
    
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-2">{selectedLot.name}</h2>
          <p className="opacity-90">{selectedLot.location}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="font-bold text-lg mb-4 text-gray-800">Live Parking Data</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Available Slots</span>
              <span className={`font-bold ${getAvailabilityColor(selectedLot.available || 0, selectedLot.total)}`}>
                {selectedLot.available || 0}/{selectedLot.total}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ML Prediction</span>
              <span className="font-semibold text-blue-600">{Math.round(prediction * 100)}% available</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">CV Confidence</span>
              <span className="font-semibold text-green-600">
                {cvData ? `${Math.round(cvData.confidence * 100)}%` : 'Processing...'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Distance</span>
              <span className="font-semibold text-gray-800">{selectedLot.distance}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Price</span>
              <span className="font-semibold text-gray-800">₹{selectedLot.price}/hour</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Updated</span>
              <span className="font-semibold text-gray-800">{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="font-bold text-lg mb-4 text-gray-800">Select Duration</h3>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 6, 8].map(hrs => (
              <button
                key={hrs}
                onClick={() => setSelectedDuration(hrs)}
                className={`border-2 rounded-xl py-3 transition font-semibold ${
                  selectedDuration === hrs
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {hrs} hr
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setBookingStep(1)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition"
        >
          Proceed to Payment
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="font-bold text-lg mb-4 text-gray-800">Payment Summary</h3>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Parking Fee ({selectedDuration} hrs)</span>
            <span className="font-semibold">₹{selectedLot.price * selectedDuration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Platform Fee</span>
            <span className="font-semibold">₹10</span>
          </div>
          <div className="border-t pt-3 flex justify-between text-lg">
            <span className="font-bold text-gray-800">Total</span>
            <span className="font-bold text-blue-600">₹{calculatePrice(selectedLot.price, selectedDuration)}</span>
          </div>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Card Number"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="MM/YY"
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="CVV"
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleBooking}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition flex items-center justify-center gap-2"
      >
        <CreditCard size={20} /> Complete Booking
      </button>
    </div>
  );
};

export default BookingPage;
