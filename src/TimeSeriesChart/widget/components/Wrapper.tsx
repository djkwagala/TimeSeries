
import * as React from "TimeSeriesChart/lib/react";
import * as ReactDOM from "TimeSeriesChart/lib/react-dom";
import * as d3 from "TimeSeriesChart/lib/d3";
import NVD3Chart from "../../lib/react-nvd3";

// import * as NVD3Chart from "TimeSeriesChart/lib/react-nvd3";
import {ModelProps, HeightUnits, WidthUnits} from "../../TimeSeriesChart.d";

export interface Data {
    xPoint: number;
    yPoint: number;
}
export interface Serie {
    data?: Data[];
    key?: any;
}
export interface WidgetProps extends ModelProps {
    widgetId: string;
    seriesData?: Serie[];
    dataLoaded?: boolean;
}
export class Wrapper extends React.Component<WidgetProps, {}> {
    private logMsg: string;
    public static defaultProps: WidgetProps = {
        widgetId: "",
    };

    public constructor(props: WidgetProps) {
        super(props);
        logger.debug(this.props.widgetId + ".constructor");
        this.getDatum = this.getDatum.bind(this);
    }

    public componentWillMount() {
        logger.debug(this.props.widgetId + " .componentWillMount");
        this.checkConfig();
    }
    private checkConfig() {
        // TODO add validation on config if needed.
    }
    public render() {
        logger.debug(this.props.widgetId + ".render");
        let chart = <div>Loading ...</div>;
        const props = this.props;
        const datum = this.getDatum();
        const xFormat = props.xAxisFormat ? props.xAxisFormat : "%d-%b-%y";
        const yFormat = props.yAxisFormat ? props.yAxisFormat : "";
        // TODO: correct return types for values: not currently used
        const height_ = this.getValueFromUnits(props.height, props.heightUnits);
        const width_ = this.getValueFromUnits(props.width, props.widthUnits);

        const xEncoding = d3.time.scale().range([0, this.props.width]);
        const yEncoding = d3.scale.linear().range([this.props.height, 0]);


        if (props.dataLoaded) {
            logger.debug(props.widgetId + ".render dataLoaded");
            chart = React.createElement(NVD3Chart, {
                type: "lineChart",
                datum: datum,
                x: "xPoint",
                y: "yPoint",
                height: this.props.height,
                width: this.props.width,
                xAxis: {
                    axisLabel: this.props.xAxisLabel,
                    tickFormat: function(dataPoint: any) {
                        return d3.time.format(xFormat)(new Date(dataPoint)); },
                    // scale: xEncoding,
                    scale: d3.time.scale(),
                    // showMaxMin: true,
                },
                yAxis: {
                    axisLabel: this.props.yAxisLabel,
                    tickFormat: function(dataPoint: any) {
                        if (yFormat) {
                            return d3.format(yFormat)(dataPoint);
                        } else {
                            return dataPoint;
                        }},
                        scale: yEncoding,
                },
                xDomain: d3.extent(datum[0].values, function(d: any) {
                     return d.xPoint;
                    }),
                yDomain: [0, d3.max(datum[0].values, function(d: any){
                    return d.yPoint;
                })],
                showLegend: props.showLegend,
                showYAxis: props.showYAxis,
                showXAxis: props.showXAxis,
                xScale: d3.time.scale(),
                duration: 300,
                useInteractiveGuideline: props.useInteractiveGuidelines,
            });
        }
        return (<div>{chart}</div>) ;
    }
    // TODO get your data from seriesConfig, seriesData, model configuration (Need to be combined)
    private getDatum() {
        logger.debug(this.props.widgetId + ".getDatum");
        const seriesConfig = this.props.seriesConfig;
        let returnDatum: any[] = [];
        for (let count = 0; count < seriesConfig.length; count++) { // replace with seriesConfig.map((serieConfig)=>{})
            let serieConfig = seriesConfig[count];
            let serie = {
                key: serieConfig.serieKey,
                values: serieConfig.serieData
            };
           returnDatum.push(serie);
        }
        logger.debug(this.props.widgetId + ".getDatum Data: ");
        logger.debug(returnDatum );
        return returnDatum;
    }
     /**
     * Processes the heights and width values depending on type of units
     */
    private getValueFromUnits(value: number, type: WidthUnits | HeightUnits): number|string {
        if (type === "auto" ) {
            return "";
        }
        if (type === "percent") {
            return value + "%";
        }
        return value;
    }
}
