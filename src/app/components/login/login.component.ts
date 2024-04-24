import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  

  ngOnInit(): void {
  
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
