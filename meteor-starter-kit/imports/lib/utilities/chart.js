export class MakeChart{
  constructor(opt) {
    this.opt = Object.assign({
      chart: '#myChart',
      type: 'line',
      labels: [],
      label: [],
      data: [],
      borderWidth: [],
      backgroundColor: [],
      borderColor: [],
      options: {
        legend: {
          //display: false
        },
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              stacked: true,
              beginAtZero: true,
              min: 30,
              steps: 20,
              //max: 150,
              stepValue: 2,
              fontColor: "black"
            }
          }],
          xAxes:[{
            ticks:{
              fontColor: "black"
            }
          }]
        }
      }
    }, opt);

    const {chart,data,labels,options,type,label,borderWidth,backgroundColor,borderColor } = this.opt;

    const ctx = document.querySelector(chart).getContext('2d');

    this.chart = new Chart(ctx, {
      type,
      data: {
        labels,
        datasets:
        [{
          label: "test",
          data,
          backgroundColor: ["rgba(0,0,0,0.0)"],
          borderColor: ["#ffcc80"],
          borderWidth: 3,
        }, {
          label: "Wi-Fi Count",
          data,
          backgroundColor: ["rgba(0,0,0,0.0)"],
          borderColor: ["#90caf9"],
          borderWidth: 3
        }]
      },
      options
    })

  }

  update(dbdata, wifidata, labels) {
    this.chart.data.datasets[0].data = dbdata;
    this.chart.data.datasets[1].data = wifidata;
    this.chart.data.labels = labels;
    this.chart.update();
  }
}
