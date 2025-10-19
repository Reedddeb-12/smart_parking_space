import React, { useState } from 'react';
import { Search, Clock, MapPin, TrendingUp, Camera } from 'lucide-react';
import { getAvailabilityColor } from '../utils/helpers';

const SearchParking = ({ parkingLots, mlPredictions, cvDetections, currentTime, setActiveTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLot, setSelectedLot] = useState(null);

  const filteredLots = parkingLots.filter(lot =>
    lot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lot.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by location or parking name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock size={16} />
          <span>Live predictions updated at {currentTime.toLocaleTimeString()}</span>
        </div>
      </div>

      {filteredLots.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
          <MapPin className="mx-auto text-gray-400 mb-4" size={64} />
          <p className="text-gray-600">
            {searchQuery ? 'No parking lots found matching your search' : 'No parking lots available yet'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLots.map(lot => {
            const prediction = mlPredictions[lot.id] || 0.5;
            const cvData = cvDetections[lot.id];
            
            return (
              <div 
                key={lot.id}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition cursor-pointer"
                onClick={() => {
                  setSelectedLot(lot);
                  setActiveTab('book');
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{lot.name}</h3>
                    <p className="text-gray-600 flex items-center gap-1 mt-1">
                      <MapPin size={16} /> {lot.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getAvailabilityColor(lot.available || 0, lot.total)}`}>
                      {lot.available || 0}
                    </div>
                    <div className="text-sm text-gray-500">available</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp size={16} className="text-blue-600" />
                      <span className="text-xs text-gray-600">ML Prediction</span>
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                      {Math.round(prediction * 100)}%
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Camera size={16} className="text-green-600" />
                      <span className="text-xs text-gray-600">CV Detection</span>
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      {cvData ? `${Math.round(cvData.confidence * 100)}%` : 'N/A'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{lot.distance} away</span>
                  <span className="text-gray-600">₹{lot.price}/hr</span>
                  <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                    Book Now
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchParking;
