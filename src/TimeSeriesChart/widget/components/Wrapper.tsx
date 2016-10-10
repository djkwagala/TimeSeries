
import * as React from "TimeSeriesChart/lib/react";
import ReactDOM = require("TimeSeriesChart/lib/react-dom");
import * as d3 from "TimeSeriesChart/lib/d3";
import * as NVD3Chart from "TimeSeriesChart/lib/react-nvd3";
import ModelProps from "../../TimeSeriesChart.d";

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
        // if (this.props.imageSource === "microflow" && !this.props.dataSourceMicroflow) {
        //     mx.ui.error("Error in Configuration of Widget " + this.props.widgetId +
        //                 " Image Source is set to MicroFlow and No Microflow specified in Tab 'Source - Microflow' ");
        // }
    }
    public render() {
        logger.debug(this.props.widgetId + ".render");
        let chart = <div>Loading ...</div>;
        const props = this.props;
        const datum = this.getDatum();
        const xFormat = props.xAxisFormat ? props.xAxisFormat : "%d-%b-%y";
        const yFormat = props.yAxisFormat ? props.yAxisFormat : "";

        if (this.props.dataLoaded) {
            logger.debug(this.props.widgetId + ".render dataLoaded");
            chart = React.createElement(NVD3Chart, {
                type: "lineChart",
                datum: datum,
                x: "xPoint",
                y: "yPoint",
                xAxis: {
                    axisLabel: this.props.xAxisLabel,
                    tickFormat: function(dataPoint: any) {
                        return d3.time.format(xFormat)(new Date(dataPoint)); },
                },
                yAxis: {
                    axisLabel: this.props.yAxisLabel,
                    tickFormat: function(dataPoint: any) {
                        if (yFormat) {
                            return d3.format(yFormat)(dataPoint);
                        } else {
                            return dataPoint;
                        }},
                },
                 duration: 300,
                useInteractiveGuideline: props.useInteractiveGuidelines
            });
        }
        return (
            <div>
                {chart}
            </div>
        );
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
        logger.debug(returnDatum);
        return returnDatum;
    }
}
