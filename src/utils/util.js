export function addCommas(val) {
  if (typeof val !== "number") return val;
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function handleError(errResp) {
  return errResp.response.data.message;
}
