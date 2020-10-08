function submit_task(){
    const inputobj = document.querySelector('.input_line');
    const task = inputobj.value;
    inputobj.value = '';
    console.log(task);
    const card = document.createElement('div');
    card.innerHTML = task;
    const container = document.querySelector('.container')
    container.appendChild(card);
}

function clearContainer(){
    document.querySelector('.container').innerHTML = '';
}

const submit = document.querySelector('.bt_submit');
submit.addEventListener('click',submit_task);

const clear = document.querySelector('.bt_clear');
clear.addEventListener('click',clearContainer);