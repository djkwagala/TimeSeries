
// WARNING do not make manual Changes to this file..
// widget.d.ts files is auto generated from the params in the widget.xml
// use > 'grunt xsltproc' or > 'grunt watch' to generate a new file
export default ModelProps;

interface Data {
    xPoint: number;
    yPoint: number;
}

export interface SerieConfig {    
    serieEntity?: string;
    serieSource?: SerieSource;
    entityConstraint?: string;
    dataSourceMicroflow?: string;
    serieXAttribute?: string;
    serieYAttribute?: string;
    serieKey?: string;
    serieData?: Data[];
    serieColor?: string;
    area?: boolean;
}

export interface ModelProps {
    showXAxis?: boolean;
    showYAxis?: boolean;
    useInteractiveGuidelines?: boolean;
    showLegend?: boolean;
    xAxisLabel?: string;
    xAxisFormat?: string;
    staggerLabels?: boolean;
    yAxisLabel?: string;
    yAxisFormat?: string;
    seriesConfig?: SerieConfig[];
    width?: number;
    widthUnits?:WidthUnits;
    height?: number;
    heightUnits?: HeightUnits;
} 

declare let NVD3Chart: React.ComponentClass<any>;
declare module "TimeSeriesChart/lib/react-nvd3" {
    export = NVD3Chart;
}


export type WidthUnits = "auto" | "pixels" | "percent";
export type HeightUnits = "auto" | "pixels" | "percent";
export type SerieSource = "xpath" | "microflow";
