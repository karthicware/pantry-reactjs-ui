import stateData from "utils/state.json";
import cityData from "utils/city.json";

const index = {
    getStates: function () {
        return stateData.states;
    },
    getCitiesOfState: function (stateId) {
        //console.log(JSON.stringify(cityList));
        const cities = cityData.cities.filter(function (value) {
            return value.state_id === stateId;
        });
        return cities.sort(compare);
    },
};

function compare(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}


// const _findEntryById = (source, id) => {
//     if (source != null) {
//        const idx = source.findIndex((c, i) => c.state_id === id);
//        return (idx !== -1) ? source[idx] : '';
//     } else {
//        return '';
//     }
//   };

export default index;
