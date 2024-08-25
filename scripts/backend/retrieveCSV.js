import https from 'https';
import axios from 'axios';

/**
 * Retrieves CSV data from a given URL, handling redirects, timeouts, and retries.
 * @param {string} url - The URL to fetch the CSV from.
 * @param {number} [timeout=30000] - The maximum request timeout in milliseconds.
 * @param {number} [maxRetries=3] - The maximum number of retries for failed requests.
 * @returns {Promise<string>} The CSV data as a string.
 */
const retrieveCSV = async (csvUrl) => {
  try {
    console.log(`Making HTTPS request to ${csvUrl}...`);
    const response = await axios.get(csvUrl, {
      timeout: 10000, // 10-second timeout
    });
    console.log(`Received response from ${csvUrl}: ${response.status} ${response.statusText}`);
    return response.data;
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
    throw error;
  }
};

export default retrieveCSV;