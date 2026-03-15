import { getUser, getUserCount } from "../../modules/api/getData.js"

const loader = document.getElementById("loader");
const userSearch = document.getElementById('txtsearch');
let allUsers = [];

async function initUsers() {
    await userManagement()
    loader.style.display = "none";
}

function dateUser(sec, nano) {
    const seconds = sec ?? 0;
    const nanoseconds = nano ?? 0;

    const milliseconds = seconds * 1000 + nanoseconds / 1_000_000;
    const date = new Date(milliseconds);

    const options = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,  
    };

    const formattedDate = date.toLocaleString('en-US', options);

    return formattedDate

}

function searchUsers() {
    const val = userSearch.value.toLowerCase().trim();

    const filteredUser = allUsers.filter(user => 
        user.name.toLowerCase().includes(val) ||
        user.email.toLowerCase().includes(val) ||
        user.role.toLowerCase().includes(val)
    );
    
    renderUser(filteredUser, filteredUser.length)
}

function renderUser(users, userCount) {
    const tableUser = document.getElementById('table-user');
    const userRow = users.length ? users.map((user, index) => {
        return `
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${dateUser(user.createdAt?.seconds, user.createdAt?.nanoseconds)}</td>
                <td class="actions">
                    <button class="update">Update</button>
                    <button type="button" class="delete">Delete</button>
                </td>
            </tr>     
        `;
    }).join("") : `
        <tr class="countTotal">
            <td colspan="6">No User Found.</td>
        </tr>`;

    tableUser.innerHTML = `
        <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined At</th>
            <th>Actions</th>
        </tr>
        ${userRow}
        <tr class="countTotal">
            <td>Total Users</td>
            <td colspan="4"></td>
            <td>${userCount}</td>
        </tr>
    `;
}

async function userManagement() {
    const userCount = await getUserCount();
    allUsers = await getUser();

    renderUser(allUsers, userCount)
   
}

userSearch.addEventListener('input', searchUsers); 
document.addEventListener('DOMContentLoaded', () => {
    initUsers()
});

