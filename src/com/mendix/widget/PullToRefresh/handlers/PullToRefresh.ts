import * as domClass from "dojo/dom-class";
import * as domStyle from "dojo/dom-style";

interface Settings {
    thresholdDistance: number;
    maximumDistance: number;
    reloadDistance: number;
    mainElement: HTMLElement;
    triggerElement: HTMLElement;
    pullToRefreshElement: HTMLElement;
    classPrefix: string;
    cssProp: string;
    iconArrow: string;
    iconElement: Element | null;
    iconRefreshing: string;
    pullToRefreshText: string;
    releaseToRefreshText: string;
    refreshText: string;
    refreshTimeout: number;
    onRefresh: ((value: Function) => Promise<void>) | ((value: Function) => void);
    resistanceFunction: (value: number) => number;
    textElement: Element | null;
}
type State = "pending" | "pulling" | "release" | "refreshing" | "scrolling";

interface Params {
    onRefresh: () => void;
    mainElement: HTMLElement;
    pullToRefreshElement: HTMLElement;
}

export class PullToRefresh {
    private settings: Settings;
    private pullStart: {
        screenX: number;
        screenY: number;
    };
    private pullMoveY: number;
    private distance = 0;
    private distanceResisted = 0;
    private state: State;
    private enable: boolean;
    private timeout: number;
    private lastDistance = 0;

    constructor(params: Params) {
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.resetDom = this.resetDom.bind(this);
        const classPrefix = "pull-to-refresh-";
        this.settings = {
            classPrefix,
            cssProp: "min-height",
            iconArrow: "&#8675;",
            iconRefreshing: "&hellip;",
            mainElement: params.mainElement,
            maximumDistance: 150,
            onRefresh: params.onRefresh,
            pullToRefreshElement: params.pullToRefreshElement,
            pullToRefreshText: "Pull to refresh",
            refreshText: "Refreshing",
            refreshTimeout: 500,
            releaseToRefreshText: "Release to refresh",
            reloadDistance: 50,
            resistanceFunction: (distance) => Math.min(1, distance / 2.5),
            thresholdDistance: 80,
            triggerElement: params.mainElement,
            iconElement: params.pullToRefreshElement.querySelector(`.${classPrefix}icon`),
            textElement: params.pullToRefreshElement.querySelector(`.${classPrefix}text`)
        };
        this.state = "pending";
        this.pullStart = { screenX: 0, screenY: 0 };
    }

    setupEvents() {
        window.addEventListener("touchstart", this.onTouchStart);
        window.addEventListener("touchend", this.onTouchEnd);
        (window.addEventListener as WhatWGAddEventListener)("touchmove", this.onTouchMove, { passive: false });
    }

    removeEvents() {
        window.removeEventListener("touchstart", this.onTouchStart);
        window.removeEventListener("touchend", this.onTouchEnd);
        (window.removeEventListener as WhatWGAddEventListener)("touchmove", this.onTouchMove, { passive: false });
    }

    private update(nextState: State) {
        const { iconElement, textElement, pullToRefreshElement, cssProp, classPrefix, iconRefreshing, iconArrow,
            refreshText, pullToRefreshText, releaseToRefreshText, reloadDistance } = this.settings;

        if (iconElement && textElement && nextState !== this.state ) {
            if (nextState === "refreshing") {
                domStyle.set(pullToRefreshElement, cssProp, `${reloadDistance}px`);
                domClass.replace(pullToRefreshElement.id, `${classPrefix}refresh`, `${classPrefix}release`);
                iconElement.innerHTML = iconRefreshing;
                textElement.innerHTML = refreshText;
            } else {
                iconElement.innerHTML = iconArrow;
            }

            if (nextState === "release") {
                domClass.add(pullToRefreshElement.id, `${classPrefix}release`);
                textElement.innerHTML = releaseToRefreshText;
            } else if (nextState === "pulling" || nextState === "pending") {
                textElement.innerHTML = pullToRefreshText;
            }
            if (nextState === "pulling") {
                domClass.add(pullToRefreshElement.id, `${classPrefix}pull`);
            }
        }
        this.state = nextState;
    }

    private resetDom() {
        const { cssProp, pullToRefreshElement, classPrefix } = this.settings;
        domClass.remove(pullToRefreshElement.id, `${classPrefix}release ${classPrefix}pull ${classPrefix}refresh`);
        domStyle.set(pullToRefreshElement, cssProp, "0px");
        this.pullStart = { screenY: 0, screenX: 0 };
        this.lastDistance = this.distance = this.distanceResisted = this.pullMoveY = 0;
        this.state = "pending";
    }

    private reload(refresh: Function) {
        return Promise.resolve(refresh() || "success");
    }

    private onTouchStart(event: TouchEvent) {
        if (this.state !== "pending") return;
        if (this.isScrollActive(event.target as HTMLElement)) {
            this.state = "scrolling";
            return;
        }

        clearTimeout(this.timeout);

        this.pullStart.screenX = event.touches[0].screenX;
        this.pullStart.screenY = event.touches[0].screenY;
        this.enable = this.settings.triggerElement.contains(event.target as Node);
        this.lastDistance = this.distanceResisted = 0;
        this.update("pending");
    }

    private onTouchMove(event: TouchEvent) {
        const { pullToRefreshElement, maximumDistance, thresholdDistance, cssProp } = this.settings;
        const touch = event.touches[0];
        const touchElement = document.elementFromPoint(touch.clientX, touch.clientY);
        this.pullMoveY = event.touches[0].screenY;

        if (!this.enable || this.state === "refreshing" || this.state === "scrolling"
            || this.isScrollActive(touchElement as HTMLElement)) return;

        if (this.state === "pending") {
            this.update("pulling");
        }
        if (this.pullStart.screenY && this.pullMoveY) {
            this.distance = this.pullMoveY - this.pullStart.screenY;
        }
        if (this.distance > 0 && Math.abs(this.lastDistance - this.distance) > 1) {
            this.lastDistance = this.distance;
            event.preventDefault();
            domStyle.set(pullToRefreshElement, cssProp, `${this.distanceResisted}px`);
            this.distanceResisted = this.settings.resistanceFunction(this.distance / thresholdDistance)
                * Math.min(maximumDistance, this.distance);

            if (this.state === "pulling" && this.distanceResisted > thresholdDistance) {
                this.update( "release");
            }

            if (this.state === "release" && this.distanceResisted < thresholdDistance) {
                this.update("pulling");
            }
        }
    }

    private onTouchEnd() {
        const { pullToRefreshElement, onRefresh, cssProp, classPrefix } = this.settings;
        if (this.state === "release") {

            domStyle.set(pullToRefreshElement, cssProp, `${this.settings.reloadDistance}px`);
            domClass.add(pullToRefreshElement.id, `${classPrefix}refresh`);

            this.timeout = setTimeout(() => {
                this.reload(onRefresh).then(() => this.resetDom());
            }, this.settings.refreshTimeout);
            this.update("refreshing");
        } else if (this.state === "refreshing") {
            return;
        } else {
            this.resetDom();
        }
    }

    private isScrollActive(element: HTMLElement | null): boolean {
        if (element === null) {
            return false;
        }
        if (element.scrollTop > 5 ) {
            return true;
        } else {
            return this.isScrollActive(element.parentNode as HTMLElement);
        }
    }
}
