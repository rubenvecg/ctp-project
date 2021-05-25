module.exports = {
    getDimensions : (id) => {
        const parent = document.getElementById(id).parentElement
        parent.style.fontSize = 0
        parent.style.verticalAlign = "top"
        
        const pw = parent.clientWidth
        const ph = parent.clientHeight
    
        return [pw, ph]
    }
}