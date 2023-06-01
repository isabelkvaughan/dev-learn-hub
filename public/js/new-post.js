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
      const newPost = await newPostResponse.json();
      const postId = newPost.id;
      window.location.replace(`/post/${postId}`);
    } else {
      console.log("Failed to create comment");
    }
  } catch (error) {
    console.log(error);
  }
}
