const d3 = require("d3")

module.exports = {
    load: (link, xCol, yCol) => {
        return new Promise((resolve, reject) => {
            let data = []

            d3.csv(link, (d, i) => {
                data.push({
                    [xCol]: d[xCol],
                    [yCol]: parseInt(d[yCol])                    
                })

                data.sort((a, b) => {
                    if(parseInt(a[yCol]) < parseInt(b[yCol])) return 1
                    if(parseInt(a[yCol]) > parseInt(b[yCol])) return -1
                    return 0
                })
            }).then(() => {                
                resolve(data)
            }).catch((error) => {
                console.log(error)
            })

            
        })
    }
}