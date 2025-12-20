const API_URL = "http://localhost:3000";

/* ---------- USERS ---------- */

async function fetchUsers() {
    const res = await fetch(`${API_URL}/fetch-users`);
    const result = await res.json();

    const userList = document.getElementById("userList");
    userList.innerHTML = "";

    result.data.forEach(user => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${user.name} (${user.email})
            <button onclick="deleteUser('${user._id}')">Delete</button>
        `;
        userList.appendChild(li);
    });
}

async function deleteUser(id) {
    await fetch(`${API_URL}/delete/${id}`, {
        method: "DELETE"
    });
    fetchUsers();
}

/* ---------- REGISTER ---------- */

const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        document.getElementById("message").innerText = data.message;
        registerForm.reset();
    });
}

/* ---------- BLOGS ---------- */

async function fetchBlogs() {
    const res = await fetch(`${API_URL}/blogs`);
    const result = await res.json();

    const blogList = document.getElementById("blogList");
    blogList.innerHTML = "";

    result.blog.forEach(blog => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${blog.title}</strong><br/>
            ${blog.subtitle}<br/>
            ${blog.description}
            <button onclick="deleteBlog('${blog._id}')">Delete</button>
        `;
        blogList.appendChild(li);
    });
}

async function deleteBlog(id) {
    await fetch(`${API_URL}/blogs/delete/${id}`, {
        method: "DELETE"
    });
    fetchBlogs();
}

const blogForm = document.getElementById("blogForm");
if (blogForm) {
    blogForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const subtitle = document.getElementById("subtitle").value;
        const description = document.getElementById("description").value;

        await fetch(`${API_URL}/create-blog`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, subtitle, description })
        });

        blogForm.reset();
        fetchBlogs();
    });
}
