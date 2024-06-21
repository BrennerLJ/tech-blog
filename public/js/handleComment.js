// get elements by ID
const addBtn = document.getElementById('comment-btn');
const commentForm = document.getElementById('comment-wrapper');
const postId = document.querySelector('.post-id').getAttribute('data-id');

// function to handle submitting a new comment
async function commentHandler(event) {
    event.preventDefault();
    const content = document.getElementById('new-comment').value.trim();;
    if(content != 'comment goes here' && content){

        // send a POST request to the comment endpoint with post_id and content
        const response = await fetch('/api/comment/', {
            method: 'POST',
            body: JSON.stringify({post_id: postId, content: content}),
            headers: { 'Content-Type': 'application/json' },
        })
        // if the response is ok, reload the page to see the new comment
        if (response.ok) {
            document.location.reload();
          } else {
            alert('failed to post');
          }
    }
}

// function to handle clicking on the add comment button
function commentBtnHandler(event) {
    switchDisplay(commentForm);
}

// add event listeners to the comment form submission and add comment button click
const createEventListeners = () => {
    commentForm.addEventListener('submit', commentHandler);
    addBtn.addEventListener('click', commentBtnHandler)
     
    }
    
    createEventListeners();

    // function to toggle the display of an element
    function switchDisplay (el) {
        if (el.style.display == 'none'){
            el.style.display = 'flex'
            addBtn.innerText = 'cancel'
        }else{
            el.style.display = 'none';
            addBtn.innerText = 'add comment'
        }
    }