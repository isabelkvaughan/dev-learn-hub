document.getElementById("submit-btn").addEventListener("click", createComment);

async function createComment(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const newPostData = {
    title,
    content,
  };

  try {
    const newPostResponse = await fetch(`/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPostData),
    });

    if (newPostResponse.ok) {
      window.location.replace(`/dashboard`);
    } else {
      console.log("Failed to create comment");
    }
  } catch (error) {
    console.log(error);
  }
}
