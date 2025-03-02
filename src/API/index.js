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

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server error response:", errorData);
      throw new Error("Failed to login user");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to login user", error);
    throw error;
  }
}

export async function fetchAccount({ token }) {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({
      //   email: email,
      //   password: password,
      // }),
    });
    if (!response.ok) {
      throw new Error("Failed response can't Verify user");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to Verify user", error);
    throw error;
  }
}

export async function fetchReservations({ token }) {
  try {
    const response = await fetch(`${API_URL}/reservations`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed response can't Verify user");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to display reservations", error);
    throw error;
  }
}

export async function updateBookStatus({ token, action, bookId }) {
  try {
    const response = await fetch(`${API_URL}/books/${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ action }),
    });

    if (!response.ok) {
      throw new Error(`Failed to ${action} book`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed ${action}`, error);
    throw error;
  }
}
export async function deleteReservation({ token, reservationId }) {
  try {
    const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete reservation");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting reservation", error);
    throw error;
  }
}
