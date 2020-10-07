function submit_task(){
    const inputobj = document.querySelector('.input_line');
    const task = inputobj.value;
    inputobj.value = '';
    console.log(task);
}
const submit = document.querySelector('.bt_submit');
submit.addEventListener('click',submit_task);

