import axios from "axios";

// const apiKey = "afbc99db955a3347823752de85e7e55a"; //not meant to be here ,should be using /env file

export const weatherData = async (city: string) => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0382ace86b8b1320c1ba3d789d18b93c&units=metric`
    );
    if (res.status == 200) return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// normal funcitons

/**
 * Converts a Unix timestamp (in seconds) to a formatted date string.
 * @param {number} timestamp - The Unix timestamp in seconds.
 * @returns {string} - The formatted date string.
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);

  const options: Intl.DateTimeFormatOptions = {
    month: "long", // 'long' for full month name
    day: "numeric", // Numeric day
    hour: "numeric",
    minute: "numeric",
    hour12: true, // 12-hour format with AM/PM
  };

  // Format the date using toLocaleString
  return date.toLocaleString("en-US", options);
}

// Example usage
const timestamp = 1722125412; // Example timestamp
console.log(formatTimestamp(timestamp)); // Output: "July 25, 2024, 10:23 AM" (example output)

// gmt time zone
/**
 * Converts a timezone offset in seconds to a GMT format string.
 * @param {number} offsetSeconds - The timezone offset in seconds.
 * @returns {string} - The GMT timezone string in the format "GMT±HH:mm".
 */
export function getGmtOffsetString(offsetSeconds: number): string {
  // Convert seconds to hours and minutes
  const totalMinutes = offsetSeconds / 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.abs(Math.floor(totalMinutes % 60));

  // Determine the sign of the offset
  const sign = hours >= 0 ? "+" : "-";

  // Format hours and minutes to always be two digits
  const formattedHours = Math.abs(hours).toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  // Create the GMT offset string
  return `GMT${sign}${formattedHours}:${formattedMinutes}`;
}

// Example usage
const offsetSeconds: number = 19800; // Example offset
console.log(getGmtOffsetString(offsetSeconds)); // Output: "GMT+05:30"

//wind speed
/**
 * Converts wind speed from meters per second to kilometers per hour.
 * @param {number} windSpeedMs - The wind speed in meters per second.
 * @returns {number} - The wind speed in kilometers per hour.
 */
export function convertWindSpeedToKmh(windSpeedMs: number): number {
  const conversionFactor = 3.6;
  const speed = windSpeedMs * conversionFactor;
  return parseFloat(speed.toFixed(2));
}

// Example usage
const windSpeedInMs: number = 10; // Example wind speed in m/s
const windSpeedInKmh: number = convertWindSpeedToKmh(windSpeedInMs);

console.log(`Wind speed: ${windSpeedInMs} m/s is ${windSpeedInKmh} km/h`);
// Output: "Wind speed: 10 m/s is 36 km/h"

/**
 * Converts a Unix timestamp to a formatted time string.
 * @param {number} timestamp - The Unix timestamp in seconds.
 * @returns {string} - The time formatted as "HH:MM AM/PM".
 */

export function getTimeFromTimestamp(timestamp: number): string {
  // Convert seconds to milliseconds
  const date = new Date(timestamp * 1000);

  // Define options for time formatting
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit", // Two-digit hour
    minute: "2-digit", // Two-digit minute
    hour12: true, // 12-hour clock with AM/PM
  };

  // Format the time using toLocaleTimeString
  return date.toLocaleTimeString("en-US", options);
}

// Example usage
const sunriseTimestamp = 1722164210;
console.log(getTimeFromTimestamp(sunriseTimestamp)); // Output: "07:30 AM" (example output)
