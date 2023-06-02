document.getElementById("update-btn").addEventListener("click", updatePost);

async function updatePost(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const updatedPostData = {
    title,
    content,
  };

  try {
    const updatedPostResponse = await fetch(`/post/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPostData),
    });

    if (updatedPostResponse.ok) {
      window.location.replace(`/dashboard`);
    } else {
      console.log("Failed to update post");
    }
  } catch (error) {
    console.log(error);
  }
}
