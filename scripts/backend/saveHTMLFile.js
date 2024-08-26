import { promises as fs } from 'fs';
import { join } from 'path';
import * as path from 'path';
/**
 * Saves HTML content to a file.
 * @param {string} htmlContent - The HTML content to save.
 * @param {string} filePath - The path where the HTML file will be saved.
 * @returns {Promise<string>} The file path (for chaining).
 */
export default async function saveHTMLFile(htmlContent, filePath) {
    try {
      await fs.writeFile(filePath, htmlContent);
      console.log('HTML file saved');
      return filePath;
    } catch (error) {
      throw new Error(`Failed to save HTML file: ${error.message}`);
    }
  }