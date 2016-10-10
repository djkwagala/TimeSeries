
// WARNING do not make manual Changes to this file..
// widget.d.ts files is auto generated from the params in the widget.xml
// use > 'grunt xsltproc' or > 'grunt watch' to generate a new file

interface Data {
    xPoint: number;
    yPoint: number;
}

export interface SerieConfig {    
    serieEntity?: string;
    serieSource?: "xpath" | "microflow";
    entityConstraint?: string;
    dataSourceMicroflow?: string;
    serieXAttribute?: string;
    serieYAttribute?: string;
    serieKey?: string;
    serieData?: Data[];
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
} 

export default ModelProps;
