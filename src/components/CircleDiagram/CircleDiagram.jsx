import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const CircleDiagram = ({data, title}) => {
  return ( 
    <Pie
      type="pie"
      options={{
        maintainAspectRatio : false,
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
            labels: {
              color: '#7E7E7E',
              boxPadding: 2,
              font: {
                size: 12,
                weight: 600,
                family: 'Montserrat'
              }
            },
            display: true,
            position: "right"
          }
        }
      }}
      data={data}
    />
  );
}
 
export default CircleDiagram;