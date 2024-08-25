import fs from 'fs';

const posterCacheFile = 'posterCache.json';

const loadPosterCache = () => {
  try {
    const data = fs.readFileSync(posterCacheFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};

const savePosterCache = (cache) => {
  fs.writeFileSync(posterCacheFile, JSON.stringify(cache));
};

const getPosterFromCache = (title) => {
  const cache = loadPosterCache();
  return cache[title];
};

const addPosterToCache = (title, posterUrl) => {
  const cache = loadPosterCache();
  cache[title] = posterUrl;
  savePosterCache(cache);
};

export { getPosterFromCache, addPosterToCache };