import { promises as fs } from 'fs';
import * as path from 'path';

/**
 * Saves CSV data to a local file.
 * @param {string} csvData - The CSV data to save.
 * @param {string} filePath - The path where the CSV file will be saved.
 * @returns {Promise<string>} The CSV data (for chaining).
 */
export default async function saveCSVLocally(csvData, filePath) {
  const absolutePath = path.resolve(filePath); // Resolve to absolute path
  const directoryPath = path.dirname(absolutePath); // Get directory path from absolute path

  try {
    // Check if directory exists, create it if not
    await fs.access(directoryPath, fs.constants.F_OK).catch(async (err) => {
      if (err.code === 'ENOENT') { // Directory doesn't exist
        await fs.mkdir(directoryPath, { recursive: true });
      }
    });

    await fs.writeFile(absolutePath, csvData);
    console.log('CSV saved locally');
    return csvData;
  } catch (error) {
    throw new Error(`Failed to save CSV: ${error.message}`);
  }
}