function makeGraph() {
    let data = [
        [10,20,30, 50, 60, 10],
        [300, 60, 80,20, 20, 30],
        [100,200,10,20, 60, 20],
        [10,20,30, 60, 40, 90],
        [300, 60, 80, 20, 10, 10],
        [100,200,10, 10, 50, 5]
    ];
    let colors = ["red", "orange", "yellow", "green", "blue", "purple"]
    let w = 500;
    let h = 500;

    let chordGenerator = d3.chord()
        .padAngle(0.05)     // padding between entities (black arc)
        .sortSubgroups(d3.descending);

    let chords = chordGenerator(data);
    console.log(chords)

    let ribbonGenerator = d3.ribbon().radius(200);

    let svg = d3.select("#svg")
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    svg.append('g')
       .attr("transform", `translate(240, 270)`)
        .selectAll('path')
        .data(chords)
        .enter()
        .append('path')
        .attr('d', ribbonGenerator)
        .attr('fill', (d, i) =>colors[d.source.index])
        .style("stroke", "black")
        .attr('opacity', 0.8);

        //
    svg.datum(chords)
        .append("g")
        .attr("transform", `translate(240, 270)`)
        .selectAll("g")
        .data(function(d) { return d.groups; })
        .enter()
        .append("g")
        .append("path")
            .style("fill", (d => colors[d.index]))
            .style("stroke", "black")
            .attr("d", d3.arc()
            .innerRadius(200)
            .outerRadius(210)
        )
    
    // LEGEND - built using Susie Lu's d3.svg.legend package
    let legendScale = d3.scaleOrdinal()
                        .domain(["US", "Canada", "Mexico", "England", "France", "Spain"])
                        .range(colors);
  
    svg.append("g")
      .attr("class", "legendOrdinal")
      .attr("transform", "translate(430, 10)");
  
    // see https://github.com/d3/d3-shape#symbols for information about d3 symbol shapes
    var legendOrdinal = d3.legendColor()
      .shape("path", d3.symbol().type(d3.symbolSquare).size(60)())
      .shapePadding(10)
      .scale(legendScale);
  
    svg.select(".legendOrdinal")
      .call(legendOrdinal);

      

     svg.append('text')
     .classed('title', true)
     .attr('x', w/2)
     .attr('y', 20)
     .attr('text-anchor', 'middle')
     .text('2018 Emigration')

  
        
}

window.onload= () => {
    makeGraph();
}