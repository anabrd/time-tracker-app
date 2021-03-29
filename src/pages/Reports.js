import { Doughnut } from 'react-chartjs-2';
import {useState} from 'react';



export default function(props) {

    const [rawData, setRawData] = useState(props.data);


    let pieData = {}
    
    pieData.labels = rawData.map(item => item.projectName);
    pieData.values = rawData.map(item => item.totalTime)


    console.log(pieData)

    return(
<Doughnut height = {70} data={{
  labels: pieData.labels,
  datasets: [
    {
      label: '# of Votes',
      data: pieData.values,
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}} />
    )
}