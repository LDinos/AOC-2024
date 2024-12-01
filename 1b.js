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
    const minNum = rows.right[0]
    let sum = 0
    cacheMap = {}
    for(let i = 0; i < num; i++) {
        const leftNum = rows.left[i]
        if (cacheMap.leftNum) {
            sum += cacheMap.leftNum
            continue
        }
        cacheMap[leftNum] = 0
        if (leftNum < minNum) continue;
        const numberToSearch = (element) => element == leftNum;
        const startj = rows.right.findIndex(numberToSearch)
        if (startj == -1) continue;
        const rightNum = rows.right[startj]
        const rightNumOcc = getOccurences(rows.right, rightNum)
        sum += leftNum * rightNumOcc
        cacheMap[leftNum] = leftNum * rightNumOcc
    }
    console.log(cacheMap)
    console.log(sum)
}

function getOccurences(array, targetNumber) { 
    return array.reduce((acc, num) => {
        return num === targetNumber ? acc + 1 : acc;
    }, 0);
}