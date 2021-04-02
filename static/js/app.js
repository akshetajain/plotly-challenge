function optionChanged(valuename) {
    d3.json("samples.json").then((incomingdata) => {

    var metadatavar = incomingdata.samples;
    console.log(metadatavar);
    var filtervar = metadatavar.filter(sample => sample.id == valuename);
    var filtervar2 = filtervar[0];

    // Bar chart
    var otu_ids = filtervar2.otu_ids;
    var ylabel = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();

    var sample_values = filtervar2.sample_values;
    var xlabel = sample_values.slice(0,10).reverse();

    var otu_labels = filtervar2.otu_labels;
    var hovertext = otu_labels.slice(0,10).reverse();

    var bargraph = {
        x: xlabel, 
        y: ylabel,
        type: "bar",
        orientation: "h",
        text: hovertext
    };

    var data = [bargraph];
    var layout = {
        title: "Bar Chart"
    };

    Plotly.newPlot("bar", data, layout);
    });

    // Bubble chart

    var otu_ids2 = filtervar2.otu_ids;
    var otu_labels2 = filtervar2.otulabels;
    var sample_values2 = filtervar2.sample_values;


    var bubblechart = {
        title: "Bubble Chart",
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30}

    };

    var bubblechart2 = [
    {
        x: otu_ids2,
        y: sample_values2,
        text: otu_labels2,
        mode: "markers",
        marker: {
         size: sample_values,
         color: otu_ids,
         colorscale: "Earth"

    }
}

];

Plotly.newPlot("bubble", bubblechart2, bubblechart);


};

function samplenames() {
    d3.json("samples.json").then((incomingdata) => {
        var storednames = incomingdata.names
        console.log(storednames)
        var selecttag = d3.select("#selDataset");
        storednames.forEach(function(name) {
            selecttag.append("Option").text(name).property("value",name)
        })

    });
}

samplenames();


