const getImageSources = async (batch) => {
    try {
      const response = await fetch('http://localhost:3000/get-image-sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ batch }),
      });
  
      const imageSources = await response.json();
      return imageSources;
    } catch (error) {
      console.error(error);
    }
  };

  export default getImageSources;