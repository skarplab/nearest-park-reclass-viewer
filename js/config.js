//-------------------------
// INITIAL MAP CONFIG
//-------------------------
const mapConfig = {
    center: [-78.642688, 35.777734],
    zoom: 12
};

//-------------------------
// BINNING PALETTE
//-------------------------
const colorPalette = ["#eff3ff", "#bdd7e7", "#6baed6", "#3182bd", "#08519c"];

//------------------------
// CLASS BREAK SYMBOLS
//------------------------
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

//-----------------------------
// CLASS BREAK INFOS
//-----------------------------
const classBreakInfos = {
    quantile: [{
            minValue: 0,
            maxValue: 0.34808452120741512,
            label: "< 0.35 mi",
            symbol: classBreakSymbols.a
        },
        {
            minValue: 0.34808452120741513,
            maxValue: 0.69358269292405539,
            label: "0.35 mi - 0.69 mi",
            symbol: classBreakSymbols.b
        },
        {
            minValue: 0.6935826929240554,
            maxValue: 1.073097773703062,
            label: "0.70 mi - 1.07 mi",
            symbol: classBreakSymbols.c
        },
        {
            minValue: 1.073097773703063,
            maxValue: 1.5664402798982171,
            label: "1.07 mi - 1.56 mi",
            symbol: classBreakSymbols.d
        },
        {
            minValue: 1.5664402798982172,
            maxValue: 1000,
            label: "1.56+ mi",
            symbol: classBreakSymbols.f
        }
    ],
    halfStep: [{
            minValue: 0,
            maxValue: 0.4999,
            label: "< 0.5 mi",
            symbol: classBreakSymbols.a
        },
        {
            minValue: 0.5,
            maxValue: 0.9999,
            label: "0.5 mi - 1.0 mi",
            symbol: classBreakSymbols.b
        },
        {
            minValue: 1.0,
            maxValue: 1.4999,
            label: "1.0 mi - 1.5 mi",
            symbol: classBreakSymbols.c
        },
        {
            minValue: 1.5,
            maxValue: 1.9999,
            label: "1.5 mi - 2.0 mi",
            symbol: classBreakSymbols.d
        },
        {
            minValue: 2.0,
            maxValue: 1000,
            label: "2.0+ mi",
            symbol: classBreakSymbols.f
        }
    ],
    doubleStep: [{
            minValue: 0,
            maxValue: 0.4999,
            label: "< 0.5 mi",
            symbol: classBreakSymbols.a
        },
        {
            minValue: 0.5,
            maxValue: 0.9999,
            label: "0.5 mi - 1.0 mi",
            symbol: classBreakSymbols.b
        },
        {
            minValue: 1.0,
            maxValue: 1.9999,
            label: "1.0 mi - 2.0 mi",
            symbol: classBreakSymbols.c
        },
        {
            minValue: 2.0,
            maxValue: 3.9999,
            label: "2.0 mi - 4.0 mi",
            symbol: classBreakSymbols.d
        },
        {
            minValue: 4.0,
            maxValue: 1000,
            label: "4.0+ mi",
            symbol: classBreakSymbols.f
        }
    ]
};

const layerUrls = {
    base: "https://jsapi.maps.arcgis.com/sharing/rest/content/items/5e9b3685f4c24d8781073dd928ebda50/resources/styles/root.json",
    blocks: "https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/EBPA_Demographic_and_Community_Analysis_by_Census_Block/FeatureServer/0",
    ralParks: "https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/Parks_with_Analysis_Tiers/FeatureServer/0",
    otherParks: "https://services.arcgis.com/v400IkDOw1ad7Yad/arcgis/rest/services/raleigh_county_state_parks/FeatureServer/1",
    labels: "https://jsapi.maps.arcgis.com/sharing/rest/content/items/747cb7a5329c478cbe6981076cc879c5/resources/styles/root.json"
};