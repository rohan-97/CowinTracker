console.log("Rohan Debug")
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, {
        accordion: true
    });
});
info = {}

// fetch('https://cdn-api.co-vin.in/api/v2/admin/location/states')
//   .then(response => response.json())
//   .then(data => info = data);
// setTimeout(()=>{console.log(info)}, 1000)
// console.log(info)
// fetch('https://cdn-api.co-vin.in/api/v2/admin/location/districts/21')
// .then(response => response.json())
// .then(data => console.log(data));


fetch('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=421301&date=19-06-2021')
.then(response => response.json())
.then(data => console.log(data));

// fetch('https://cdndemo-api.co-vin.in/api/v2/appointment/sessions/findByDistrict?district_id=392&date=19-06-2021&vaccine=COVISHIELD')
// .then(response => response.json())
// .then(data => console.log(data));
Thane : 392
Maharashtra : 21