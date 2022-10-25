// Takes an array of numbers and logs the pairs with the smallest absolute difference

function closestNumbers(numArray) {
    if (numArray.length > 1) {
        let smallestAbsoluteDiff = 0, smallestPairs = [];
        let sortedNumArray = numArray.sort((a, b) => a - b);
        let prevNum = sortedNumArray[0];
        for (let i = 1; i < sortedNumArray.length; i++) {
            let diff = sortedNumArray[i] - prevNum;
            if (diff < smallestAbsoluteDiff || smallestAbsoluteDiff === 0) {
                smallestAbsoluteDiff = diff;
                smallestPairs[0] = [prevNum, sortedNumArray[i]];
            }
            else if (smallestAbsoluteDiff === diff) {
                smallestPairs.push([prevNum, sortedNumArray[i]]);
            }
            prevNum = sortedNumArray[i];
        }

        smallestPairs.map(pair => {
            console.log(`${pair[0]} ${pair[1]}`)
        })
    }
}