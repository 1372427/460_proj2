function makeGraph() {
    let data = [
        [10,20,30],
        [40, 60, 80],
        [100,200,300]
    ];
    let w = 500;
    let h = 500;

    let chordGenerator = d3.chord();

    let chords = chordGenerator(data);

    let ribbonGenerator = d3.ribbon().radius(200);

    let svg = d3.select("#svg")
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    svg.append('g')
       .attr("transform", `translate(250, 250)`)
        .selectAll('path')
        .data(chords)
        .enter()
        .append('path')
        .attr('d', ribbonGenerator)
        .attr('fill', '#ddd')
        .attr('stroke', '#ccc')
        .attr('opacity', 0.8);
}

window.onload= () => {
    makeGraph();
}