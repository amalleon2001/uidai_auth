
function selectImage(){
    const file = document.createElement('INPUT'); file.type = 'file';
    file.click();
    file.onchange = function(){
        document.getElementById('image').src = window.URL.createObjectURL(this.files[0]);
    }
}

function submitKyc(){
    fetch('Kyc', {method: 'POST'}).then(result => { result.text().then(result => {
        localStorage.setItem('ResidentQrocde', result);
        window.location.href = "/";
    })})
}

