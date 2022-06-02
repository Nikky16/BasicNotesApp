console.log('This is project 1');

// adding note
shownotes();

document.getElementById('addBtn').addEventListener('click', ()=>{
    // console.log("You have clicked on addBtn.")
    let text = document.getElementById('addTxt');
    
    noteslocal = localStorage.getItem('noteslocal');
    if(noteslocal == null){
        notesarr = [];
    }
    else{
        notesarr = JSON.parse(noteslocal);
    }
    notesarr.push(text.value);
    localStorage.setItem('noteslocal', JSON.stringify(notesarr));
    text.value = '';

    shownotes();
})

// displaying notes
function shownotes(){
    noteslocal = localStorage.getItem('noteslocal');
    if(noteslocal == null){
        notes = document.getElementById('notes');
        notes.innerHTML = `<b>No note present! Please click on "Add a Note" to add notes!</b>`;
    }
    else{
        notesarr = JSON.parse(noteslocal);
        notes = document.getElementById('notes');
        elem = '';
        notesarr.forEach((element, index) => {
            string = `<div class="card" style="width: 18rem;">
                        <div class="card-body noteCard">
                        <h5 class="card-title">Note ${index+1}</h5>
                        <p class="card-text">${element}</p>
                        <a href="#" onclick="deletenote(${index})" class="btn btn-primary">Delete Note</a>
                        </div>
                    </div>`;
            elem+= string;          
        });
        notes.innerHTML = elem;
    }
}

// deleting notes
function deletenote(index){
    noteslocal = localStorage.getItem('noteslocal');
    
    notesarr = JSON.parse(noteslocal);
    notesarr.splice(index, 1);
    localStorage.setItem('noteslocal', JSON.stringify(notesarr));
    shownotes();
}

// searching notes
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})