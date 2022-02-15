export function analyse(original,alpha=0.5,T=1){
    let first = []
    let second = []
    let at = 0
    let bt = 0
    let future = 0
    first[0] = (original[0]+original[1]+original[2])/3
    for (let i = 0; i<original.length;i++){
        first.push(alpha*original[i] + ((1-alpha)*first[i]))
    }
    // 一次指数平滑
    second[0] = first[0]
    for (let i = 1; i<first.length;i++){
        second.push(alpha*first[i] + ((1-alpha)*second[i-1]))
    }
    // 二次指数平滑
    
    at = 2*first[first.length-1] - second[second.length-1]
    bt = (alpha/(1-alpha))*(first[first.length-1] - second[second.length-1])
    // 推导公式
    future = Math.ceil(at +T*bt)
    if (future<1) return 1
    return future
}