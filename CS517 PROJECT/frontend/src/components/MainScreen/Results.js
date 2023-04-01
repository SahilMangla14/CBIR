import React from 'react'
import { useState, useEffect } from 'react';
// import path from './images/img1.jpg' 
import './Results.css'
const Results = () => {

  const [imageNames, setImageNames] = useState([]);
  const [queryName, setQueryName] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/images')
      .then(response => response.json())
      .then(data => {
        setImageNames(data)
        console.log(data)
      })
      .catch(error => console.error(error));
  },[])

  useEffect(() => {
    fetch('http://localhost:5000/getQueryImg')
      .then(response => response.json())
      .then(data => {
        setQueryName(data)
        console.log(data)
      })
      .catch(error => console.log(error))
  },[])

  // return (
  //     {imageNames.map(filename => (
  //       <div className='image-container'>
  //       <img key={filename} src={`/res/${filename}`} alt={filename} />
  //       </div>
  //       ))}

  // )

  return (
    <div>
      <div className="query">
        <img src={`http://localhost:5000/static/queries/${queryName}`} alt="query" className='query-image'/>
      </div>
      <div className="gallery">
        {console.log(imageNames)}
        {imageNames.map(filename => (
          <div className='image-container'>
            <img key={filename} src={`http://localhost:5000/static/${filename}`} alt={filename} className="gallery__image" />
            {console.log(filename)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results

