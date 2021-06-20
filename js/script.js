info = {}
async function populate_form() {
    chrome.storage.sync.get(['cowin_tracker'], result => {
        if(result.cowin_tracker instanceof Object){
            info['pincode'] = result.cowin_tracker.pincode;
            info['min_age'] = result.cowin_tracker.min_age;
            info['vaccine_filter'] = result.cowin_tracker.vaccine_filter;
            info['cost_filter'] = result.cowin_tracker.cost_filter;
            set_pincode_from_inputtext(info['pincode']);
            set_min_age(info['min_age']);
            set_vaccines_filter(info['vaccine_filter']);
            set_cost(info['cost_filter']);
        }
    });
    return true;
}
populate_form().then(
    (value) => {
        fetch('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=421301&date=19-06-2021')
        .then(response => response.json())
        .then(data => {
            vaccine_center_ul_list = document.getElementById('vaccine_centre_list');
            for(centre of data.sessions) {
                vaccine_center_ul_list.appendChild(prepare_list_tag(centre));
            }
        }).catch(
            error => {
                error_text = "Jhol zala "+error;
                console.log(error_text);
                vaccine_center_ul_list = document.getElementById('vaccine_centre_list');
                vaccine_center_ul_list.appendChild(prepare_error_message(error_text));            
            }
            );
            document.addEventListener('DOMContentLoaded', function() {
                var elems = document.querySelectorAll('.collapsible');
                var instances = M.Collapsible.init(elems, {
                    accordion: true
                });
            });
        },
    (error) => {
            error_text = "Jhol zala "+error;
            console.log(error_text);
            vaccine_center_ul_list = document.getElementById('vaccine_centre_list');
            vaccine_center_ul_list.appendChild(prepare_error_message(error_text));
            
            document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.collapsible');
            var instances = M.Collapsible.init(elems, {
                accordion: true
            });
        });

    }
    )

    function prepare_error_message(error_msg){
        list_tag = document.createElement('li');
            error_message = document.createElement('div');
            error_message.classList.add("collapsible-header")
                error_icon = document.createElement('i');
                error_icon.classList.add('material-icons');
                error_icon.innerText = 'error'
            error_message.appendChild(error_icon)
                name_text = document.createTextNode(error_msg);
            error_message.appendChild(name_text)
        list_tag.appendChild(error_message);
        return list_tag
    }
    function prepare_list_tag(centre){
        list_tag = document.createElement('li');
            name_tag = document.createElement('div');
            name_tag.classList.add("collapsible-header")
                hosp_icon = document.createElement('i');
                hosp_icon.classList.add('material-icons');
                hosp_icon.innerText = 'local_hospital'
            name_tag.appendChild(hosp_icon)
                name_text = document.createTextNode(centre.name);
            name_tag.appendChild(name_text)
        list_tag.appendChild(name_tag)
            collapse_body_tag = document.createElement('div');
            collapse_body_tag.classList.add('collapsible-body');
                ul_tag = document.createElement('ul');
                    age_list = document.createElement('li')
                    age_list.innerText = "Age Limit : "+centre.min_age_limit+"+";
                ul_tag.appendChild(age_list);
                    vaccine_name_tag = document.createElement('li');
                    vaccine_name_tag.innerText = "Vaccine Name : " + centre.vaccine;
                ul_tag.appendChild(vaccine_name_tag);
                    dose_1_tag = document.createElement('li');
                    dose_1_tag.innerText = "Dose 1 : " + centre.available_capacity_dose1;
                ul_tag.appendChild(dose_1_tag);
                    dose_2_tag = document.createElement('li');
                    dose_2_tag.innerText = "Dose 2 : " + centre.available_capacity_dose2;
                ul_tag.appendChild(dose_2_tag);
                    fee_tag = document.createElement('li');
                    fee_tag.innerText = "Fee : " + centre.fee;
                ul_tag.appendChild(fee_tag);
            collapse_body_tag.appendChild(ul_tag);
                address_tag = document.createElement('p');
                address_tag.innerText = centre.address
            collapse_body_tag.appendChild(address_tag);
        list_tag.appendChild(collapse_body_tag);
        return list_tag;
    }
    document.getElementById('settings_save').onclick = save_settings;
        
    function save_settings() {
        info['pincode'] = get_pincode_from_inputtext();
        info['min_age'] = get_min_age();
        info['vaccine_filter'] = get_vaccines_filter();
        info['cost_filter'] = get_cost()
        add_to_local_storage(info);
    }
    
    function get_min_age() {
        stuff = document.getElementById('age_selection');
        min_age = 0
        for(values of stuff.getElementsByTagName('input')) {
            if(values.checked) {
                age = parseInt(values.labels[0].innerText.trim());
                min_age = (age>min_age)? age: min_age;
            }
        }
        return min_age;
    }
    function set_min_age(age) {
        stuff = document.getElementById('age_selection');
        for(values of stuff.getElementsByTagName('input')) {
            if(parseInt(values.labels[0].innerText.trim()) >= age) {
                values.checked = true;
            }
        }
    }
    
    function get_vaccines_filter() {
        return get_checked_elements_from_selector('vaccine_filter');
    }
    function set_vaccines_filter(vaccines) {
        check_if_exists_in_array('vaccine_filter', vaccines);
    }
    
    function get_cost() {
        return get_checked_elements_from_selector('vaccine_cost_selector');
    }
    function set_cost(paise) {
        check_if_exists_in_array('vaccine_cost_selector', paise);
    }
    
    function get_checked_elements_from_selector(selector) {
        selected_elements = document.getElementById(selector);
        filter_list = []
        for(element of selected_elements.getElementsByTagName('input')) {
            if(element.checked) {
                filter_list.push(element.labels[0].innerText.trim());
            }
        }
        return filter_list;
    }
    function check_if_exists_in_array(selector_id, array) {
        main_tag = document.getElementById(selector_id);
        for(element of main_tag.getElementsByTagName('input')) {
            if(array.includes(element.labels[0].innerText.trim())) {
                element.checked = true;
            }
        }
    }
    
    function get_pincode_from_inputtext() {
        pincode_input_tag = document.getElementById('icon_prefix');
        return pincode_input_tag.value
    }
    function set_pincode_from_inputtext(pincode) {
        pincode_input_tag = document.getElementById('icon_prefix');
        pincode_input_tag.value = pincode;
        pincode_input_tag.labels[0].classList.add('active');
    }
    
    function add_to_local_storage(info) {
        chrome.storage.sync.set({cowin_tracker: info});
    }