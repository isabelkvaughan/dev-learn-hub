document.getElementById("submit-btn").addEventListener("click", createComment);

async function createComment(event) {
  event.preventDefault();

  const content = document.getElementById("content").value;
  const postId = document.querySelector('input[name="post_id"]').value;

  const commentData = {
    content,
  };

  try {
    const response = await fetch(`/api/post/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });

    if (response.ok) {
      const comment = await response.json();
      console.log("Comment created:", comment);

      document.getElementById("content").value = "";

      // Refresh the page
      location.reload();
    } else {
      console.log("Failed to create comment");
    }
  } catch (error) {
    console.log(error);
  }
}
