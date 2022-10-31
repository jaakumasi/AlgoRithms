/**
 * palindromeChecker takes a string, an array of start indexes and end indexes, and an array of character substitutions allowed.
 * It starts with an empty query string (output). At the end of each query, 1 or 0 is appended to indicate whether 
 * the substring can be converted into a palindrome or not. A 1 reps 'yes' and 0 reps 'no'. 
 * Returns the result after all queries have been processed.
 */

// console.log(palindromeChecker('cdecd', [0, 0, 0, 0], [0, 1, 2, 3], [0, 1, 1, 0]));

function palindromeChecker(s, startIndex, endIndex, subs) {
    if (s.length === 1) return 1;

    let output = '';

    for (let i = 0; i < startIndex.length; i++) {
        // if s is a single character, its a palindrome
        if (startIndex[i] === endIndex[i])  output += 1;
        else {
            let subString = s.substring(startIndex[i], endIndex[i] + 1);
            let madePalindrome = false;
            //  check whether s is a palindrome
            for (let j = 0; j < Math.floor(subString.length / 2); j++) {
                //  if s is not a palindrome and subs are not allowed, try rearranging characters
                if (subString[j] != subString[subString.length - j - 1] && subs[i] === 0 && subString.length > 2) {
                    output += charFreqCheck(subString);
                    madePalindrome = true;
                    break;
                }
                //  if subs are allowed, make substitutions then try rearranging characters 
                else if (subString[j] != subString[subString.length - j - 1] && subs[i] !== 0 && subString.length > 2) {
                    output += substitute(subString, subs[i]);
                    madePalindrome = true;
                    break;
                }
            }
            //  checks if the substring was already a palindrome or whether it got subbed or rerearranged into a palindrome
            if (!madePalindrome) output += 1;
        }
    }

    return output;
}

function charCount(s) {
    let s_copy = s;
    s_copy = Array.from(s_copy);
    s_copy.sort();
    let charArray = [];     // a set of each character in the string
    let charFreqArray = [];    // holds the frequency of each character
    let char = s_copy[0];
    charArray.push(char); charFreqArray.push(1);
    for (let i = 1; i < s_copy.length; i++) {
        if (s_copy[i] === char) {
            charFreqArray[charFreqArray.length - 1]++;
        }
        else {
            char = s_copy[i];
            charArray.push(s_copy[i]);
            charFreqArray.push(1);
        }
    }

    return [charArray, charFreqArray];
}

function substitute(s, subs) {
    //  even if subs can be made, make sure the string cannot be rearranged into a palindrome
    if (charFreqCheck(s) === 1) return 1;
    let returnVal_array = charCount(s);
    let charArray = returnVal_array[0];
    let charFreqArray = returnVal_array[1];

    let oddChars = [];  // array of characters whose freqeuncy is is an odd number
    let oddCharsFreq = [];  // 
    for (let i = 0; i < charArray.length; i++) {
        if (charFreqArray[i] % 2 !== 0) {
            oddChars.push(charArray[i]);
            oddCharsFreq.push(charFreqArray[i]);
        }
    }
    // make the allowed number of substitutions and add replaced and replacer chars to their respective arrays
    let replacedChars = [], replacerChars = [];
    for (let j = 0; j < subs; j++) {
        replacedChars.push(oddChars[oddChars.length - j - 1]);
        replacerChars.push(oddChars[j]);
        oddChars[oddChars.length - j - 1] = oddChars[j];
    }
    //  if any of the chars in oddChars array has a freq of 1, that char should be placed in the center to make it more likely to form a palindrome
    let firstMatchIndex = 0, middleIndex = Math.floor(oddCharsFreq.length / 2);
    if (oddChars.length % 2 !== 0 && oddCharsFreq.find((n, i) => { if (n === 1) { firstMatchIndex = i; return true } else { return false } }) && oddCharsFreq[middleIndex] !== 1) {
        let middleChar = oddChars[middleIndex];
        oddChars[middleIndex] = oddChars[firstMatchIndex];
        oddChars[firstMatchIndex] = middleChar;
    }
    for (let k = 0; k < charArray.length; k++) {
        // increment frequency of replacer chars
        if (!replacedChars.find(c => c === charArray[k]) && replacerChars.find(c => c === charArray[k])) charFreqArray[k]++;
        // decrement frequency of replaced chars
        else if (replacedChars.find(c => c === charArray[k])) charFreqArray[k]--;
    }

    return charFreqCheck(null, charFreqArray);
}

function charFreqCheck(s, charF) {
    let charFreqArray = s ? charCount(s)[1] : charF;
    //  Check whether all the numbers in the frequency array are even. If it so, a palindrome can be formed
    if (!charFreqArray.find(n => n % 2 !== 0 && n !== 0)) return 1;
    /*  If the length of the frequency array is odd with the smallest odd frequency being 1, check to see if this frequency appears once.
        If it does not, a palindrome cannot be formed   */
    else if (charFreqArray.find(n => n % 2 !== 0 && n !== 0) === 1) {
        let count = 0;
        for (let k = 0; k < charFreqArray.length; k++) {
            if (charFreqArray[k] === 1) {
                count++;
            }
        }
        if (count > 1) return 0;  // cannot form palindrome
        else return 1;
    }
    else return 0;
}
