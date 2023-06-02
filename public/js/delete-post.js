document.getElementById("delete-btn").addEventListener("click", deletePost);

async function deletePost(event) {
  event.preventDefault();

  try {
    const deletedPostResponse = await fetch(`/post/${postId}`, {
      method: "DELETE",
    });

    if (deletedPostResponse.ok) {
      window.location.replace(`/dashboard`);
    } else {
      console.log("Failed to delete post");
    }
  } catch (error) {
    console.log(error);
  }
}
