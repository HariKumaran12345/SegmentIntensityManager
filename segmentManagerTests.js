const { SegmentManager } = require('./segmentManager');

// Test Case 1
console.log("Test Case 1:");
const manager1 = new SegmentManager();
console.log("Start:", manager1.segments);  // Expected: []
console.log("Call: add(10, 30, 1) =>", manager1.add(10, 30, 1));
// Expected: [[10, 1], [30, 0]]
console.log("Call: add(20, 40, 1) =>", manager1.add(20, 40, 1));
// Expected: [[10, 1], [20, 2], [30, 1], [40, 0]]
console.log("Call: add(10, 40, -2) =>", manager1.add(10, 40, -2));
// Expected: [[10, -1], [20, 0], [30, -1], [40, 0]]

// Test Case 2
console.log("\nTest Case 2:");
const manager2 = new SegmentManager();
console.log("Start:", manager2.segments);  // Expected: []
console.log("Call: add(10, 30, 1) =>", manager2.add(10, 30, 1));
// Expected: [[10, 1], [30, 0]]
console.log("Call: add(20, 40, 1) =>", manager2.add(20, 40, 1));
// Expected: [[10, 1], [20, 2], [30, 1], [40, 0]]
console.log("Call: add(10, 40, -1) =>", manager2.add(10, 40, -1));
// Expected: [[10, 0], [20, 1], [30, 0], [40, 0]]
console.log("Call: add(10, 40, -1) =>", manager2.add(10, 40, -1));
// Expected: [[10, -1], [20, 0], [30, -1], [40, 0]]

//Test Case 3
console.log("\nTest Case 3 (set method):");
const manager3 = new SegmentManager();
console.log("Start:", manager3.segments); // Expected: []
console.log("Call: add(10, 50, 1) =>", manager3.add(10, 50, 1));
// Expected: [[10, 1], [50, 0]]
console.log("Call: add(20, 40, 2) =>", manager3.add(20, 40, 2));
// Expected: [[10, 1], [20, 3], [40, 1], [50, 0]]
console.log("Call: set(15, 45, 5) =>", manager3.set(15, 45, 5));
// Expected:[ [10, 1], [15, 5], [45, 1], [50, 0] ]

//Test Case 4
console.log("\nTest Case 4 (complex set method):");
const manager4 = new SegmentManager();
console.log("Start:", manager4.segments);
console.log("Call: add(10, 30, 1) =>", manager4.add(10, 30, 1));
// Expected: [[10, 1], [30, 0]]
console.log("Call: add(15, 40, 2) =>", manager4.add(15, 40, 2));
// Expected: [[10, 1], [15, 3], [30, 2], [40, 0]]
console.log("Call: add(25, 45, 3) =>", manager4.add(25, 45, 3));
// Expected: [[10, 1], [15, 3], [25, 6], [30, 5], [40, 3], [45, 0]]
console.log("Call: set(20, 35, 0) =>", manager4.set(20, 35, 0));
// Expected: [[10, 1], [15, 3], [20, 0], [35, 5], [40,3], [45, 0]]