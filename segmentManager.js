/**
 * SegmentManager handles one-dimensional segments with associated intensity values.
 * It manages a collection of points where intensity values can change, allowing for
 * adding to or setting intensity values within specified ranges.
 * 
 * Segments are represented as an array of points with their corresponding intensity values:
 * [[point1, intensity1], [point2, intensity2], ...] where the intensity between
 * any two adjacent points remains constant.
 */
class SegmentManager {
    constructor() {
        this.segments = []
    }

    /**
     * Add the specified amount to the intensity specified in the range [from, to)
     * @param {number} from - Start point (inclusive)
     * @param {number} to - End point (exclusive)
     * @param {number} amount - Value to add to the intensity
     * @returns {Array} Current state of the segments after the addition operation
     */
    add(from, to, amount) {
        
        // Edge case: no amount or invalid interval
        if (from >= to || amount === 0) {
            return this.segments;
        }

        return this._updateSegments(from, to, (currentValue) => currentValue + amount);
    }

    /**
     * Set the intensity to the specified amount in the range [from, to)
     * @param {number} from - Start point (inclusive)
     * @param {number} to - End point (exclusive)
     * @param {number} amount - Value to set for the intensity
     * @returns {Array} Current state of the segments after the addition operation
     */
    set(from, to, amount) {
        // Edge case: invalid interval
        if (from >= to) {
            return this.segments;
        }

        return this._updateSegments(from, to, () => amount);
    }
    
    /**
     * Helper method to update segments based on the transformation function (add or set)
     * @param {*} from - Start point (inclusive)
     * @param {*} to - End point (exclusive)
     * @param {*} transformationValue - Function to transform the current value
     * @returns {Array} Current state of teh segments after the operation
     * @private
     */
    _updateSegments(from, to, transformationValue) {
        // Edge case: First segment addition
        if (this.segments.length === 0) {
            const initialIntensity = transformationValue(0)
            this.segments = [[from, initialIntensity], [to, 0]];
            return [...this.segments];
        }

        // Build a map of all existing points (key) and their intensity (values)
        const pointsMap = new Map(this.segments);

        // Add 'from' boundary if it doesn't exist
        if (!pointsMap.has(from)) {
            let valueAtFrom = this._getValueAtPoint(from);
            pointsMap.set(from, valueAtFrom);
        }

        // Add 'to' boundary if it doesn't exist
        if (!pointsMap.has(to)) {
            let valueAtTo = this._getValueAtPoint(to);
            pointsMap.set(to, valueAtTo);
        }

        // Apply intensity change in range [from, to)
        const allPoints = Array.from(pointsMap.keys()).sort((a,b) => a - b);
        for (const point of allPoints) {
            if (point >= from && point < to) {
                const currentValue = pointsMap.get(point);
                pointsMap.set(point, transformationValue(currentValue));
            }
        }

        // Build new segments while skipping unchanged values
        const newSegments = [];
        let previousValue = null;
        for (const point of allPoints) {
            const val = pointsMap.get(point);
            // Keep a point if its the first point, last point, or its value has changed
            if (newSegments.length == 0 || point == to || val != previousValue) {
                newSegments.push([point, val]);
                previousValue = val;
            }
        }

        this.segments = newSegments;
        return [...this.segments];
    }
    
    /**
     * Helper method to find the intensity value at a given point.
     * @param {number} point - The point to find the intensity value for
     * @returns {number} The intensity value at the point
     * @private
     */
    _getValueAtPoint(point) {
        for (let i = this.segments.length - 1; i >= 0; i--) {
            const [segmentPoint, segmentValue] = this.segments[i];
            if (segmentPoint <= point) {
                return segmentValue;
            }
        }
        return 0;
    }
}
module.exports = {SegmentManager};