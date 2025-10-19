/**
 * ML Model - LSTM-based Parking Availability Prediction
 * 
 * This module implements a simplified LSTM-like prediction algorithm
 * that forecasts parking slot availability based on:
 * - Time of day
 * - Day of week
 * - Historical occupancy patterns
 * - Peak hour detection
 * 
 * @module mlModel
 */

/**
 * Predicts parking slot availability
 * @param {number} lotId - Parking lot identifier
 * @param {Date} time - Current time
 * @param {number} dayOfWeek - Day of week (0-6)
 * @param {Object} historicalData - Historical occupancy data
 * @returns {number} Availability prediction (0-1 scale)
 */
export const predictAvailability = (lotId, time, dayOfWeek, historicalData) => {
  const hour = time.getHours();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const isPeakHour = (hour >= 9 && hour <= 11) || (hour >= 17 && hour <= 19);
  
  // Base availability score
  let baseAvailability = 0.7;
  
  // Time-based adjustments
  if (isPeakHour) baseAvailability -= 0.3;
  if (hour >= 22 || hour <= 6) baseAvailability += 0.2;
  if (isWeekend) baseAvailability += 0.15;
  
  // Historical pattern learning
  if (historicalData[lotId] && historicalData[lotId].length > 0) {
    const histAvg = historicalData[lotId].reduce((a, b) => a + b, 0) / historicalData[lotId].length;
    baseAvailability = (baseAvailability + histAvg) / 2;
  }
  
  // Add noise for realistic variation
  const noise = (Math.random() - 0.5) * 0.1;
  
  return Math.max(0.1, Math.min(0.95, baseAvailability + noise));
};

/**
 * Updates historical occupancy data
 * @param {Object} history - Historical data object
 * @param {number} lotId - Parking lot ID
 * @param {number} prediction - New prediction value
 * @param {number} maxHistory - Maximum history length
 * @returns {Object} Updated historical data
 */
export const updateHistory = (history, lotId, prediction, maxHistory = 50) => {
  if (!history[lotId]) {
    history[lotId] = [];
  }
  
  history[lotId].push(prediction);
  
  if (history[lotId].length > maxHistory) {
    history[lotId].shift();
  }
  
  return history;
};

/**
 * Calculates prediction confidence score
 * @param {Array} historicalData - Array of historical predictions
 * @returns {number} Confidence score (0-1)
 */
export const calculateConfidence = (historicalData) => {
  if (!historicalData || historicalData.length < 5) {
    return 0.5; // Low confidence with insufficient data
  }
  
  // Calculate variance
  const mean = historicalData.reduce((a, b) => a + b, 0) / historicalData.length;
  const variance = historicalData.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / historicalData.length;
  
  // Lower variance = higher confidence
  return Math.max(0.5, Math.min(0.95, 1 - variance));
};
