import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import { Client } from '../../models/client';
import { Account } from '../../models/account';
import { AccountsService } from '../../services/accounts.service';
import { CardTypes } from '../../models/card-type';

class LegendItem {
  type: string;
  color: string;
  constructor(type:string, color:string){
    this.type=type;
    this.color=color;
  }
}

@Component({
  selector: 'app-accounts-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accounts-chart.component.html',
  styleUrl: './accounts-chart.component.scss'
})
export class AccountsChartComponent implements AfterViewInit {
  @Input('client') client!: Client;
  @ViewChild('accountChart') chartElement!: ElementRef;

  private accounts: Account[] = [];

  private svg: any;
  private x: any;   // x scale
  private y: any;   // y scale


  private margins = {top:30, right:10, bottom:20, left:50};
  private barWidth = 100;
  
  //TODO what if we have more card types than the colors defined here?
  private allCardTypeColors = ['#024C8C', '#F0991B', '#9BCAA7', 'red', 'blue', 'green'];
  private unknownCardTypeColor = '#999';
  private cardTypeColors: any = {};
  
  private selectedCardTypes: any = {};
  
  legendItems: LegendItem[] = [];


  constructor(private accountService: AccountsService) {
    const colors = this.allCardTypeColors.slice(0);
    for (const type of CardTypes) {
      this.cardTypeColors[type] = colors.shift();
      this.selectedCardTypes[type] = true;  // all types selected by default
      this.legendItems.push(new LegendItem(type, this.cardTypeColors[type]));
    }
  }

  ngAfterViewInit(): void {
    this.accountService.getAccounts(this.client.accounts).subscribe(accounts => {
      this.accounts = accounts;
      //this.selectedAccounts = this.accounts.slice(0);
      this.createChart();
      this.drawAxis();
      this.drawBars(this.accounts);
    });

  }


  selectCardType(cardType:string, event:any) {
    console.log("SELECT: ", cardType, event, event.srcElement);

    // toggle the current selection
    this.selectedCardTypes[cardType] = !this.selectedCardTypes[cardType];
    
    // Find the <input> element corresponding to the item we clicked on so that we can properly set its check/uncheck state
    // When we click on the <input>, the state changes but it does not when we click outside of the <input>.
    // This is why we override the <input> state so it's accurate on all circumstances.
    // First find the <span> element corresponding to the legend item
    let el = event.target;
    while(el.className !== 'legend-item') {
      el = el.parentElement;
    }
    // Then find the child <input> element underneath the <span>
    const elInput:any = Array.from(el.childNodes).find((e:any) => e.nodeName === 'INPUT');

    // Correclty set the <input> state
    elInput.checked = this.selectedCardTypes[cardType];

    // Rebuild the list of accounts to display
    const accounts = this.accounts.filter(a => this.selectedCardTypes[a.card_type]);

//TODO not properly redrawn... 
    this.x.domain(accounts.map(a => a.number.toString()))
    this.svg
      .selectAll(".xaxis")
      .transition()
      .duration(500)
      .call(d3.axisBottom(this.x));
  
    this.drawBars(accounts);
  }
  

  private createChart() {
    this.svg = d3.select(this.chartElement.nativeElement)
      .append("svg:svg")
      .attr("width", "100%")
      .attr("height", "100%");

    // Set the width of the chart to whatever size we do need.
    // If this width becomes larger than its parent container, this one has an overflow setup to scroll horizontally
    const innerChartWidth = this.accounts.length* (this.barWidth+10);
    this.chartElement.nativeElement.style.width = (innerChartWidth+this.margins.left+this.margins.right)+'px';

    // X Scale
    this.x = d3.scaleBand()
              .domain(this.accounts.map(a => a.number.toString()))
              .range([this.margins.left, innerChartWidth])
              .padding(0.2);

    // Y Scale
    const balances = this.accounts.map(a => a.balance);
    var max_value = Math.max(0, ...balances);
    var min_value = Math.min(0, ...balances);
    this.y = d3.scaleLinear()
              .domain([min_value, max_value])
              .range([this.chartElement.nativeElement.clientHeight-this.margins.bottom, this.margins.top]);
  }  

  private drawAxis() {
    // X Axis
    this.svg.append("g")
      .attr("class", "xaxis")
      .attr("transform", `translate(0,${this.y(0)})`)
      .call(d3.axisBottom(this.x).tickSize(0).tickPadding(6))
      .call((g:any) => g.selectAll(".tick text")
                  .filter((_:any, i:number) => this.accounts[i].balance < 0)
                  .attr("transform", "translate(0,-20)"));

    // Y Axis
    this.svg.append("g")
      .attr("transform", `translate(${this.margins.left},0)`)
      .call(d3.axisLeft(this.y).tickFormat((y:any) => y.toFixed()))
      .call((g:any) => g.append("text")
          .attr("x", -this.margins.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("Account Balance"));
  }
  
  private barColor(account: Account) {
    //console.log("BAR COLOR: ",account);
    return this.cardTypeColors[account.card_type]||this.unknownCardTypeColor;
  }
  
  private drawBars(accounts: Account[], reason?:string) {
    const y0 = this.y(0);
  
    var bars = this.svg.selectAll("rect.bar").data(accounts);
  
    bars
      .enter()
      .append("rect")
        .attr("class", "bar")
        .attr("x", (account:Account) => this.x(account.number.toString()))
        .attr("width", this.x.bandwidth())
        .attr("fill", (account:Account) => this.barColor(account))
        .attr("height", 0)    // no bar at the beginning
        .attr("y", (account:Account) => y0);
  
    bars.exit().remove();
  
    // Animation
    this.svg.selectAll("rect.bar")
      .transition()
      .duration(300)
      .attr("y", (account:Account) => account.balance < 0 ? y0 : this.y(account.balance))
      .attr("height", (account:Account) => Math.abs(this.y(account.balance)-y0))
      .delay((_:any,i:number) => i*100);
  
    
    if (reason === 'neg-balanaces-over') {
      this.svg.selectAll("rect.bar")
        .transition()
        .duration(500)
        .attr("fill", (account:Account) => account.balance < 0 ? this.barColor(account) : "#f0f0f0");
    }
    else if (reason === 'pos-balanaces-over') {
      this.svg.selectAll("rect.bar")
        .transition()
        .duration(500)
        .attr("fill", (account:Account) => account.balance > 0 ? this.barColor(account) : "#f0f0f0");
    }
    else if (reason === 'reset-balanaces') {
      this.svg.selectAll("rect.bar")
        .transition()
        .duration(500)
        .attr("fill", (account:Account) => this.barColor(account));
    }
  }
  
}
