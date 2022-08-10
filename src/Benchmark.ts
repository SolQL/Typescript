async function time(callback: Function, msg: string) {
    const start = Date.now()
    const result = await callback();
    const finish = Date.now()
    const delta = finish - start;
    console.log(`${msg}: ${delta}ms`)

    return result;
}


export { time }