// let id, target, options;

// const success = pos => {
//   var crd = pos.coords;
//   if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
//     console.log('Congratulations, you reached the target');
//     navigator.geolocation.clearWatch(id);
//   }
// };

// const error = err => {
//   console.warn(`ERROR ${err.code}: ${err.message}`);
// };

// const target = {
//   latitude: 0,
//   longitude: 0,
// };

// const options = {
//   enableHighAccuracy: false,
//   timeout: 5000,
//   maximumAge: 0,
// };

// const id = navigator.geolocation.watchPosition(success, error, options);
