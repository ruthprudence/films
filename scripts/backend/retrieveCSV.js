import https from 'https';

/**
 * Retrieves CSV data from a given URL, handling redirects, timeouts, and retries.
 * @param {string} url - The URL to fetch the CSV from.
 * @param {number} [timeout=30000] - The maximum request timeout in milliseconds.
 * @param {number} [maxRetries=3] - The maximum number of retries for failed requests.
 * @returns {Promise<string>} The CSV data as a string.
 */
export default async function retrieveCSV(url, timeout = 30000, maxRetries = 3) {
  console.log('Making HTTPS request...');

  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Redirect - call retrieveCSV again with the new URL
        return retrieveCSV(response.headers.location, timeout, maxRetries - 1)
          .then(resolve)
          .catch(reject);
      }

      if (response.statusCode !== 200) {
        return reject(new Error(`HTTP error! Status: ${response.statusCode}`));
      }

      let data = '';
      response.on('data', (chunk) => data += chunk);
      response.on('end', () => resolve(data));
    });

    request.on('error', (error) => {
      if (maxRetries > 0) {
        // Retry after a delay
        const retryDelay = 2 ** (maxRetries - 1) * 1000; // Exponential backoff
        console.log(`Request failed, retrying in ${retryDelay}ms`);
        setTimeout(() => retrieveCSV(url, timeout, maxRetries - 1).then(resolve).catch(reject), retryDelay);
      } else {
        reject(new Error(`Request failed: ${error.message}`));
      }
    });

    request.setTimeout(timeout, () => {
      request.abort();
      reject(new Error('Request timed out'));
    });
  });
}