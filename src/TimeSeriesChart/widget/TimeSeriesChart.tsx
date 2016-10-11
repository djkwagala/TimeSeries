

/*
 ProgressBarButton
 ========================
 
 @file      : TimeSeriesChart.js
 @version   : 1.0.0
 @author    : Derrick Kwagala
 @date      : Fri, 23 Sept 2016
 @copyright : Flock of Birds
 @license   : Apache License V2.0
 
 Documentation
 ========================
 TimeSeriesChart LineBar. 
 */

import * as dojoDeclare from "dojo/_base/declare";
import * as _WidgetBase from  "mxui/widget/_WidgetBase";
import * as mxLang from "mendix/lang";

import * as React from "TimeSeriesChart/lib/react";
import ReactDOM  = require ("TimeSeriesChart/lib/react-dom");

import { WidgetProps, Serie, Data, Wrapper } from "./components/Wrapper";
import { SerieConfig, WidthUnits, HeightUnits } from "../TimeSeriesChart.d";

// TODO rename class
export class TimeSeriesWrapper extends _WidgetBase {
    // Parameters configured in the Modeler 
    private svgNode: string;
    private showXAxis: boolean;
    private showYAxis: boolean;
    private useInteractiveGuidelines: boolean;
    private showLegend: boolean;
    private xAxisLabel: string;
    private xAxisFormat: string;
    private staggerLabels: boolean;
    private yAxisLabel: string;
    private yAxisFormat: string;
    private seriesConfig: SerieConfig[];
    private width: number;
    private height: number;
    private widthUnits: WidthUnits;
    private heightUnits: HeightUnits;
    // Internal variables. Non-primitives created in the prototype are shared between all widget instances.

    private handles: number;
    private testData: Object[];
    private contextObject: mendix.lib.MxObject;
    private serieData: Data[];
    private dataLoaded: boolean;


    // The TypeScript Construct, not the dojo constructor, move constructor work into widget prototype at bottom of the page. 
    constructor(args?: Object, elem?: HTMLElement) {
        // Do not add any default value here... it wil not run in dojo!     
        super() ;
        return new dojoTimeSeries(args, elem);
    }
    public createProps(): WidgetProps {
        return {
            widgetId: this.id + "_Wrapper",
            seriesData: this.serieData,
            dataLoaded: this.dataLoaded,
            showXAxis: this.showXAxis,
            showYAxis: this.showYAxis,
            useInteractiveGuidelines: this.useInteractiveGuidelines,
            showLegend: this.showLegend,
            xAxisLabel: this.xAxisLabel,
            xAxisFormat: this.xAxisFormat,
            staggerLabels: this.staggerLabels,
            yAxisLabel: this.yAxisLabel,
            yAxisFormat: this.yAxisFormat,
            seriesConfig: this.seriesConfig,
            width: this.width,
            widthUnits: this.widthUnits,
            height: this.height,
            heightUnits: this.heightUnits
        };
    }

    // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
    public postCreate() {
        logger.debug(this.id + ".postCreate");
        this.updateRendering();
    }

    // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
    // TODO Check with Mendix dev, if update callback should wait for data to be retrieved or not.
    public update(object: mendix.lib.MxObject, callback?: Function) {
        logger.debug(this.id + ".update");
        this.contextObject = object;
        this.updateData(() => {
            this.dataLoaded = true;
            this.updateRendering(callback);
        });
        this.resetSubscriptions();
    }
    // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
    public uninitialize() {
        logger.debug(this.id + ".uninitialize");
        // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        ReactDOM.unmountComponentAtNode(this.domNode);
        this.unsubscribeHandles();
    }
    // Creates a progress object which is used for communication progress between server and web UI        
    public mxCreateProgressObject(callback: Function) {
        logger.debug(this.id + ".createProgressObject");
    }

    private updateData(callback: Function) {
        logger.debug(this.id + ".getCarouselData");
        // update data for each serie, retrieving data depending on its data source.
        const serie = this.seriesConfig[0];
        // TODO do this in a async parallel way for all series, in the future.
        if (serie.serieSource === "xpath" && serie.serieEntity) {
            this.fetchDataFromXpath(serie, (data: mendix.lib.MxObject[]) => {
                this.setDataFromObjects(data, serie);
                callback();
            });
        } else if (serie.serieSource === "microflow" && serie.dataSourceMicroflow) {
             this.fetchDataFromMicroflow(serie, (data: mendix.lib.MxObject[]) => {
                 this.setDataFromObjects(data, serie);
                 callback();
             });
        } else {
            // TODO improve error message, add config check in widget component.
            logger.error(this.id + ".updateData unknown source or error in widget configuration");
            callback();
        }
    }


    // Set store value, could trigger a re-render the interface.
    private updateRendering (callback?: Function) {
        logger.debug(this.id + ".updateRendering");
            logger.debug(this.id + ".beforeReactDOM");
            ReactDOM.render(<Wrapper {...this.createProps() } />, this.domNode);
        // The callback, coming from update, needs to be executed, to let the page know it finished rendering
        mxLang.nullExec(callback);
    }
    // Remove subscriptions
    private unsubscribeHandles () {
        if (this.handles) {
            mx.data.unsubscribe(this.handles);
            this.handles = 0;
        }
    }
    // Reset subscriptions.
    private resetSubscriptions () {
        logger.debug(this.id + "._resetSubscriptions");
        // Release handles on previous object, if any.
        this.unsubscribeHandles();
        // When a mendix object exists create subscriptions.
        if (this.contextObject) {
            let objectHandle = mx.data.subscribe({
                callback: (guid) => {
                    logger.debug(this.id + "._resetSubscriptions object subscription update MxId " + guid);
                    this.updateRendering();
                },
                guid: this.contextObject.getGuid(),
            });
            this.handles = objectHandle; // TODO Change to no array.
        }
    }

    // Fetch data
    private fetchDataFromXpath(serieConfig: SerieConfig, callback: Function) {
        logger.debug(this.id  + ".fetchDataFromXpath ");
        if (this.contextObject)  {
            const guid = this.contextObject ? this.contextObject.getGuid() : "";
            const constraint = serieConfig.entityConstraint.replace("[%CurrentObject%]", guid);
            const xpathString = "//" + serieConfig.serieEntity + constraint;
            mx.data.get({
                callback: callback.bind(this),
                error: (error) => {
                    logger.error(this.id + ": An error occurred while retrieving items: " + error);
                },
                xpath : xpathString,
            });
        } else {
            logger.debug(this.id  + ".fetchDataFromXpath empty context");
            callback([]);
        }
    }

    /**
     * transforms mendix object into item properties and set new state
     */
    private setDataFromObjects(objects: mendix.lib.MxObject[], serieConfig: SerieConfig): void {
        logger.debug(this.id + ".getCarouselItemsFromObject");
        logger.debug(objects);
        serieConfig.serieData = objects.map((itemObject): Data => {
            logger.debug(itemObject);
            return {
                xPoint: itemObject.get(serieConfig.serieXAttribute) as number,
                yPoint: parseFloat(itemObject.get (serieConfig.serieYAttribute)) // convert Big to float or number
                };

        });
    }

    private fetchDataFromMicroflow(serieConfig: SerieConfig, callback: Function) {
        logger.debug(this.id  + ".fetchDataFromMicroflow");
        if (serieConfig.dataSourceMicroflow) {
            const params: {
                    actionname: string,
                    applyto?: string,
                    guids?: string[],
                } = {
                    actionname: serieConfig.dataSourceMicroflow,
                    applyto: "selection",
                    guids: [this.contextObject.getGuid()],
                };

            mx.data.action({
                params,
                callback: callback.bind(this),
                error: (error) => {
                    logger.error(this.id  + ": An error occurred while executing microflow: " + error);
                },
            });
        } else {
            // case there is not context ID the xpath will fail, so it should always show no images.
            logger.debug(this.id  + ".getDataFromMicroflow, empty context");
            callback([]);
        }
    }


}
// Declare widget's prototype the Dojo way
// Thanks to https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/dojo/README.md
let dojoTimeSeries = dojoDeclare("TimeSeriesChart.widget.TimeSeriesChart", [_WidgetBase], (function(Source: any) {
    let result: any = {};
    // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
    result.constructor = function() {
        logger.debug( this.id + ".constructor dojo");
        this.dataLoaded = false;
    };
    for (let i in Source.prototype) {
        if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
            result[i] = Source.prototype[i];
        }
    }
    return result;
} (TimeSeriesWrapper)));

export default TimeSeriesWrapper;
