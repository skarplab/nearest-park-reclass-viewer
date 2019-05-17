let arcadeExpressionInfos = [{
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