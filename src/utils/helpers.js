/**
 * Helper Utilities
 * 
 * Common utility functions used across the application
 * 
 * @module helpers
 */

/**
 * Determines color based on availability ratio
 * @param {number} available - Available slots
 * @param {number} total - Total slots
 * @returns {string} Tailwind color class
 */
export const getAvailabilityColor = (available, total) => {
  const ratio = available / total;
  if (ratio > 0.5) return 'text-green-500';
  if (ratio > 0.2) return 'text-yellow-500';
  return 'text-red-500';
};

/**
 * Formats timestamp to readable string
 * @param {Date} timestamp - Date object
 * @returns {string} Formatted time string
 */
export const formatTime = (timestamp) => {
  return timestamp.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

/**
 * Generates unique QR code identifier
 * @returns {string} QR code string
 */
export const generateQRCode = () => {
  return `QR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

/**
 * Validates form input
 * @param {Object} formData - Form data object
 * @param {Array} requiredFields - Array of required field names
 * @returns {boolean} Validation result
 */
export const validateForm = (formData, requiredFields) => {
  return requiredFields.every(field => formData[field] && formData[field].toString().trim() !== '');
};

/**
 * Calculates booking price
 * @param {number} hourlyRate - Rate per hour
 * @param {number} duration - Duration in hours
 * @param {number} platformFee - Platform fee
 * @returns {number} Total price
 */
export const calculatePrice = (hourlyRate, duration, platformFee = 10) => {
  return (hourlyRate * duration) + platformFee;
};

/**
 * Formats currency
 * @param {number} amount - Amount in rupees
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return `₹${amount.toFixed(2)}`;
};
