// fetch("http://puzzle.mead.io/puzzle")
// .then((response)=>{
//     console.log(response);
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })

// fetch("http://localhost:3000/weather?address=!")
// .then((response)=>{
//     console.log(response);
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error);
//         }else{
//             console.log(data.address);
//             console.log(data.forecast);
//         }
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const error = document.querySelector('#error');
const message = document.querySelector('#message');

weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    error.textContent = 'Loading......'
    message.textContent=''
    // console.log('testing');
    const address = search.value;
    console.log(address) 
    fetch("http://localhost:3000/weather?address="+address) 
    .then((response)=>{
        console.log(response);
        response.json().then((data)=>{
            if(data.error){
                error.textContent = data.error
            }else{
                message.textContent = data.address
                message.textContent = data.forecast
            }
        })
    })

})