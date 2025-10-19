import React from 'react';
import { Calendar } from 'lucide-react';

const MyBookings = ({ bookings, setActiveTab }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">My Bookings</h2>
      
      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
          <Calendar className="mx-auto text-gray-400 mb-4" size={64} />
          <p className="text-gray-600">No bookings yet</p>
          <button
            onClick={() => setActiveTab('search')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Find Parking
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => (
            <div key={booking.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{booking.lot.name}</h3>
                  <p className="text-gray-600">{booking.lot.location}</p>
                </div>
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Active
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold">{booking.duration} hours</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Paid</p>
                  <p className="font-semibold">₹{booking.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Booked At</p>
                  <p className="font-semibold">{booking.timestamp.toLocaleTimeString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">QR Code</p>
                  <p className="font-semibold text-blue-600">{booking.qrCode}</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-2">Scan this QR code at entry</p>
                <div className="bg-white w-32 h-32 mx-auto rounded-lg flex items-center justify-center">
                  <div className="text-4xl">📱</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
