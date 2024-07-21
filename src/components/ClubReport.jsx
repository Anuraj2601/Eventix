import React from 'react';
import { Chart } from 'react-google-charts';

const ClubReport = () => {
  const events = [
    { name: "MadHack", versions: ["3.0", "2.0", "1.0"], },
    { name: "ReidExtreme", versions: ["3.0", "2.0", "1.0"], },
    { name: "IEEE Day", versions: ["2023", "2022", "2021"], },
    { name: "FreshHack", versions: ["1.0"] },
  ];

  const dummyData = {
    "MadHack": [
      { version: "3.0", income: 5000, cost: 3000, sponsorship: 2000, registrations: 100 },
      { version: "2.0", income: 4000, cost: 2500, sponsorship: 1500, registrations: 80 },
      { version: "1.0", income: 3000, cost: 2000, sponsorship: 1000, registrations: 60 },
    ],
    "ReidExtreme": [
      { version: "3.0", income: 6000, cost: 3500, sponsorship: 2500, registrations: 120 },
      { version: "2.0", income: 4500, cost: 3000, sponsorship: 1500, registrations: 90 },
      { version: "1.0", income: 3500, cost: 2200, sponsorship: 1300, registrations: 70 },
    ],
    "IEEE Day": [
      { version: "2023", income: 5500, cost: 3200, sponsorship: 2300, registrations: 110 },
      { version: "2022", income: 4800, cost: 2900, sponsorship: 1900, registrations: 100 },
      { version: "2021", income: 4000, cost: 2700, sponsorship: 1300, registrations: 90 },
    ],
    "FreshHack": [
      { version: "1.0", income: 2000, cost: 1500, sponsorship: 500, registrations: 50 },
    ],
  };

  const generateVersionComparisonData = () => {
    const versionComparisonData = [
      ["Event", "Version 1.0", "Version 2.0", "Version 3.0"],
      ["MadHack", 60, 80, 100],
      ["ReidExtreme", 70, 190, 120],
      ["IEEE Day", 90, 100, 110],
      ["FreshHack", 50, null, null],
    ];
  
    return versionComparisonData;
  };

  const chartOption = {
    backgroundColor: 'black',
    chart: {
      title: 'Version Comparison by Event',
      subtitle: 'Comparing Registrations across Different Versions and Years',
      textStyle: { color: 'white' },
    },
    hAxis: {
      title: 'Event',
      textStyle: { color: 'white' },
      titleTextStyle: { color: 'white' },
    },
    vAxis: {
      title: 'Registrations',
      textStyle: { color: 'white' },
      titleTextStyle: { color: 'white' },
      gridlines: { color: 'white' },
    },
    seriesType: 'bars',
    series: {
      0: { color: '#AEC90A' },
      1: { color: '#8FBF10' },
      2: { color: '#71A50A' },
      3: { color: '#5C8A05' },
      4: { color: '#4F7F01' },
      5: { color: '#3B6B01' },
    },
    legend: { textStyle: { color: 'white' } },
  };
  

  const generateChartData = (eventName) => {
    const event = dummyData[eventName];
    const data = [
      ["Version", "Income", "Cost", "Sponsorship", "Registrations"]
    ];
    event.forEach(version => {
      data.push([version.version, version.income, version.cost, version.sponsorship, version.registrations]);
    });
    return data;
  };

  const generateOverallChartData = () => {
    const data = [
      ["Event", "Total Registrations"]
    ];
    Object.keys(dummyData).forEach(eventName => {
      const totalRegistrations = dummyData[eventName].reduce((total, version) => total + version.registrations, 0);
      data.push([eventName, totalRegistrations]);
    });
    return data;
  };  

  const chartOptions = {
    backgroundColor: 'black',
    chart: {
      title: 'Event Report',
      subtitle: 'Comparing Income, Costs, Sponsorships, and Registrations across different versions',
      textStyle: { color: 'white' },
    },
    hAxis: {
      title: 'Version',
      textStyle: { color: 'white' },
      titleTextStyle: { color: 'white' },
    },
    vAxis: {
      title: 'Amount',
      textStyle: { color: 'white' },
      titleTextStyle: { color: 'white' },
      gridlines: { color: 'white' },
    },
    seriesType: 'bars',
    series: {
      0: { color: '#AEC90A' },
      1: { color: '#8FBF10' },
      2: { color: '#71A50A' },
      3: { color: '#5C8A05', type: 'line' },
    },
    legend: { textStyle: { color: 'white' } },
  };

  return (
    <div className="p-4" style={{ backgroundColor: 'black' }}>
        <div className="mb-8">
        <h2 className="text-xl text-center font-bold mb-2" style={{ color: 'white' }}>Version Comparison by Event</h2>
        <Chart
          width={'100%'}
          height={'400px'}
          chartType="ColumnChart"
          loader={<div>Loading Chart...</div>}
          data={generateVersionComparisonData()}
          options={chartOptions}
        />
      </div>
      {events.map(event => (
        
        <div key={event.name} className="mb-8">
          <h2 className="text-xl text-center font-bold mb-2" style={{ color: 'white' }}>{event.name} Reports</h2>
          <Chart
            width={'100%'}
            height={'400px'}
            chartType="ColumnChart"
            loader={<div>Loading Chart...</div>}
            data={generateChartData(event.name)}
            options={{
              ...chartOptions,
              chart: {
                ...chartOptions.chart,
                title: `${event.name} Event Report`,
              },
            }}
          />
        </div>

        
      ))}
        
    </div>
    
  );
};

export default ClubReport;
