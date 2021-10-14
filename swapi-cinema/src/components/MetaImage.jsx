import {useEffect, useState} from "react";

const baseUrl = 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI';
// const apiKey = process.env.REACT_APP_WEB_SEARCH_API_KEY;
const apiKey = '1a6037cdf5mshc08eaa0b32ab52ap1151d6jsn008e5456f7d9';
const host = 'contextualwebsearch-websearch-v1.p.rapidapi.com';


export const MetaImage = ({ term }) => {
  const [busy, setBusy] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const refinedSearchTerm = encodeURIComponent(`star wars ${term}`);
    const random = Math.floor(Math.random() * 10000) + 1;
    setTimeout(() => {
      setBusy(true);

      fetch(`${baseUrl}?q=${refinedSearchTerm}&pageNumber=1&pageSize=1&autoCorrect=true`, {
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': host,
          useQueryString: true,
        },
      }).then((response) => {
        return response.json();
      }).then((data) => {
        const imageUrl = data.value[0].url;

        setBusy(false);
        setImageUrl(imageUrl);
      })
    }, random);

  }, []);

  return <>
    {busy ? '...loading' :
      <img className="img-fluid" src={imageUrl} alt={term}></img>
    }
    </>
};

export default MetaImage;
