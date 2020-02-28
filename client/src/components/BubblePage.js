import React, { useState, useEffect } from "react";
import {axiosCall} from './axios/'
import axios from 'axios'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property


  useEffect(()=>{
  	const token = window.localStorage.getItem('token')

  	axiosCall().get('http://localhost:5000/api/colors/').then(res=>{
  		setColorList(res.data)
  	})
  },[colorList])

  return (
    <div>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </div>
  );
};

export default BubblePage;
