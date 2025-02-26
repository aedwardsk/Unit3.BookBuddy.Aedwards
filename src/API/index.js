const API_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

//fetch all books function
export async function fetchBooks() {
  try {
    const response = await fetch(`${API_URL}/books`);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const data = await response.json();
    return data.books;
  } catch (error) {
    console.error("Failed to fetch books", error);
  }
}

//fetch single book function
export async function fetchBook(id) {
  try {
    const response = await fetch(`${API_URL}/books/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch book");
    }
    const data = await response.json();
    return data.book;
  } catch (error) {
    console.error("Failed to fetch book", error);
  }
}

export async function registerUser(firstname, lastname, email, password) {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server error response:", errorData);
      throw new Error("Failed to register user");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to register user", error);
    throw error;
  }
}
