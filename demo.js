const createdAtISO = new Date("2023-09-19T10:57:15.381Z");
const updatedAtISO = new Date("2023-09-20T09:25:18.002Z");

const createdAtReadable = createdAtISO.toLocaleString();
const updatedAtReadable = updatedAtISO.toLocaleString();

console.log("Created At:", createdAtReadable);
console.log("Updated At:", updatedAtReadable);


const date = new Date(2025, 8, 3); // Note: Month is zero-based (0 = January, 8 = September)
const isoDate = date.toISOString().split('T')[0]; // Extract date part from ISO string
console.log(isoDate);
