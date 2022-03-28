import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import noImage from '../download.jpeg';

const { data } = require('../utils/data');

export default function Character() {
  const navigate = useNavigate();

  const id = useParams().id;
  const category = useParams().category;
  const [details, setDetails] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await data(`${category}/${id}?`);

        if (res.code === 200) {
          setDetails(res.data.results[0]);
        }
      } catch (e) {
        navigate("/error", { state: { description: category + " not found!" }, replace: true });
      }
    }

    fetchData();
  }, []);
  return (
    <div>
      <h1>{category} Details</h1>
      <div>{category} ID:{id}</div>
      <div>{details.name ? category+ " Name: " + details.name : category+ " Title " + details.title}</div>
    </div>
  )
}
