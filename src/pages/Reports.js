import { Doughnut } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2'
import { useState } from 'react';
import Table from '../components/Table'

defaults.global.defaultFontFamily = 'Montserrat';
defaults.global.defaultFontColor = '#1e2b2b';

export default function(props) {

    let pieOutput;
    const [rawData, setRawData] = useState(props.data);
    const [timeCriteria, setTimeCriteria] = useState("today");

    let pieData = {};
    pieData.labels = rawData.map(item => item.projectName);
    pieData.values = rawData.map(item => item.totalTime);


    if (pieData.values[0] == 0 || pieData.values.length == 0)  {
      pieOutput = <p>Whoops, nothing to show here either! Here's an actual donut instead. 🍩</p>
    } else {
      pieOutput = 
      <div className = "doughnut-wraper">
        <p>Time logged by project - hover the chart for more info:</p>
        <Doughnut options={{ maintainAspectRatio: true }} data={{
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
      <section>
        <div className = "reports-info">
          <h3>Here's the breakdown of your logs for <span className = "time-criteria-heading">{timeCriteria}</span></h3>
        </div>
        <div className = "reports-wrapper">
          <Table data = {rawData} />
          {pieOutput}
        </div>
        <div className="time-criteria-select">
          <p>See reports for past:</p>
          <div style = {{width: "650px", padding: "0", margin: "auto"}} className = "btn-wrapper">
          <button className = "btn time-criteria-btn">Week</button>
          <button className = "btn time-criteria-btn">Month</button>
          <button className = "btn time-criteria-btn">Year</button>
          </div>
        </div>
      </section>
    )
}