const form=document.getElementByClassName('')[0];
form.addEventListener('submit', handleFormSubmit);

const data=getFormDataAsJSON(form);

function submit(){
    parseInput();
    postInput();
}

function parseInput(){
    
}


// https://code.lengstorf.com/get-form-values-as-json/