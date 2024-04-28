import React, { useEffect, useState } from 'react';
import "../styles/Widgets.css";
import InfoIcon from "@mui/icons-material/Info";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function Widgets() {

    const [news, setNews] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetch("https://newsapi.org/v2/everything?q=apple&from=2024-04-18&to=2024-04-18&sortBy=popularity&apiKey=e8e1869a2afa4ec4859d4bf4c4bb3288");
            const data = await response.json();
            setNews(data.articles);
        };

        fetchData();
    },[])

  const newsArticle = (data)=>(
    <div className="widgets__article">
        <div className="widgets__articleLeft">
            <FiberManualRecordIcon/>
        </div>

        <div className="widgets___articleRight">
            <h4>{data.title}</h4>
            <p>{data.description}</p>
        </div>       
    </div>
  ) 
  return (
    <div className='widgets'>
      <div className="widgets__header">
        <h2>LinkedIn News</h2>
        <InfoIcon/>
      </div>
      {news.map((article, index) => (
        index<6?newsArticle(article):null
      ))}
      
    </div>
  )
}

export default Widgets
