

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
// import * as d3 from "TimeSeriesChart/lib/d3";
// import * as NVD3Chart from  "TimeSeriesChart/lib/react-nvd3";
// import * as nv from "TimeSeriesChart/lib/nv.d3";
import { Series, Wrapper } from "./components/Wrapper";
interface SerieData {

}
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
    private seriesConfig: Serie[];
    // Internal variables. Non-primitives created in the prototype are shared between all widget instances.

    private handles: number[];
    private testData: Object[];
    private contextObject: mendix.lib.MxObject;


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
            datum: this.series.data || this.testData ,
            widgetId: this.id + "_Wrapper",
        };
    }

    // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
    public postCreate() {
        logger.debug(this.id + ".postCreate !");
        this.loadData = this.loadData.bind(this);
    }
    public loadData() {
        logger.debug(this.id + ".loadData");
        this.testData = [
            {
        "key" : "Quantity" ,
        "bar": true,
        "color": "#ccf",
        "values" : [ [ 1136005200000 , 1271000.0] , [ 1138683600000 , 1271000.0] , [ 1141102800000 , 1271000.0] , [ 1143781200000 , 0] , [ 1146369600000 , 0] , [ 1149048000000 , 0] , [ 1151640000000 , 0] , [ 1154318400000 , 0] , [ 1156996800000 , 0] , [ 1159588800000 , 3899486.0] , [ 1162270800000 , 3899486.0] , [ 1164862800000 , 3899486.0] , [ 1167541200000 , 3564700.0] , [ 1170219600000 , 3564700.0] , [ 1172638800000 , 3564700.0] , [ 1175313600000 , 2648493.0] , [ 1177905600000 , 2648493.0] , [ 1180584000000 , 2648493.0] , [ 1183176000000 , 2522993.0] , [ 1185854400000 , 2522993.0] , [ 1188532800000 , 2522993.0] , [ 1191124800000 , 2906501.0] , [ 1193803200000 , 2906501.0] , [ 1196398800000 , 2906501.0] , [ 1199077200000 , 2206761.0] , [ 1201755600000 , 2206761.0] , [ 1204261200000 , 2206761.0] , [ 1206936000000 , 2287726.0] , [ 1209528000000 , 2287726.0] , [ 1212206400000 , 2287726.0] , [ 1214798400000 , 2732646.0] , [ 1217476800000 , 2732646.0] , [ 1220155200000 , 2732646.0] , [ 1222747200000 , 2599196.0] , [ 1225425600000 , 2599196.0] , [ 1228021200000 , 2599196.0] , [ 1230699600000 , 1924387.0] , [ 1233378000000 , 1924387.0] , [ 1235797200000 , 1924387.0] , [ 1238472000000 , 1756311.0] , [ 1241064000000 , 1756311.0] , [ 1243742400000 , 1756311.0] , [ 1246334400000 , 1743470.0] , [ 1249012800000 , 1743470.0] , [ 1251691200000 , 1743470.0] , [ 1254283200000 , 1519010.0] , [ 1256961600000 , 1519010.0] , [ 1259557200000 , 1519010.0] , [ 1262235600000 , 1591444.0] , [ 1264914000000 , 1591444.0] , [ 1267333200000 , 1591444.0] , [ 1270008000000 , 1543784.0] , [ 1272600000000 , 1543784.0] , [ 1275278400000 , 1543784.0] , [ 1277870400000 , 1309915.0] , [ 1280548800000 , 1309915.0] , [ 1283227200000 , 1309915.0] , [ 1285819200000 , 1331875.0] , [ 1288497600000 , 1331875.0] , [ 1291093200000 , 1331875.0] , [ 1293771600000 , 1331875.0] , [ 1296450000000 , 1154695.0] , [ 1298869200000 , 1154695.0] , [ 1301544000000 , 1194025.0] , [ 1304136000000 , 1194025.0] , [ 1306814400000 , 1194025.0] , [ 1309406400000 , 1194025.0] , [ 1312084800000 , 1194025.0] , [ 1314763200000 , 1244525.0] , [ 1317355200000 , 475000.0] , [ 1320033600000 , 475000.0] , [ 1322629200000 , 475000.0] , [ 1325307600000 , 690033.0] , [ 1327986000000 , 690033.0] , [ 1330491600000 , 690033.0] , [ 1333166400000 , 514733.0] , [ 1335758400000 , 514733.0]]
        } ,

        {
        "key" : "Price" ,
        "color" : "#333",
        "values" : [ [ 1136005200000 , 71.89] , [ 1138683600000 , 75.51] , [ 1141102800000 , 68.49] , [ 1143781200000 , 62.72] , [ 1146369600000 , 70.39] , [ 1149048000000 , 59.77] , [ 1151640000000 , 57.27] , [ 1154318400000 , 67.96] , [ 1156996800000 , 67.85] , [ 1159588800000 , 76.98] , [ 1162270800000 , 81.08] , [ 1164862800000 , 91.66] , [ 1167541200000 , 84.84] , [ 1170219600000 , 85.73] , [ 1172638800000 , 84.61] , [ 1175313600000 , 92.91] , [ 1177905600000 , 99.8] , [ 1180584000000 , 121.191] , [ 1183176000000 , 122.04] , [ 1185854400000 , 131.76] , [ 1188532800000 , 138.48] , [ 1191124800000 , 153.47] , [ 1193803200000 , 189.95] , [ 1196398800000 , 182.22] , [ 1199077200000 , 198.08] , [ 1201755600000 , 135.36] , [ 1204261200000 , 125.02] , [ 1206936000000 , 143.5] , [ 1209528000000 , 173.95] , [ 1212206400000 , 188.75] , [ 1214798400000 , 167.44] , [ 1217476800000 , 158.95] , [ 1220155200000 , 169.53] , [ 1222747200000 , 113.66] , [ 1225425600000 , 107.59] , [ 1228021200000 , 92.67] , [ 1230699600000 , 85.35] , [ 1233378000000 , 90.13] , [ 1235797200000 , 89.31] , [ 1238472000000 , 105.12] , [ 1241064000000 , 125.83] , [ 1243742400000 , 135.81] , [ 1246334400000 , 142.43] , [ 1249012800000 , 163.39] , [ 1251691200000 , 168.21] , [ 1254283200000 , 185.35] , [ 1256961600000 , 188.5] , [ 1259557200000 , 199.91] , [ 1262235600000 , 210.732] , [ 1264914000000 , 192.063] , [ 1267333200000 , 204.62] , [ 1270008000000 , 235.0] , [ 1272600000000 , 261.09] , [ 1275278400000 , 256.88] , [ 1277870400000 , 251.53] , [ 1280548800000 , 257.25] , [ 1283227200000 , 243.1] , [ 1285819200000 , 283.75] , [ 1288497600000 , 300.98] , [ 1291093200000 , 311.15] , [ 1293771600000 , 322.56] , [ 1296450000000 , 339.32] , [ 1298869200000 , 353.21] , [ 1301544000000 , 348.5075] , [ 1304136000000 , 350.13] , [ 1306814400000 , 347.83] , [ 1309406400000 , 335.67] , [ 1312084800000 , 390.48] , [ 1314763200000 , 384.83] , [ 1317355200000 , 381.32] , [ 1320033600000 , 404.78] , [ 1322629200000 , 382.2] , [ 1325307600000 , 405.0] , [ 1327986000000 , 456.48] , [ 1330491600000 , 542.44] , [ 1333166400000 , 599.55] , [ 1335758400000 , 583.98]]
        }
    ];
    }
    // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
    public update(obj: mendix.lib.MxObject, callback?: Function) {
        logger.debug(this.id + ".update");
        this.contextObject = obj;

        this.updateData(() => {
            this.isLoading = false;
            this.updateRendering(callback);
        });
        this._resetSubscriptions();
    }
    // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
    public uninitialize() {
        logger.debug(this.id + ".uninitialize");
        // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
       // ReactDOM.unmountComponentAtNode(this.domNode);
        this._unsubscribe();
    }
    // Creates a progress object which is used for communication progress betwean server and web UI        
    public mxCreateProgressObject(callback: Function) {
        logger.debug(this.id + ".createProgressObject");
    }

    private updateData(callback: Function) {
        logger.debug(this.id + ".getCarouselData");
        // update data for each serie, retrieving data depending on its datasource.
        const serie = this.seriesConfig[0];
        if (serie.serieSource === "xpath" && serie.serieEntity) {
            this.fetchDataFromXpath(serie.serieEntity, serie.entityConstraint, callback);
        } else if (serie.serieSource === "microflow" && serie.dataSourceMicroflow) {
            this.fetchDataFromMicroflow(callback);
        } else {
            logger.error(this.id + ".getCarouselData unknown image source or error in widget configuration" +
                         this.imageSource);
            callback();
        }
    }

    // Set store value, could trigger a rerender the interface.
    private updateRendering (callback?: Function) {
        logger.debug(this.id + ".updateRendering");
        if (this.contextObject !== null) {
            this.loadData();
            logger.debug(this.id + ".beforeReactDOM");
            ReactDOM.render(<Wrapper {...this.createProps() } />, this.domNode);
        }


        // The callback, coming from update, needs to be executed, to let the page know it finished rendering
        mxLang.nullExec(callback);
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

    // Fetch data
    private fetchDataFromXpath(serieEntity: string, entityConstraint: string, callback: Function) {
        logger.debug(this.id  + ".fetchDataFromXpath");
        if (this.contextObject)  {
            const guid = this.contextObject ? this.contextObject.getGuid() : "";
            const constraint = entityConstraint.replace("[%CurrentObject%]", guid);
            const xpathString = "//" + serieEntity + constraint;
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
    private setDataFromObjects(objects: mendix.lib.MxObject[]): void {
        logger.debug(this.id + ".getCarouselItemsFromObject");
        this.data.push() = objects.map((itemObj) => {
            let data: IData;
            return data = {
                caption: this.captionAttr ? itemObj.get(this.captionAttr) as string : "",
                description: this.descriptionAttr ? itemObj.get(this.descriptionAttr) as string : "",
                onClick: {
                    clickMicroflow: this.imageClickMicroflow,
                    guid: itemObj.getGuid(),
                    onClickEvent: this.onClickEvent,
                    page: this.openPage,
                },
                url: this.getFileUrl(itemObj.getGuid()),
            };
        });

    }


}
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
