import React from 'react';
import { Car, MapPin, Clock, TrendingUp, ChevronRight, Activity, Bell, CheckCircle } from 'lucide-react';

const Home = ({ parkingLots, notifications, currentTime, setActiveTab }) => {
  const stats = [
    { label: 'Active Users', value: '50K+', icon: Car },
    { label: 'Parking Lots', value: parkingLots.length, icon: MapPin },
    { label: 'Avg Time Saved', value: '20 min', icon: Clock },
    { label: 'ML Accuracy', value: '95%', icon: TrendingUp }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white rounded-3xl p-8 md:p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find it. Book it. Park it.</h1>
          <p className="text-xl mb-2 opacity-90">All with one tap.</p>
          <p className="text-sm mb-6 opacity-75">
            Live Time: {currentTime.toLocaleTimeString()} | {currentTime.toLocaleDateString()}
          </p>
          <button 
            onClick={() => setActiveTab('search')}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition inline-flex items-center gap-2"
          >
            Find Parking <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition">
            <stat.icon className="text-blue-600 mb-3" size={32} />
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* AI System Status */}
      {parkingLots.length > 0 && (
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="text-green-600" size={28} />
            <h3 className="text-xl font-bold text-gray-800">AI System Status</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-700">ML Prediction Engine</span>
                <span className="text-green-600 text-sm font-bold">ACTIVE</span>
              </div>
              <p className="text-sm text-gray-600">LSTM model updating every 30s</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-700">CV Detection</span>
                <span className="text-green-600 text-sm font-bold">LIVE</span>
              </div>
              <p className="text-sm text-gray-600">YOLOv8 processing camera feeds</p>
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="text-blue-600" size={24} />
            <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
          </div>
          <div className="space-y-2">
            {notifications.map(notif => (
              <div key={notif.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="text-green-500 mt-1" size={18} />
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{notif.message}</p>
                  <p className="text-xs text-gray-500">{notif.timestamp.toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
