const fs = require('fs');

// Specify the file path
const filePath = './input1.txt';

// Read the file content (synchronously)
try {
    const data = fs.readFileSync(filePath, 'utf8');
    //console.log('File content:', data);
    const rows = getLines(data)
    solve(rows)
} catch (err) {
    console.error('Error reading the file:', err);
}


function getLines(input) {
    const rows = input.trim().split('\n');

    // Initialize arrays for left and right numbers
    const result = { left: [], right: [] };

    // Process each row
    rows.forEach(row => {
        // Split the row by spaces (using regex to handle multiple spaces)
        const [left, right] = row.trim().split(/\s+/).map(Number);
        result.left.push(left);
        result.right.push(right);
    });
    result.left.sort(function (a, b) { return a - b })
    result.right.sort(function (a, b) { return a - b })
    return result;
}

function solve(rows) {
    const num = rows.left.length
    let sum = 0
    for(let i = 0; i < num; i++) {
        leftNum = rows.left[i]
        rightNum = rows.right[i];
        sum += Math.abs(leftNum - rightNum)
    }
    console.log(sum)
}