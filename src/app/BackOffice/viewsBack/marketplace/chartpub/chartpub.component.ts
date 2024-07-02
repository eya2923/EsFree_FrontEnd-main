import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Etat, PubItem } from 'src/app/Models/pubitem';
import { PubitemService } from 'src/app/Services/pubitem.service';

@Component({
  selector: 'app-chartpub',
  templateUrl: './chartpub.component.html',
  styleUrls: ['./chartpub.component.css']
})
export class ChartpubComponent implements OnInit {
  chart: any;

  constructor(private PubitemService: PubitemService) { }

  ngOnInit(): void {
    this.PubitemService.getPubitems().subscribe((items: PubItem[]) => {
      const counts = items.reduce((acc: Record<Etat, number>, item: PubItem) => {
        acc[item.etat] = (acc[item.etat] || 0) + 1;
        return acc;
      }, {} as Record<Etat, number>);

      const labels = Object.keys(counts);
      const data = Object.values(counts);

      this.renderChart(labels, data);
    });
  }

  renderChart(labels: string[], data: number[]): void {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    canvas.width = 50; // Adjust as needed
    canvas.height = 50; 
  
    // Check if ctx is null before creating the chart
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Number of Items by State',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Could not get 2D context for canvas');
    }
  }

}
