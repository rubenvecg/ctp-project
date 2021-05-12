module.exports={

    getColName : (b) => {
        if(b === "boroughs") return {code: "BoroCode", name: "BoroName"}
        if(b === "schoolDistricts") return "SchoolDist"
        if(b === "policePrecincts") return "Precinct"
    },

    cleanName : (b) => {
        if(b === "boroughs") return "Borough"
        if(b === "schoolDistricts") return "School District"
        if(b === "policePrecincts") return "Police Precinct"
    },

    getBoroName : (code) => {
        if(code == 1) return "Manhattan"
        if(code == 2) return "Bronx" 
        if(code == 3) return "Brooklyn"
        if(code == 4) return "Queens"
        if(code == 5) return "Staten Island"
    },

}