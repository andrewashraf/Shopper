import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js/auto';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None // Disable view encapsulation
})
export class LoginComponent implements OnInit {

  salesData: any;
  salesData2: any;
  chartOptions!: ChartOptions; // Define chart options

  ngOnInit(): void {
    this.salesData = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [{
        label: "Worldwide Sales",
        data: [10000, 15000, 12000, 18000, 20000, 25000],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
      }]
    };

    this.salesData2 = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Sales Data 1",
          data: [10000, 15000, 12000, 18000, 20000, 25000],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1
        },
        {
          label: "Sales Data 2",
          data: [12000, 13000, 11000, 17000, 18000, 23000],
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1
        }
      ]
    };

    // Define chart options
    this.chartOptions = {
      scales: {
        y: {
          ticks: {
            font: {
              size: 12 // Set font size for y-axis labels
            }
          }
        },
        x: {
          ticks: {
            font: {
              size: 12 // Set font size for x-axis labels (months)
            }
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            font: {
              size: 14 // Set font size for legend labels
            }
          }
        }
      }
    };
  }
}
// import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { HttpClient } from '@angular/common/http'; // Import HttpClient
// import { Chart, ChartOptions } from 'chart.js/auto';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   encapsulation: ViewEncapsulation.None // Disable view encapsulation
// })
// export class LoginComponent implements OnInit {

//   salesData: any;
//   salesData2: any;
//   chartOptions!: ChartOptions; // Define chart options

//   constructor(private http: HttpClient) {} // Inject HttpClient

//   ngOnInit(): void {
//     // Make GET request to fetch salesData
//     this.http.get<any>('your-api-url/salesData').subscribe(data => {
//       this.salesData = data;
//     });

//     // Make GET request to fetch salesData2
//     this.http.get<any>('your-api-url/salesData2').subscribe(data => {
//       this.salesData2 = data;
//     });

//     // Define chart options
//     this.chartOptions = {
//       scales: {
//         y: {
//           ticks: {
//             font: {
//               size: 12 // Set font size for y-axis labels
//             }
//           }
//         },
//         x: {
//           ticks: {
//             font: {
//               size: 12 // Set font size for x-axis labels (months)
//             }
//           }
//         }
//       },
//       plugins: {
//         legend: {
//           labels: {
//             font: {
//               size: 14 // Set font size for legend labels
//             }
//           }
//         }
//       }
//     };
//   }
// }
