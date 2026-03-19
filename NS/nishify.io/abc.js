function memoizedFactorial() {
    const cache={}
    function factorial(n){
        if (n==1){ return 1;}
        if (cache[n]){
            console.log("From Cache");
            return cache[n]
        }
        const res= n*factorial(n-1);
        cache[n]=res
        return res
    }
    return factorial 
}

const factorial = memoizedFactorial();
console.log(factorial(5)); // Computes and caches
console.log(factorial(5)); // Returns cached result