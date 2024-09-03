/**
 * Processes CSV data into an array of film objects.
 * @param {string} csvData - The CSV data to process.
 * @returns {object[]} An array of film objects.
 */
// export default function processCSV(csvData) {
//     const rows = csvData.trim().split('\n').slice(1); // Skip header row
//     return rows.map(row => {
//       const [dateWatched, title, released, opinion] = row.split(',').map(item => item.trim());
//       return {
//         dateWatched,
//         title,
//         released,
//         opinion
//       };
//     });
//   }

  export default function processCSV(csvData) {
    const rows = csvData.trim().split('\n').slice(1); // Skip header row
    return rows.map(row => {
      const [dateWatched, title, released, opinion, wikipediaLink, imgSrc] = row.split(',').map(item => item.trim());
      return {
        dateWatched,
        title,
        released,
        opinion,
        wikipediaLink,
        imgSrc
      };
    });
  }