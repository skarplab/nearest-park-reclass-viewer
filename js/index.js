const mapConfig = {
  center: [-78.642688, 35.777734],
  zoom: 12
};

const colorPalette = ["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"];

const classBreakSymbols = {
  a: {
    type: "simple-fill",
    color: colorPalette[4],
    style: "solid",
    outline: {
      width: 0
    }
  },
  b: {
    type: "simple-fill",
    color: colorPalette[3],
    style: "solid",
    outline: {
      width: 0
    }
  },
  c: {
    type: "simple-fill",
    color: colorPalette[2],
    style: "solid",
    outline: {
      width: 0
    }
  },
  d: {
    type: "simple-fill",
    color: colorPalette[1],
    style: "solid",
    outline: {
      width: 0
    }
  },
  f: {
    type: "simple-fill",
    color: colorPalette[0],
    style: "solid",
    outline: {
      width: 0
    }
  }
};

const classBreakInfos = {
  quantile: [
    {
      minValue: 0,
      maxValue: 0.34808452120741512,
      label: "< 0.35",
      symbol: classBreakSymbols.a
    },
    {
      minValue: 0.34808452120741513,
      maxValue: 0.69358269292405539,
      label: "0.35 - 0.69",
      symbol: classBreakSymbols.b
    },
    {
      minValue: 0.6935826929240554,
      maxValue: 1.073097773703062,
      label: "0.70 - 1.07",
      symbol: classBreakSymbols.c
    },
    {
      minValue: 1.073097773703063,
      maxValue: 1.5664402798982171,
      label: "1.07 - 1.56",
      symbol: classBreakSymbols.d
    },
    {
      minValue: 1.5664402798982172,
      maxValue: 1000,
      label: "1.56+",
      symbol: classBreakSymbols.f
    }
  ],
  halfStep: [
    {
      minValue: 0,
      maxValue: 0.4999,
      label: "< 0.5",
      symbol: classBreakSymbols.a
    },
    {
      minValue: 0.5,
      maxValue: 0.9999,
      label: "0.5 - 1.0",
      symbol: classBreakSymbols.b
    },
    {
      minValue: 1.0,
      maxValue: 1.4999,
      label: "1.0 - 1.5",
      symbol: classBreakSymbols.c
    },
    {
      minValue: 1.5,
      maxValue: 1.9999,
      label: "1.5 - 2.0",
      symbol: classBreakSymbols.d
    },
    {
      minValue: 2.0,
      maxValue: 1000,
      label: "2.0+",
      symbol: classBreakSymbols.f
    }
  ],
  doubleStep: [
    {
      minValue: 0,
      maxValue: 0.4999,
      label: "< 0.5",
      symbol: classBreakSymbols.a
    },
    {
      minValue: 0.5,
      maxValue: 0.9999,
      label: "0.5 - 1.0",
      symbol: classBreakSymbols.b
    },
    {
      minValue: 1.0,
      maxValue: 1.9999,
      label: "1.0 - 2.0",
      symbol: classBreakSymbols.c
    },
    {
      minValue: 2.0,
      maxValue: 3.9999,
      label: "2.0 - 4.0",
      symbol: classBreakSymbols.d
    },
    {
      minValue: 4.0,
      maxValue: 1000,
      label: "4.0+",
      symbol: classBreakSymbols.f
    }
  ]
};

const layerUrls = {
  base:
    "https://jsapi.maps.arcgis.com/sharing/rest/content/items/5e9b3685f4c24d8781073dd928ebda50/resources/styles/root.json",
  blocks:
    "https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/EBPA_Demographic_and_Community_Analysis_by_Census_Block/FeatureServer/0",
  ralParks:
    "https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/Parks_with_Analysis_Tiers/FeatureServer/0",
  otherParks:
    "https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/raleigh_county_state_parks/FeatureServer/1",
  labels:
    "https://jsapi.maps.arcgis.com/sharing/rest/content/items/747cb7a5329c478cbe6981076cc879c5/resources/styles/root.json"
};

let barCountCtx = document.getElementById("block-count-chart").getContext("2d");
let barCountChart = new Chart(barCountCtx, {
  type: "bar",
  data: {
    labels: ["A", "B", "C", "D", "F"],
    datasets: [
      {
        label: "# of Blocks",
        backgroundColor: [
          colorPalette[4],
          colorPalette[3],
          colorPalette[2],
          colorPalette[1],
          colorPalette[0]
        ],
        borderColor: [
          colorPalette[4],
          colorPalette[3],
          colorPalette[2],
          colorPalette[1],
          colorPalette[0]
        ],
        borderWidth: 1
      }
    ]
  },
  options: {
    maintainAspectRatio: false,
    labels: {
      fontColor: "#ffffff"
    },
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "# Census Blocks"
          },
          gridLines: {
            display: false
          },
          ticks: {
            beginAtZero: true,
            fontColor: "#fff",
            max: 2500,
            min: 0,
            stepSize: 500,
            drawTicks: false
          }
        }
      ],
      xAxes: [{
					gridLines: {
						display: false
					},
					ticks: {
						fontColor: "#fff",
						fontSize: 10,
						lineWidth: 0
					}
				}]
    }
  }
});

let barPopCtx = document.getElementById("pop-sum-chart").getContext("2d");
let barPopChart = new Chart(barPopCtx, {
  type: "bar",
  data: {
    labels: ["A", "B", "C", "D", "F"],
    datasets: [
      {
        label: "Population",
        backgroundColor: [
          colorPalette[4],
          colorPalette[3],
          colorPalette[2],
          colorPalette[1],
          colorPalette[0]
        ],
        borderColor: [
          colorPalette[4],
          colorPalette[3],
          colorPalette[2],
          colorPalette[1],
          colorPalette[0]
        ],
        borderWidth: 1
      }
    ]
  },
  options: {
    maintainAspectRatio: false,
    labels: {
      fontColor: "#ffffff"
    },
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Population",
            fontColor: "#fff"
          },
          gridLines: {
            display: false
          },
          ticks: {
            beginAtZero: true,
            fontColor: "#fff",
            max: 200000,
            min: 0,
            stepSize: 50000,
            drawTicks: false
          }
        }
      ],
      xAxes: [{
					gridLines: {
						display: false
					},
					ticks: {
						fontColor: "#fff",
						fontSize: 10,
						lineWidth: 0
					}
				}]
    }
  }
});

let donutPopCtx = document.getElementById("pop-donut-chart").getContext("2d");
let donutPopChart = new Chart(donutPopCtx, {
  type: "doughnut",
  data: {
    labels: ["A", "B", "C", "D", "F"],
    datasets: [
      {
        label: "Population",
        backgroundColor: [
          colorPalette[4],
          colorPalette[3],
          colorPalette[2],
          colorPalette[1],
          colorPalette[0]
        ],
        borderColor: [
          colorPalette[4],
          colorPalette[3],
          colorPalette[2],
          colorPalette[1],
          colorPalette[0]
        ],
        borderWidth: 1
      }
    ]
  },
  options: {
    maintainAspectRatio: false,
    labels: {
      fontColor: "#ffffff"
    },
    legend: {
      display: false
    }
  }
});

require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/layers/VectorTileLayer",
  "esri/widgets/Legend",
  "esri/widgets/Expand",
  "esri/core/watchUtils",
  "dojo/query",
  "dojo/aspect",
  "dojo/on",
  "dojo/domReady!"
], function(
  Map,
  MapView,
  FeatureLayer,
  VectorTileLayer,
  Legend,
  Expand,
  watchUtils,
  query,
  aspect,
  on
) {
  const map = new Map();

  const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: mapConfig.zoom,
    center: mapConfig.center,
    highlightOptions: {
      fillOpacity: 0,
      color: [50, 50, 50]
    },
    popup: {
      dockEnabled: true,
      dockOptions: {
        position: "top-right",
        breakpoint: false
      }
    },
    constraints: {
      minScale: 577791
    }
  });

  //--------------------------------
  // CREATE RENDERER
  //--------------------------------
  const blockRenderer = {
    type: "class-breaks",
    field: "los_closest_park_dist",
    defaultSymbol: {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: "black",
      style: "backward-diagonal",
      outline: {
        width: 0.5,
        color: [50, 50, 50, 0.6]
      }
    },
    defaultLabel: "no data",
    classBreakInfos: classBreakInfos.quantile
  };

  //---------------------------------
  // ARCADE EXPRESSIONS
  //---------------------------------
  let arcadeExpressionInfos = [
    {
      name: "los-mileage-arcade",
      title: "Current Distance to Nearest Park",
      expression: "Round($feature.los_closest_park_dist, 2) + ' mi'"
    },
    {
      name: "la-mileage-arcade",
      title: "Distance to Nearest Park at Full System Build-Out",
      expression: "Round($feature.la_closest_park_dist, 2) + ' mi'"
    }
  ];

  //---------------------------------
  // LOAD LAYER(S)
  //---------------------------------
  // Basemap layer
  let baseLayer = new VectorTileLayer({
    url: layerUrls.base
  });
  map.add(baseLayer);

  // Census Blocks Layer
  let blockLayer = new FeatureLayer({
    url: layerUrls.blocks,
    title: "Raleigh ETJ Census Block",
    outFields: [
      "geoid10",
      "los_closest_park_dist",
      "la_closest_park_dist",
      "pop_2018"
    ],
    minScale: 577791,
    renderer: blockRenderer,
    popupTemplate: {
      title: "Census Block {geoid10}",
      content: [
        {
          type: "fields",
          fieldInfos: [
            {
              fieldName: "expression/los-mileage-arcade"
            },
            {
              fieldName: "expression/la-mileage-arcade"
            }
          ]
        }
      ],
      expressionInfos: arcadeExpressionInfos
    }
  });
  map.add(blockLayer);

  blockLayer
    .when(() => {
      return blockLayer.queryExtent();
    })
    .then(response => {
      view.goTo(response.extent);
    })
    .then(() => {
      let queryUrls = [];
      let starterBins = [
        { min: 0, max: 0.34808452120741512 },
        { min: 0.34808452120741513, max: 0.69358269292405539 },
        { min: 0.6935826929240554, max: 1.073097773703062 },
        { min: 1.073097773703063, max: 1.5664402798982171 },
        { min: 1.5664402798982171, max: 10000 }
      ];
      starterBins.forEach((bin, index) => {
        queryUrls.push(
          `${layerUrls.blocks}/query?f=json&where=${
            blockRenderer.field
          }+between+${bin.min}+and+${
            bin.max
          }&returnGeometry=false&outStatistics=[{"statisticType":"count","onStatisticField":"OBJECTID","outStatisticFieldName":"count"},{"statisticType":"sum","onStatisticField":"pop_2018","outStatisticFieldName":"pop"}]`
        );
      });
      queryBlockStatistics(queryUrls).then(results => {
        console.log(results);
        updateChartValues(barCountChart, results.map(x => x.count));
        updateChartValues(barPopChart, results.map(x => x.pop));
        updateChartValues(donutPopChart, results.map(x => x.pop));
      });
    });

  // Raleigh Parks Layer
  let ralParksLayer = new FeatureLayer({
    url: layerUrls.ralParks,
    outFields: ["PARKID", "NAME", "LEVEL_OF_SERVICE", "LAND_ACQUISITION"],
    definitionExpression: "LEVEL_OF_SERVICE=1",
    popupTemplate: {
      title: "{NAME}"
    },
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: "black",
        style: "diagonal-cross",
        outline: {
          width: 0
        }
      }
    }
  });
  map.add(ralParksLayer);

  // County/State Parks Layer
  let otherParksLayer = new FeatureLayer({
    url: layerUrls.otherParks,
    outFields: ["PARKID", "NAME"],
    popupTemplate: {
      title: "{NAME}"
    },
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: "black",
        style: "diagonal-cross",
        outline: {
          width: 0
        }
      }
    }
  });
  map.add(otherParksLayer);

  // Labels layer
  let labelsLayer = new VectorTileLayer({
    url: layerUrls.labels
  });
  map.add(labelsLayer);

  //------------------------------
  // ADD LEGEND
  //------------------------------
  const legend = new Legend({
    view: view,
    layerInfos: [
      {
        layer: blockLayer
      }
    ],
    container: document.createElement("div")
  });

  // Remove field name from legend
  // See: https://community.esri.com/thread/210905-changingremoving-legend-headings-in-javascript-api-4x
  watchUtils.when(legend, "container", () => {
    aspect.after(legend, "scheduleRender", response => {
      if (query(".esri-legend__layer-caption")[0]) {
        query(".esri-legend__layer-caption")[0].style.display = "none";
      }
    });
  });

  let legendExpand = new Expand({
    view: view,
    content: legend,
    expanded: true
  });
  view.ui.add(legendExpand, "bottom-left");

  //------------------------------
  // UPDATE MAP
  //--------------------------------

  // Form Elements
  const analysisTypeOptions = document.getElementsByName("analysis-type");
  const binningOptions = document.getElementsByName("binning-method");

  //------------------------------
  // CHANGE ANALYSIS TYPE
  //------------------------------
  for (let i = 0; i < analysisTypeOptions.length; i++) {
    analysisTypeOptions[i].onchange = function() {
      ralParksLayer.definitionExpression = `${this.value}=1`;
      if (this.value == "LEVEL_OF_SERVICE") {
        blockRenderer.field = "los_closest_park_dist";
      } else if ((this.value = "LAND_ACQUISTION")) {
        blockRenderer.field = "la_closest_park_dist";
      }
      blockLayer.renderer = blockRenderer;

      let queryParameterObject = generateSummaryStatQueryParameters(
        classBreakInfos,
        "analysis-type",
        "binning-method"
      );
      let queryUrls = [];
      queryParameterObject.bins.forEach((bin, index) => {
        queryUrls.push(
          `${layerUrls.blocks}/query?f=json&where=${
            blockRenderer.field
          }+between+${bin.min}+and+${
            bin.max
          }&returnGeometry=false&outStatistics=[{"statisticType":"count","onStatisticField":"OBJECTID","outStatisticFieldName":"count"},{"statisticType":"sum","onStatisticField":"pop_2018","outStatisticFieldName":"pop"}]`
        );
      });
      queryBlockStatistics(queryUrls).then(results => {
        console.log(results);
        updateChartValues(barCountChart, results.map(x => x.count));
        updateChartValues(barPopChart, results.map(x => x.pop));
        updateChartValues(donutPopChart, results.map(x => x.pop));
      });
    };
  }

  //-----------------------------
  // CHANGE BINNGING METHOD
  //-----------------------------
  for (let i = 0; i < binningOptions.length; i++) {
    binningOptions[i].onchange = function() {
      let selectedClassBreakInfos = classBreakInfos[this.value];
      blockRenderer.classBreakInfos = selectedClassBreakInfos;
      blockLayer.renderer = blockRenderer;

      let queryParameterObject = generateSummaryStatQueryParameters(
        classBreakInfos,
        "analysis-type",
        "binning-method"
      );
      let queryUrls = [];
      queryParameterObject.bins.forEach((bin, index) => {
        queryUrls.push(
          `${layerUrls.blocks}/query?f=json&where=${
            blockRenderer.field
          }+between+${bin.min}+and+${
            bin.max
          }&returnGeometry=false&outStatistics=[{"statisticType":"count","onStatisticField":"OBJECTID","outStatisticFieldName":"count"},{"statisticType":"sum","onStatisticField":"pop_2018","outStatisticFieldName":"pop"}]`
        );
      });
      queryBlockStatistics(queryUrls).then(results => {
        updateChartValues(barCountChart, results.map(x => x.count));
        updateChartValues(barPopChart, results.map(x => x.pop));
        updateChartValues(donutPopChart, results.map(x => x.pop));
      });
    };
  }

  function generateSummaryStatQueryParameters(
    classBreakInfos,
    analysisElName,
    binningElName
  ) {
    let analysisInfos, binningInfos;
    let queryObject = {};

    // Get analysis infos
    let analysisOptions = document.getElementsByName(analysisElName);
    for (let i = 0; i < analysisOptions.length; i++) {
      if (analysisOptions[i].checked) {
        analysisInfos = analysisOptions[i].value;
        break;
      }
    }
    if (analysisInfos == "LEVEL_OF_SERVICE") {
      queryObject.analysis = "los_closest_park_dist";
    } else if (analysisInfos == "LAND_ACQUISITION") {
      queryObject.analysis = "la_closest_park_dist";
    }
    console.log(analysisInfos);

    // Get binning infos
    let binningOptions = document.getElementsByName(binningElName);
    for (let i = 0; i < binningOptions.length; i++) {
      if (binningOptions[i].checked) {
        binningInfos = classBreakInfos[binningOptions[i].value];
        break;
      }
    }

    queryObject.bins = binningInfos.map(bin => {
      return {
        min: bin.minValue,
        max: bin.maxValue
      };
    });

    return queryObject;
  }

  // FUNCTIONS

  async function queryBlockStatistics(array) {
    let results = [];
    for (const item of array) {
      await $.getJSON(item, data => {
        results.push(data.features[0].attributes);
      });
    }
    return results;
  }

  function updateChartValues(chart, valsArray) {
    chart.data.datasets[0].data = valsArray;
    chart.update();
  }
});