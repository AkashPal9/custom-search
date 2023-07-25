import React, { useState } from 'react';
import axios from 'axios';
const cheerio = require('cheerio');

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading,setIsLoading]= useState(false);
  
  const handleSearch = async () => {
    try {
        setIsLoading(true)
        setResults([])
      const customSearchResponse = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=AIzaSyAvZc9kcfRsmZqD4zSh8EGWE11qlTH95yQ&cx=256f1615efd7242a9&q=${query}&num=5`
      );
      const urls = customSearchResponse.data.items.map((item) => item.link);
    console.log(urls,"url")
    const scrapingResponses = await Promise.all(
        urls.map(async (url) => {
          try {
            const response = await axios.get(
              `https://app.scrapingbee.com/api/v1?api_key=QSQVNWHGD4N3NP4ORZSP01SWQ0HKSMY39J0OFYMVY2KFFWHICDWQ12P3KUTGJN679QXZ1J7IQURI68C4&url=${encodeURIComponent(url)}`
            );
            return response.data;
          } catch (error) {
            console.error('Error scraping URL:', url, error);
            return ''; 
          }
        })
      );

      const texts = scrapingResponses.map((html) => {
        const $ = cheerio.load(html);
        return $('body').text();
      });
      console.log(texts,"data")
      setResults(texts);
      setIsLoading(false);
    //   const texts = scrapingResponses.map((response) => response.data.text);
    //   setResults(texts);
    } catch (error) {
      console.error('Error fetching data:', error); 
    }
  };

  return (
    <div className='container'>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your search query"
      />
      <button onClick={handleSearch} className='btn btn-primary m-3'>Search</button>
      <div>
        {isLoading && <h2 className='text'>Loading ...</h2>}
        {results.map((text, index) => (
          <p  key={index} className='text' style={{overflowWrap:"break-word",wordWrap:"break-word",wordBreak:"break-word"}}>{text}</p>
        ))}
      </div>
    </div>
  );
};



export default Search;
