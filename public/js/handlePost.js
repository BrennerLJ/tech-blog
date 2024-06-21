// get button element with the id 'input-wrapper'
const postBtn = document.getElementById("input-wrapper");

// function to handle creating a new post
async function postHandler(event) {
  const content = document.getElementById("new-post").value.trim();
  const title = document.getElementById("title").value.trim();

  // check if both the title and content are provided
  if (title != "Title" && content != "post goes here" && title && content) {
    const response = await fetch("/api/post/", {
      method: "POST",
      body: JSON.stringify({ title: title, content: content }),
      headers: { "Content-Type": "application/json" },
    });

    // if the reponse is ok, reoad the home page to see the newly created post
    if (response.ok) {
      document.location.reload();
    } else {
      alert("failed to post");
    }
  }
}

// add an event listener to the form submission of the button for creating a new post
postBtn.addEventListener("submit", postHandler);