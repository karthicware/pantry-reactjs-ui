function updateSingleValueParam(filterType, filterValue) {
  let searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get(filterType)) {
    if (searchParams.get(filterType) === filterValue)
      searchParams.delete(filterType);
    else searchParams.set(filterType, filterValue);
  } else {
    searchParams.set(filterType, filterValue);
  }
  return searchParams.toString();
}

function updateMultiValueParam(filterType, filterValue) {
  let searchParams = new URLSearchParams(window.location.search);
  //console.log(`searchParams=${searchParams.toString()}`);
  if (searchParams.get(filterType)) {
    //console.log(`filterType found`);
    let newValue = searchParams.get(filterType);
    if (newValue.indexOf("-") != -1) {
      // console.log(`some value already exist`);
      // console.log(`nevalue=${newValue.split("-")}`);
      let isFound = false;
      newValue = newValue
        .split("-")
        .filter(x => {
          //console.log(`x=${x}, filterValue=${filterValue}`);
          if (x == filterValue) {
            //console.log(`matched`);
            isFound = true;
            return false;
          }
          return true;
        })
        .join("-");
      //console.log(`isFound=${isFound}`);
      if (!isFound) newValue = newValue + "-" + filterValue;
      searchParams.set(filterType, newValue);
    } else {
      //console.log(`empty filtertype`);
      if (filterValue == newValue) searchParams.delete(filterType);
      else searchParams.set(filterType, newValue + "-" + filterValue);
    }
  } else {
    //console.log(`filterType not found`);
    searchParams.set(filterType, filterValue.toString());
  }
  return searchParams.toString();
}

export function updateParams(filterType, filterValue) {
  if (filterType === "discount") {
    return updateSingleValueParam(filterType, filterValue);
  } else {
    return updateMultiValueParam(filterType, filterValue);
  }
}

export const fields = [
  "tradition",
  "color",
  "discount",
  "blouse",
  "sareeFabric",
  "border",
  "occasion",
  "ornamentation",
  "pattern",
  "weave"
];

export function populateFilterObjectFromQueryParam(searchParams) {
  let filterFormObj = {
    tradition: [],
    color: [],
    discount: null,
    blouse: [],
    sareeFabric: [],
    border: [],
    occasion: [],
    ornamentation: [],
    pattern: [],
    weave: []
  };
  fields.forEach(field => {
    if (searchParams.get(field)) {
      if (field === "discount") {
        filterFormObj[field] = searchParams.get(field);
      } else {
        filterFormObj[field] = searchParams.get(field).split("-");
      }
    }
  });
  return filterFormObj;
}
