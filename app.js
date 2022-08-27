const outputBox = document.getElementById('output-box');
const inputBodyBox = document.getElementById('body-input-box');
const dataBody = document.getElementById('data-body');
const sendBtn = document.getElementById('send-button');
const urlBox = document.getElementById('url-box');
const methodBox = document.getElementById('method');

const fetchApi = async (url = '', method='GET', data = {}) => {
    const body = {
        method: method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    };
    if(method !== 'GET'){
        body['body'] = JSON.stringify(data);
    }
    const response = await fetch(url, body);
    return response.json();
}


const myFunction = () => {
    outputBox.innerHTML = '';
    const url = urlBox.value;
    const method = methodBox.value;
    const body = inputBodyBox && inputBodyBox.value ? inputBodyBox.value : {};
    fetchApi(url, method, body)
    .then((data) => {
        outputBox.innerHTML = `<pre>${JSON.stringify(data, (key, val) => {
            if (typeof val === "string") {
                return `<span class=text-success>${val}</span>`
            }
            return val;
        }, 4)}</pre>`
    });

}



sendBtn.addEventListener('click', myFunction);
urlBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        myFunction();
    }
});
methodBox.addEventListener('change', e => {
    if (methodBox.value === 'GET') {
        dataBody.style.display = "none";
    } else {
        dataBody.style.display = "block";
    }
})