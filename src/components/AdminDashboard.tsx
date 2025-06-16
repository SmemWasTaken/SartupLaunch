import React, { useState, useEffect } from 'react';

const GA_MEASUREMENT_ID = 'G-NF4BRVQHV4';

const AdminDashboard: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState('#2563eb'); // default blue
  const [analyticsData] = useState({
    visitors: 0,
    pageViews: 0,
    // Add more as needed
  });
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  const [analyticsError, setAnalyticsError] = useState('');

  useEffect(() => {
    // TODO: Replace this with a real Google Analytics Data API call
    // For now, just simulate loading
    setLoadingAnalytics(true);
    setTimeout(() => {
      // Example: setAnalyticsData({ visitors: 123, pageViews: 456 });
      setLoadingAnalytics(false);
      setAnalyticsError('Live analytics integration requires Google Analytics Data API setup.');
    }, 1000);
  }, []);

  // Handler for color change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrimaryColor(e.target.value);
    document.documentElement.style.setProperty('--primary-color', e.target.value);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Customize Site Theme</h2>
        <div className="flex items-center space-x-4">
          <label htmlFor="primaryColor" className="font-medium">Primary Color:</label>
          <input
            id="primaryColor"
            type="color"
            value={primaryColor}
            onChange={handleColorChange}
            className="w-10 h-10 p-0 border-0 bg-transparent cursor-pointer"
          />
          <span className="ml-2">{primaryColor}</span>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
        {loadingAnalytics ? (
          <div className="text-center text-gray-500">Loading analytics...</div>
        ) : analyticsError ? (
          <div className="text-center text-red-500 text-sm">{analyticsError}</div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <div className="text-2xl font-bold">{analyticsData.visitors}</div>
              <div className="text-gray-600">Visitors</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <div className="text-2xl font-bold">{analyticsData.pageViews}</div>
              <div className="text-gray-600">Page Views</div>
            </div>
          </div>
        )}
        <div className="mt-6 text-gray-400 text-sm">(Live analytics integration requires Google Analytics Data API setup with Measurement ID: {GA_MEASUREMENT_ID})</div>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Other Settings</h2>
        <div className="text-gray-400">(More admin controls coming soon)</div>
      </div>
    </div>
  );
};

export default AdminDashboard; 