import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement);

const BarDiagram = ({data, title}) => {
  return ( 
    <Bar 
      type="bar"
      options={{
        maintainAspectRatio : false,
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 10,
              }
            }
          },
          y: {
            min: 0,
            grid: {
              
            }
          }
        },
        plugins: {
          title: {
            display: true,
            padding: {bottom: 30},
            text: title,
            font: {
              size: 20,
              family: 'Montserrat',
              weight: 600,
            },
            textColor: '#47464D'
          },
          legend: {
            display: false
          }
        }
      }}
      data={data}
    />
  );
}
 
export default BarDiagram;