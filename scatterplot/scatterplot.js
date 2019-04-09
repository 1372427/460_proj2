function makeGraph(){
    let w = 500;
    let h = 500;

    let dataset = [
       {x: 57.435896111908356, y: 46.17694227474871},
       {x: 29.827829142630556, y: 75.44828631374034},
       {x: 40.507303681196994, y: 47.00586641020321},
       {x: 81.24109283621132, y: 58.98088371941961},
       {x: 80.86688024984056, y: 91.16150963362398},
       {x: 23.646093664109035, y: 57.872787208321476},
       {x: 32.609104916230926, y: 34.7333982455353},
       {x: 15.895725932429139, y: 56.561706987840374},
       {x: 31.844054626735584, y: 64.52885141931574},
       {x: 37.220128438660694, y: 31.358333409246963},
       {x: 78.86581155090802, y: 76.61099870383943},
       {x: 41.81805136455608, y: 15.267080442402614},
       {x: 74.309849093534, y: 45.4589835108774},
       {x: 37.02377773075669, y: 34.788101333600196},
       {x: 61.27852923639312, y: 27.985912675920655},
       {x: 83.31666058832319, y: 65.1515865769896},
       {x: 5.51468718876249, y: 69.31113124452308},
       {x: 71.87862430939398, y: 22.379555560372033},
       {x: 9.887344764013006, y: 82.84481708257283},
       {x: 60.343400720768805, y: 76.27119483344933},
       {x: 33.518851406818584, y: 10.427779529394797},
       {x: 7.335834099036731, y: 22.611381932247788},
       {x: 39.228836413545196, y: 9.382227321299762},
       {x: 96.36386087377473, y: 20.239816484822803},
       {x: 23.949425676620486, y: 10.111929667288155},
       {x: 54.16388129912066, y: 35.157332257016805},
       {x: 11.780068953547884, y: 20.190816726421403},
       {x: 33.98666952743472, y: 48.935068862900536},
       {x: 42.31587974711704, y: 11.762941584818654},
       {x: 31.616903968206557, y: 33.51510889493954},
       {x: 43.74348422420138, y: 55.02543109080771}  
    ];
    
    
      // create our SVG element
      let svg = d3.select('#svg').append('svg').attr('width', w).attr('height', h);
    
      let yScale = d3.scaleLinear()
                  .domain([0, 100])
                  .range([h - 50, 40]);
    
      let xScale = d3.scaleLinear()
                  .domain([0, 100])
                  .range([50, w - 20]);
    
      svg.selectAll('circle')
        .data(dataset)
        .enter()
          .append('circle')
          .attr('cx', (d) => xScale(d.x))
          .attr('cy', (d) => yScale(d.y))
          .attr('r', 5)
          .style('fill', 'red');
    
      // create our x-axis and customize look with .ticks() and
      // .tickFormat()
      let xAxis = d3.axisBottom(xScale);
      let xAxisGroup = svg.append('g')
                      .attr('transform', `translate(0, ${h - 50})`)
                      .call(xAxis);
    
      let yAxis = d3.axisLeft(yScale);
      let yAxisGroup = svg.append('g')
                      .attr('transform', `translate(50, 0)`)
                      .call(yAxis);


      svg.append('text')
      .classed('axis-label', true)
      .attr('transform', 'rotate(-90)')
      .attr('x', -h/2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .text('Number Bugs Counted')
      
    svg.append('text')
      .classed('axis-label', true)
      .attr('x', w/2)
      .attr('y', h - 5)
      .attr('text-anchor', 'middle')
      .text('Humidity')
      
    svg.append('text')
    .classed('title', true)
    .attr('x', w/2)
    .attr('y', 20)
    .attr('text-anchor', 'middle')
    .text('Bugs Counted vs. Humidity')
}

window.onload = function(){
    makeGraph();
  } 