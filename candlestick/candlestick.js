
let dataset = 
[
    {date:new Date(2018,4,1),open:733,high:857,low:622,close:784},
    {date:new Date(2018,4,2),open:641,high:715,low:598,close:706},
    {date:new Date(2018,4,3),open:376,high:446,low:16,close:125},
    {date:new Date(2018,4,4),open:585,high:600,low:576,close:597},
    {date:new Date(2018,4,5),open:605,high:810,low:122,close:353},
    {date:new Date(2018,4,6),open:884,high:973,low:857,close:941},
    {date:new Date(2018,4,7),open:660,high:759,low:435,close:747},
    {date:new Date(2018,4,8),open:646,high:676,low:487,close:572},
    {date:new Date(2018,4,9),open:301,high:660,low:7,close:575},
    {date:new Date(2018,4,10),open:925,high:991,low:712,close:923},
    {date:new Date(2018,4,11),open:959,high:963,low:867,close:948},
    {date:new Date(2018,4,12),open:721,high:937,low:612,close:696},
    {date:new Date(2018,4,13),open:543,high:689,low:290,close:464},
    {date:new Date(2018,4,14),open:925,high:986,low:897,close:910},
    {date:new Date(2018,4,15),open:341,high:712,low:241,close:547},
    {date:new Date(2018,4,16),open:885,high:905,low:770,close:861},
    {date:new Date(2018,4,17),open:766,high:873,low:695,close:832},
    {date:new Date(2018,4,18),open:137,high:392,low:74,close:86},
    {date:new Date(2018,4,19),open:663,high:797,low:633,close:644},
    {date:new Date(2018,4,20),open:861,high:978,low:524,close:964},
    {date:new Date(2018,4,21),open:607,high:807,low:480,close:786},
    {date:new Date(2018,4,22),open:357,high:962,low:104,close:207},
    {date:new Date(2018,4,23),open:973,high:991,low:971,close:986},
    {date:new Date(2018,4,24),open:357,high:629,low:185,close:496},
    {date:new Date(2018,4,25),open:200,high:812,low:119,close:168}
];

function makeGraph() {
    let w=500;
    h=500;
    let svg = d3.select('#svg')
                .append('svg')
                .attr('width', w)
                .attr('height', h);

    let xScale = d3
        .scaleTime()
        .domain(d3.extent(dataset, d => d.date))
        .range([50, w - 20]);

    let yScale = d3
        .scaleLinear()
        .domain([0, 1000])
        .range([h - 50, 30]);

    let candles = svg.selectAll('.candle')
        .data(dataset)
        .enter()
        .append('g');

    candles
        .append('line')
        .attr('x1', d=> xScale(d.date)+5)
        .attr('x2', d=> xScale(d.date)+5)
        .attr('y1', d=> yScale(d.low))
        .attr('y2', d=> yScale(d.high))
        .attr("stroke-width", 2)
        .style('stroke', d=> (d.open>d.close?'green':'red'));
    
    candles
        .append('rect')
        .attr('x', d=> xScale(d.date))
        .attr('y', d=> (d.open>d.close? yScale(d.open):yScale(d.close)))
        .attr('width', 10)
        .attr('height', d => Math.abs(yScale(d.open)-yScale(d.close)))
        .style('fill', d=> (d.open>d.close?'green':'red'))


    let xAxis = d3
        .axisBottom(xScale)
        .tickFormat(d3.timeFormat("%m/%d"));

    let xAxisGroup = svg
        .append("g")
        .attr("transform", `translate(0, ${h - 50})`)
        .call(xAxis);
    
    let yAxis = d3.axisLeft(yScale);
    let yAxisGroup = svg
        .append("g")
        .attr("transform", `translate(50, 0)`)
        .call(yAxis);

        svg.append('text')
        .classed('axis-label', true)
        .attr('transform', 'rotate(-90)')
        .attr('x', -h/2)
        .attr('y', 15)
        .attr('text-anchor', 'middle')
        .text('Stock Price ($)')
        
      svg.append('text')
        .classed('axis-label', true)
        .attr('x', w/2)
        .attr('y', h - 5)
        .attr('text-anchor', 'middle')
        .text('Date (2018)')
        

     svg.append('text')
     .classed('title', true)
     .attr('x', w/2)
     .attr('y', 20)
     .attr('text-anchor', 'middle')
     .text('Company A Stock')

}

window.onload = () => {
    makeGraph();
}

