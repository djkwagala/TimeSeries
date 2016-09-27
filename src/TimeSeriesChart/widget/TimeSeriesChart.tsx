

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

declare var mx: mx.mx;
declare var logger: mendix.logger;

import * as dojoDeclare from "dojo/_base/declare";
import * as _WidgetBase from  "mxui/widget/_WidgetBase";
import * as mxLang from "mendix/lang";

import * as React from "TimeSeriesChart/lib/react";
import ReactDOM  = require ("TimeSeriesChart/lib/react-dom");
// import * as d3 from "TimeSeriesChart/lib/d3";
// import * as NVD3Chart from  "TimeSeriesChart/lib/react-nvd3";
// import * as nv2 from "TimeSeriesChart/lib/nv.d3";
import Wrapper from "./components/Wrapper";

export class TimeSeriesWrapper extends _WidgetBase {
    // Parameters configured in the Modeler    
    private svgNode: string;
    private graphSourceURL: string ;
    

    // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
    private contextObj: mendix.lib.MxObject;
    private handles: number[];
    private testData: Object[];

    // The TypeScript Contructor, not the dojo consctuctor, move contructor work into widget prototype at bottom of the page. 
    constructor(args?: Object, elem?: HTMLElement) {
        // Do not add any default value here... it wil not run in dojo!     
        super() ;
        return new dojoTimeSeries(args, elem);
    }
    public createProps() {
        return { 
            // svgNode: this.svgNode,
            // graphSourceURL: this.graphSourceURL ,
            datum: this.testData ,
            widgetId:this.id+"_Wrapper"
        };
    }
    
    // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
    public postCreate() {
        logger.debug(this.id + ".postCreate !");      
        this.loadData = this.loadData.bind(this); 
    }
    public loadData() {
        logger.debug(this.id + ".loadData");  
        this.testData = [{
            key: "Cumulative Return",
            values: [
                {
                    "label" : "A" ,
                    "value" : -29.765957771107
                } ,
                {
                    "label" : "B" ,
                    "value" : 0
                } ,
                {
                    "label" : "C" ,
                    "value" : 32.807804682612
                } ,
                {
                    "label" : "D" ,
                    "value" : 196.45946739256
                } ,
                {
                    "label" : "E" ,
                    "value" : 0.19434030906893
                } ,
                {
                    "label" : "F" ,
                    "value" : -98.079782601442
                } ,
                {
                    "label" : "G" ,
                    "value" : -13.925743130903
                } ,
                {
                    "label" : "H" ,
                    "value" : -5.1387322875705
                }
            ]
        }];
    }
    // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
    public update(obj: mendix.lib.MxObject, callback?: Function) {
        logger.debug(this.id + ".update");
        this.contextObj = obj;

        this.updateRendering(callback);
        this._resetSubscriptions();
    }
    // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
    public uninitialize() {
        logger.debug(this.id + ".uninitialize");
        // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
       // ReactDOM.unmountComponentAtNode(this.domNode);
        this._unsubscribe();
    }
    public mxUpdateProgressObject() {
        logger.debug(this.id + ".updateProgress");
    }
    public formSave(callback?: Function) {
        this.mxform.save(callback, (error) => {
            if (!(error instanceof mendix.lib.ValidationError)) {
                mx.onError(error);
            }
        });
    }
    public formValidate(callback?: Function) {
        this.mxform.validate.bind(this.mxform);
        this.mxform.validate(callback);
    }
    // Creates a progress object which is used for communication progress betwean server and web UI        
    public mxCreateProgressObject(callback: Function) {
        logger.debug(this.id + ".createProgressObject");
    }
    // Set store value, could trigger a rerender the interface.
    private updateRendering (callback?: Function) {
        logger.debug(this.id + ".updateRendering");
                
        if (this.contextObj!==null) {
            this.loadData();
            logger.debug(this.id + ".beforeReactDOM");
            // logger.debug("nv2 "+nv2);
            ReactDOM.render(<Wrapper {...this.createProps() } />,this.domNode);
        }

       
        // The callback, coming from update, needs to be executed, to let the page know it finished rendering
        mxLang.nullExec(callback);
    }
    // update the progress messages and bar. 
    private updateProgress() {
        logger.debug(this.id + ".updateProgress");
        
    }
    // Remove subscriptions
    private _unsubscribe () {
        if (this.handles) {
            for (let handle of this.handles) {
                mx.data.unsubscribe(handle);
            }
            this.handles = [];
        }
    }
    // Reset subscriptions.
    private _resetSubscriptions () {
        logger.debug(this.id + "._resetSubscriptions");
        // Release handles on previous object, if any.
        this._unsubscribe();
        // When a mendix object exists create subscribtions.
        if (this.contextObj && this.graphSourceURL) {
            let attrHandle = mx.data.subscribe({
                attr: this.graphSourceURL,
                callback: (guid, attr, attrValue) => {
                    logger.debug(this.id + "._resetSubscriptions attribute '" + attr + "' subscription update MxId " + guid);
                    this.updateRendering();
                },
                guid: this.contextObj.getGuid(),
            });
            let objectHandle = mx.data.subscribe({
                callback: (guid) => {
                    logger.debug(this.id + "._resetSubscriptions object subscription update MxId " + guid);
                    this.updateRendering();
                },
                guid: this.contextObj.getGuid(),
            });
            this.handles = [attrHandle, objectHandle];
        }
    }
}
export 
// Declare widget's prototype the Dojo way
// Thanks to https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/dojo/README.md
let dojoTimeSeries = dojoDeclare("TimeSeriesChart.widget.TimeSeriesChart", [_WidgetBase], (function(Source: any) {
    let result: any = {};
    // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
    result.constructor = function() {
        logger.debug( this.id + ".constructor dojo");
        // this.progressInterval = 100;
    };
    for (let i in Source.prototype) {
        if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
            result[i] = Source.prototype[i];
        }
    }
    return result;
} (TimeSeriesWrapper)));

export default TimeSeriesWrapper;
