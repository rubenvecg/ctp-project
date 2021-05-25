const fileNames = {
    'boroughs': {
        'geojson': 'boroughs.geojson',
        'offenses': 'offenses_by_boro.csv',
        'age-sex': 'age_by_boro.csv',
        'race': 'race_by_boro.csv'
    },
    'schoolDistricts': {
        'geojson': 'school_districts.geojson',
        'offenses': 'offenses_by_school_district.csv',
        'age-sex': 'age_by_school_district.csv',
        'race': 'race_by_school_district.csv'
    },
    'policePrecincts': {
        'geojson': 'police_precincts.geojson',
        'offenses': 'offenses_by_police_precinct.csv',
        'age-sex': 'age_by_police_precinct.csv',
        'race': 'race_by_police_precinct.csv'
    }
}

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

    getFileLink : (year, boundary, chart) => {
        return `https://raw.githubusercontent.com/Maisa-ah/ctp-project/data/src/Data/${year}_${fileNames[boundary][chart]}`
    },

    getGeoJSONLink : (boundary) => {
        return `https://raw.githubusercontent.com/Maisa-ah/ctp-project/data/src/Data/${fileNames[boundary]['geojson']}`
    }

}