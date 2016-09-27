/// <reference path="dojo/dojo.d.ts" />
/// <reference path="dojo/dijit.d.ts" />

/// <reference path="react/react.d.ts" />
/// <reference path="react/react-dom.d.ts" />
/* /// <reference path="index.d.ts" /> */
/// <reference path="modules/d3/index.d.ts" />
/// <reference path="modules/nvd3/index.d.ts" />


declare module "TimeSeriesChart/lib/react-dom"
{
	export =  __React.__DOM;
}

declare module "TimeSeriesChart/lib/react"
{
	export = __React;
}
 declare module "TimeSeriesChart/lib/react-nvd3" {
	
}
declare module "TimeSeriesChart/lib/d3" {
	
}

declare module "TimeSeriesChart/lib/nv.d3" {

}

