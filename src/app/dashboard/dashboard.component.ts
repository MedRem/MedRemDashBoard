import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import * as firebase from 'firebase';
import { RammmadService } from 'app/Service/rammmad.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users;
  allspecialist;
  appoint;
  meds;

  userCount: any;
  specialistCount: any;
  appointCount: any;
  medsCount: any;

  constructor(
    public rammmadService: RammmadService
  ) { }

  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };

  ngOnInit() {
    // getting displaying infor
    this.rammmadService.getallusers().then(users => {
      this.users = users;
      // console.log( this.users);
    })

    this.rammmadService.getallspecialist().then(specialist => {
      this.allspecialist = specialist;
      // console.log( this.allspecialist);
    })

    this.rammmadService.getAppointment().then(appoint => {
      this.appoint = appoint;
      // console.log( this.appoint);
    })

    this.rammmadService.getMedication().then(medss => {
      this.meds = medss;
      // console.log( this.meds);
    })

    // getting numbers
    this.rammmadService.CountUsers().then(countusers => {
      this.userCount = countusers;
      // console.log( this.userCount);
    })

    this.rammmadService.CountSpecialist().then(countspecialist => {
      this.specialistCount = countspecialist;
      // console.log( this.specialistCount);
    })

    this.rammmadService.CountAppoints().then(countappoint => {
      this.appointCount = countappoint;
      // console.log( this.appointCount);
    })

    this.rammmadService.CountMeds().then(countmeds => {
      this.medsCount = countmeds;
      // console.log( this.medsCount);
    })

      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      const dataDailySalesChart: any = {
          labels: ['Tembisa', 'Soweto', 'Johannesburg', 'Pretoria'],
          series: [
              [5, 3, 1, 1]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 7, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      const dataCompletedTasksChart: any = {
          labels: ['Neurologists"', 'Dermatologists', 'Allergists'],
          series: [
              [3, 3, 4]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 5, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);



      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      var datawebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      var optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);
  }


  

}
