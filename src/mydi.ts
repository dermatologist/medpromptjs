


const mydi = (c:any, m:string, b:string) => {
    try {
        return c.resolve(m+"_"+b);
    } catch (e) {
        c.resolve(b);
    }
}

export default mydi;