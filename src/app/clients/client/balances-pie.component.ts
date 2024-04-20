import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';

export class BalancesPieData {
  positiveBalances: number = 0;
  negativeBalances: number = 0;
}

interface PieData {
  id:number;
  name:string;
  value:number;
}

@Component({
  selector: 'app-balances-pie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './balances-pie.component.html',
  styleUrl: './balances-pie.component.scss'
})
export class BalancesPieComponent implements AfterViewInit {
  @Output('sliceClicked') sliceClicked = new EventEmitter();
  @ViewChild('balancesPieChart') chartElement!: ElementRef;

  private pieData: PieData[] = [];
  @Input('data')
  set data(data: BalancesPieData){
    this.pieData = [
      {id:+1, name:'>=0', value:data.positiveBalances},
      {id:-1, name:'<0', value:data.negativeBalances}
    ]

    this.showPie = data.positiveBalances > 0 || data.negativeBalances > 0;
  }

  private svg: any;
  private selectedSlice: PieData|null = null;
  private sliceColors = ['#888', '#ccc'];
  private selectedSliceColor = '#3377FF';

  showPie: boolean = false;

  ngAfterViewInit(): void {
    if (this.showPie) {
      this.createPie();
    }
  }

  private createPie() {
    const width = this.chartElement.nativeElement.clientWidth;
    const height = this.chartElement.nativeElement.clientHeight;
    const arcRadius = Math.min(width, height) / 2 - 1;
    const labelRadius = arcRadius * 0.8;

    const color = d3.scaleOrdinal()
                  .domain(this.pieData.map(d => d.name))
                  .range(this.sliceColors);
    
    // Create the pie layout and arc generator.
    const pie = d3.pie<any>()
                  .sort(null)
                  .value((d:any) => d.value);
    
    const arc = d3.arc()
                  .innerRadius(0)
                  .outerRadius(arcRadius);
    
    
    // A separate arc generator for labels.
    const arcLabel = d3.arc()
                      .innerRadius(0)
                      .outerRadius(labelRadius);
    
    const arcs = pie(this.pieData);

    this.svg = d3.select(this.chartElement.nativeElement)
          .append("svg:svg")
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", [-width / 2, -height / 2, width, height])
          .attr("style", "max-width: 100%; height: auto; font: 11px sans-serif;");
    
    // Add a sector path for each value.
    const path = this.svg.append("g")
        .attr("stroke", "white")
      .selectAll()
      .data(arcs)
      .join("path")
        .attr("fill", (d:any) => color(d.data.name))
        .attr("d", arc)
        .style("cursor", "pointer");
      
    path.append("title")
        .text((d:any) => d.data.name);
    
    path.on('mouseover', function (this:any, evt:any, d:any) {
        d3.select(this).transition()
            .duration(50)
            .attr('opacity', '.85');
    })
    path.on('mouseout', function (this:any, evt:any, d:any) {
        d3.select(this).transition()
            .duration(50)
            .attr('opacity', '1');
    });
    path.on('click', (evt:any, d:any) => {
      if (!!this.selectedSlice && this.selectedSlice.id === d.data.id){
        this.selectedSlice = null;
      }
      else{
        this.selectedSlice = d.data;
      }
  
      this.svg.selectAll('path')
        .attr('fill', (d:any) => (!!this.selectedSlice && d.data.id === this.selectedSlice.id) ? this.selectedSliceColor:color(d.data.name));

      // notify parent
      this.sliceClicked.emit(this.selectedSlice?.id);
    });

    // Slice labels
    this.svg.append("g")
        .attr("text-anchor", "middle")
      .selectAll()
      .data(arcs)
      .join("text")
        .attr("transform", (d:any) => `translate(${arcLabel.centroid(d)})`)
        .call((text:any) => text.append("tspan")
            .attr("y", "0")
            .style("cursor", "pointer")
            .text((d:any) => d.data.name));
    
  }
}
