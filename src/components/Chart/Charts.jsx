import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import {
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from "chart.js";

import { Line } from "react-chartjs-2";
import Section, { SectionBody, SectionTitle } from '../Section/Section';
import "./Chart.scss"
import { useEffect } from 'react';
import { GetAllProduct } from '../../services/Product/Product';
import { GetQuantitySoldProductOrMonth, GetTotalQuantitySoldOrMonth } from '../../services/Authencation/Report';
const chartData =(listData = [0,0,0,0,0,0,0,0,0,0,0,0])=>{
  return {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    datasets: [
      {
        data: listData,
        label: "Total",
        fill: false,
        borderColor: "#FFC888",
        backgroundColor: "#FF8B04",
        radius: 4,
        hoverRadius: 5,
        tension: 0.1
      },
  
    ],
  
  };
} 
const listMonth = [1,2,3,4,5,6,7,8,9,10,11,12]
const options = {
  responsive: true,
  interaction: {
    intersect: false,
    mode: "x"
  },
  hover: {
    mode: "index",
    interactive: false
  },
  plugins: {
    legend: {
      position: "top"
    },
    title: {
      display: true,
      text: "total"
    },
    tooltip: {
      mode: "x",
      yAlign: "bottom"
    }
  },
  options: {
    responsive: true,
    maintainAspectRatio: false

    /*, your other options*/

  }

};
const Charts = props => {
  const [Product, setProduct] = useState([])
  const [active, SetActive] = useState(null)
  const [chart,setChart] = useState(chartData())
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Legend,
    Tooltip,
    Filler
  );
  // get all total in years
  const getAllTotal = async()=>{
      const date = new Date().getFullYear();
      const listTotal = listMonth.map(async(item)=>{
        const data =  await GetTotalQuantitySoldOrMonth(item,date);
        return data;
      })
      const data = await Promise.all(listTotal)
      
      const initListMonth = data.map(item=>{
        return item.payload;
      })
      setChart(chartData(initListMonth))
      console.log("a")
  }

  const getPidTotal = useCallback(async(Pid)=>{
    try{
      const date = new Date().getFullYear();
      const listTotal = listMonth.map(async(item)=>{
        const data =  await GetQuantitySoldProductOrMonth(Pid,item,date);
        return data;
      })
      const data = await Promise.all(listTotal)
      const initListMonth = data.map(item=>{
        return item.payload;
      })
     
      setChart(chartData(initListMonth))
     
    }catch(e){
      console.log(e)
    }
  },[active]) 
   // get All product
   useEffect(() => {
    const getProduct = async () => {
      const data = await GetAllProduct();
      if (data.success == true) {
        setProduct(data.payload)
      }
      
    }
    const data = GetQuantitySoldProductOrMonth("6idh8CgVd3QNPgaeFzop",3,2022)
    getProduct()
    // getPidTotal("6lyk7W5ubcLF4DRu2hlR")
  }, [])
  
  useEffect(()=>{
    getAllTotal()
  },[])

  // checked active product
  const handleActive = useCallback((Pid) => {
    SetActive(Pid)
    getPidTotal(Pid)
  }, [active])

  const handleRemoveActive = useCallback(() => {
    SetActive(null)
    getAllTotal()
  },[])

  return (
    <div className='Chart'>
      <div className='Colection__chart'>
        <>
          <SectionTitle>
            <div className={`Chart__title ${active == null ? "active" : ""}`} onClick={(e)=>handleRemoveActive()}>
              <span>
                Colection
              </span>
              <i class={`bx bx-home `} ></i>
            </div>
          </SectionTitle>
          <SectionBody>
            <div className="Colection__chart__list">
              {
                Product && Product.map((item) => {
                  return (
                    <div className={`Colection__chart__item ${item.Pid.includes(active) ? "active" : ""}`} onClick={(e) => handleActive(item.Pid)} >
                      <p>{item.Pid}</p>
                      <h2>{item.Info.NameProduct}</h2>
                    </div>
                  )
                })
              }

            </div>
          </SectionBody>
        </>
      </div>
      <div className="Chart__view">
        <Section>

          <Line data={chart} options={options} />
        </Section>
      </div>
    </div>
  )
}

Charts.propTypes = {}

export default Charts