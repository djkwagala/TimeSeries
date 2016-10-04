declare var mx: mx.mx;
declare var logger: mendix.logger;

import * as React from "TimeSeriesChart/lib/react";
import ReactDOM  = require ("TimeSeriesChart/lib/react-dom");
import * as d3 from "TimeSeriesChart/lib/d3";
import * as NVD3Chart from "TimeSeriesChart/lib/react-nvd3";
import * as nv2 from "TimeSeriesChart/lib/nv.d3";
// import nv2 = require("TimeSeriesChart/lib/nv.d3");


interface IWrapperProps{
    datum?:Array<{}>;
    visible?:boolean;
    widgetId?:string;
}

interface IWrapperState {
    visible?:boolean;
}

export default class Wrapper extends React.Component<IWrapperProps, IWrapperState> {
    private logMsg: string;
    public static defaultProps: IWrapperProps = {
        widgetId: "",
        datum: [],
        visible: true
    }
    private changeVisibility() {
        logger.debug(this.props.widgetId + ".changeVisibility");
        this.setState({visible:!this.state.visible});
    }
    public constructor(props: IWrapperProps) {
        super(props);
        logger.debug(this.props.widgetId + ".constructor");
        //initial state
        this.state = {
            visible: this.props.visible,
        };
        this.changeVisibility = this.changeVisibility.bind(this);
        

    }
    
    public render() {
        logger.debug(this.props.widgetId + ".render");
        let chart;
        const context = {
            getColor: function (iparam) {
                let colors = d3.scale.category20().range().slice(10);
                return colors[ Math.floor(Math.random()* colors.length) ];
            },
        } ;

        // if (this.state.visible) {
        //     logger.debug(this.props.widgetId + ".render.visibleTrue");
        //     chart = <NVD3Chart context={context} color={{name: 'getColor', type: 'function'}} tooltip={{enabled: true}} type="discreteBarChart" datum={this.props.datum} x="label" y="value" />;
        
        // }

        // return (
        //     <div>
        //         <button  onClick={this.changeVisibility}>Click me </button>
        //         {chart}
        //     </div>
        // );

        if(this.state.visible) {
            logger.debug(this.props.widgetId + ".render.visibleTrue");
            logger.debug(nv2);
            return (
                <div>
                    <button onClick={this.changeVisibility}> Click me</button>
                    <NVD3Chart context={context} color={{name: 'getColor', type: 'function'}} tooltip={{enabled: true}} type="discreteBarChart" datum={this.props.datum} x="label" y="value" />              
                </div>
            );
        }

        return (<div><button onClick={this.changeVisibility}> Click me</button></div>);
        
    }
}