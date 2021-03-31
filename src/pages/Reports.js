import { Doughnut } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2'
import {useState} from 'react';

defaults.global.defaultFontFamily = 'Montserrat';
defaults.global.defaultFontColor = '#1e2b2b';



export default function(props) {

    const [rawData, setRawData] = useState(props.data);


    let pieData = {}
    
    pieData.labels = rawData.map(item => item.projectName);
    pieData.values = rawData.map(item => item.totalTime)


    console.log(pieData)

    let output;

    if (rawData.length == 0) {
      output = <p>Whoops, nothing to show here yet!</p>
    } else {
      output = <div>
                <div className = "reportsInfo">
                    <h3>Here's the breakdown of your logs.</h3>
                    <p>Hover over the chart for more info.</p>
                  </div>
                  <Doughnut width = {50} height = {10}  options={{ maintainAspectRatio: false }} data={{
                      labels: pieData.labels,
                      datasets: [
                        {
                          label: '# of Votes',
                          data: pieData.values,
                          backgroundColor: [
                            '#FCC839',
                            '#9C20B0',
                            '#43943f',
                            '#cc2f2a',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                          ],
                          borderColor: [
                            '#FCC839',
                            '#9C20B0',
                            '#43943f',
                            '#cc2f2a',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }} />
              </div>
    }

    return(
      <div className = "reportsWrapper">
        {output}
      </div>
    )
}