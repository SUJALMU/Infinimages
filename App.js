import React, { useEffect, useState } from 'react';
import './App.css';
import { createApi } from 'unsplash-js';
import { debounce } from 'lodash';

const unsplash = createApi({
  accessKey: 'L0THOEQXb44Z4MOfic7DkP_VhCXi95goAGmCIQDf2Og',
});

function App() {
  const [phrase, setPhrase] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  async function getUnsplashImages(query, pageNum = 1, perPage = 5) {
    try {
      const result = await unsplash.search.getPhotos({
        query,
        page: pageNum,
        perPage,
      });

      const imageUrls = result.response.results.map((result) => result.urls.regular);
      return imageUrls;
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  }

  const searchImages = debounce((query) => {
    if (query !== '') {
      setPage(1); 
      setImages([]); 
      fetchImages(query, 1);
    } else {
      setImages([]); 
    }
  }, 50);

  const fetchImages = async (query, pageNum) => {
    try {
      setLoading(true);
      const newImages = await getUnsplashImages(query, pageNum);
      setImages((prevImages) => [...prevImages, ...newImages]);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    fetchImages(phrase, nextPage);
    setPage(nextPage);
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    setPhrase(e.target.value);
  };

  const handleInputEnter = (e) => {
    if (e.key === 'Enter') {
      searchImages(phrase);
    }
  };

  return (
    <div>
      <div className="company-name">IMAGEshope</div>
      <input
        type="text"
        value={phrase}
        onChange={handleInputChange}
        onKeyPress={handleInputEnter}
        className="search-bar"
        placeholder="Search Images"
      />
      <div className="image-container">
        {images.length > 0 &&
          images.map((url, index) => <img key={index} src={url} alt={`Image ${index}`} />)}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && images.length > 0 && (
        <div className="button-container">
          <button className="load-more-button" onClick={handleLoadMore} disabled={loading}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

