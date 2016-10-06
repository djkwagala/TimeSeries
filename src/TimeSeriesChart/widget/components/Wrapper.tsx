
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
        const datum = this.getDatum();
        if (!this.props.dataLoaded) {
            logger.debug(this.props.widgetId + ".render dataLoaded");
            chart = React.createElement(NVD3Chart, {
                type: "lineChart",
                datum: datum,
                // TODO check what it is doing!
                x: function (data_: any, iterator: any) { return iterator; },
                y: function (data_: any, iterator: any) { return data_[1]; }
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
        logger.debug(this.props.seriesData);
        const seriesConfig = this.props.seriesData;
        let returnDatum: any[] = [];
        for (let count = 0; count < seriesConfig.length; count++) { // replace with seriesConfig.map((serieConfig)=>{})
            let serieConfig = seriesConfig[count];
            let serieData = serieConfig.data.map( (seriePoint) => {
                return [seriePoint.xPoint, seriePoint.yPoint];
            }
            );
            let serie = {
                key: serieConfig.key,
                values: serieData
            };
           returnDatum.push(serie);
        }
        return returnDatum;
    }
}
