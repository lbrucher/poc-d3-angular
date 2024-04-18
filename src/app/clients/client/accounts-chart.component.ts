import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import { Client } from '../../models/client';
import { Account } from '../../models/account';
import { CardType } from '../../models/card-type';
import { ChartData } from '../chart-data';


@Component({
  selector: 'app-accounts-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accounts-chart.component.html',
  styleUrl: './accounts-chart.component.scss'
})
export class AccountsChartComponent implements AfterViewInit {
  @Input('client') client!: Client;
  @Input('chartData') chartData!: ChartData;
  @Output('chartClicked') chartClicked = new EventEmitter();
  @ViewChild('accountChart') chartElement!: ElementRef;

  private _accounts!: Account[];
  @Input('accounts')
  get accounts(): Account[] { return this._accounts; }
  set accounts(accounts:Account[]) {
    const initial = this._accounts == null;
    this._accounts = accounts;
    // only perform updates once the component has been fully initialized
    if (!initial){
      this.updateChart();
    }
  }

  @Input('cardTypes')
  set cardTypes(cardTypes:CardType[]) {
    this.cardTypeColors = {};
    for(const ct of cardTypes){
      this.cardTypeColors[ct.name] = ct.color;
    }
  }

  
  private svg: any;
  private x: any;   // x scale
  private y: any;   // y scale

  private margins = {top:30, right:30, bottom:30, left:30};
  private barWidth = 50;
  
  private unknownCardTypeColor = '#999';
  private cardTypeColors: any = {};


  ngAfterViewInit(): void {
    this.createChart();
  }

  onChartClicked() {
    this.chartClicked.emit();
  }

  private getChartInnerHeight(){
    // this (barWidth+10) sucks. prolly why the bar gets thinner when it's the unique one to draw on the chart...
//    return this.accounts.length*(this.barWidth+10);
    return this.accounts.length*this.barWidth;
  }
  
  private adjustChartHeight(chartInnerHeight: number) {
    // Adjust the englobing <div>'s height so that the entire chart can be seen
    // We max it out at 400px with a scroll overflow.
    const height = chartInnerHeight + this.margins.top + this.margins.bottom;
    this.chartElement.nativeElement.style.height = (height > 400 ? 400:height)+'px';
  }

  private displayNoChartInfo() {
    // Always get rid of the message if there was one!
    this.svg.select('.account-no-chart').remove();

    if (this._accounts.length === 0){
      var t = d3.transition().duration(750);
      this.svg
        .append("text")
          .attr("x", this.chartElement.nativeElement.clientWidth/2)
          .attr("text-align", "center")
          .attr("text-anchor", "middle")
          .attr("class", "account-no-chart")
          .style("font-family", "Verdana, Arial, Helvetica, sans-serif")
          .style("font-size", "9pt")
          .attr("fill", "#999")
          .text("There are no accounts to display!")
        .transition(t)
          .attr("y", this.chartElement.nativeElement.clientHeight/2);
    }
  }

  private createChart() {
    this.svg = d3.select(this.chartElement.nativeElement)
      .append("svg:svg")
      .attr("width", "100%")
      .attr("height", "100%");

    // This is the amount of vertical space we need for the chart
    const chartInnerHeight = this.getChartInnerHeight();

    // Adjust chart height
    this.adjustChartHeight(chartInnerHeight);

    // X/Y Scales
    this.x = d3.scaleLinear()
            .domain([this.chartData.minValue, this.chartData.maxValue])
            .range([this.margins.left, this.chartElement.nativeElement.clientWidth-this.margins.right]);
  
    this.y = d3.scaleBand()
          .domain(this.accounts.map(a => a.number.toString()))
          .range([this.margins.top, chartInnerHeight])
          .padding(0.1);

    // X Axis
    this.svg.append("g")
      .attr("class", "xaxis")
      .style("opacity", this.accounts.length === 0 ? 0:1)
      .attr("transform", `translate(0,${chartInnerHeight})`)
      .call(d3.axisBottom(this.x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
  
    // Y Axis
    this.svg.append("g")
      .attr("class", "yaxis")
      .style("opacity", this.accounts.length === 0 ? 0:1)
      .attr("transform", `translate(${this.x(0)}, 0)`)
      .call(d3.axisLeft(this.y).tickSize(0))
      .call((g:any) => g.selectAll(".tick text")
                  .filter((_:any, i:number) => this.accounts[i].balance < 0)
                  .attr("transform", "translate(8,0)")
                  .style("text-anchor", "start")
          );


    this.drawBars();
    this.displayNoChartInfo();
  }  


  private updateChart() {
    var chartInnerHeight = this.getChartInnerHeight();
    this.y.domain(this.accounts.map(a => a.number.toString()))
    this.y.range([this.margins.top, chartInnerHeight]);

    // Readjust the chart's height
    this.adjustChartHeight(chartInnerHeight);

    var t = d3.transition().duration(750);
  
    this.svg.selectAll(".xaxis")
      .transition(t)
      .attr("transform", `translate(0,${chartInnerHeight})`)
      .style("opacity", this.accounts.length === 0 ? 0:1)
  
    this.svg.selectAll(".yaxis")
      .transition(t)
      .style("opacity", this.accounts.length === 0 ? 0:1)
      .call(d3.axisLeft(this.y));
  
    this.drawBars();
    this.displayNoChartInfo();
  }


  private barColor(account: Account) {
    return this.cardTypeColors[account.card_type]||this.unknownCardTypeColor;
  }
  
  
  private drawBars() {
    const x0 = this.x(0);

    // In essence we're each time rebuilding the entire chart: some bar are new,
    // some need to be removed and others are still there, but maybe at a different
    // location on the band axis...
    // Our data is keyed by 'id' and we can't tell if an element with a given id
    // and in both the old and new datasets is at the same place on the chart.
    // Kinda the easiest here is to just remove all bars and recreate the chart.
    // It's not that bad With some animation...
    // 
    this.svg.selectAll("rect.bar").remove();

    const t = d3.transition().duration(750);
    const bars = this.svg.selectAll("rect.bar")
                  .data(this.accounts, function(a:Account) { return a.id; });

    // Enter new elements
    bars.enter()
      .append("rect")
        .attr("class", "bar")
        .attr("y", (a:Account) => this.y(a.number.toString()))
        .attr("height", this.y.bandwidth())
        .attr("fill", (a:Account) => this.barColor(a))
        .attr("x", (a:Account) => a.balance >= 0 ? x0 : this.x(a.balance))
      .transition(t)
        .attr("width", (a:Account) => Math.abs(this.x(a.balance)-x0));
  }
}
