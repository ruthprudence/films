import retrieveCSV from './scripts/backend/retrieveCSV.js';
import processCSV from './scripts/backend/processCSV.js';
import saveCSVLocally from './scripts/backend/saveCSVLocally.js';
import createHTML from './scripts/backend/createHTML.js';
import saveHTMLFile from './scripts/backend/saveHTMLFile.js';

import dotenv from 'dotenv';
dotenv.config();


import { promises as fs } from 'fs';
import { join } from 'path';
import * as path from 'path';

/**
 * Main function to orchestrate the entire process.
 */
async function main() {
  const csvUrl = process.env.CSV_URL;
  const url = new URL(import.meta.url);  // Get current module URL
  const dirname = path.dirname(url.toString()); // Convert URL to string before dirname
  const csvFilePath = path.join('.', 'films.csv'); 
  const htmlFilePath = path.join('.', 'index.html'); 

  try {
    await retrieveCSV(csvUrl)
      .then(csvData => saveCSVLocally(csvData, csvFilePath))
      .then(processCSV)
      .then(films => createHTML(films))
      .then(htmlContent => saveHTMLFile(htmlContent, htmlFilePath))
      .then(() => console.log('Process completed successfully'));
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

// Run the main function
main();