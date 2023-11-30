const userinput = document.getElementById("username");
const button = document.getElementById("get-details");
const repos = document.getElementById("repoInfo");

button.addEventListener("click", async () => {
    const username = userinput.value;
    const res = await fetch(`https://api.github.com/users/${username}`);
    const output = await res.json();
    displayProfile(output);
    getRepo(username);
});

function displayProfile(data) {
    const profileInfoDiv = document.getElementById("profileInfo");

    profileInfoDiv.innerHTML = `
        <div class="card">
            <div class="card-img">
                <img src=${data.avatar_url} alt=${data.name}>
            </div>
            <div class="card-body">
                <div class="card-head">${data.name}</div>
                <div class="card-subhead">${data.login}</div>
                <div class="cardtxt">
                    <p>${data.bio}</p>
                    <p><i class="fa-solid fa-user-group;"></i> ${data.followers} Followers ${data.following} Following</p>
                    <p><i class="fa-solid fa-location-dot;"></i> ${data.location}</p>
                    <button class="align">
                        <a href=${data.html_url} target="_blank">Visit Profile</a>
                    </button>
                </div>
            </div>
        </div>`;
}

async function getRepo(username) {
    const repo = await fetch(`https://api.github.com/users/${username}/repos`);
    const projects = await repo.json();

    for (let i = 0; i < projects.length; i++) {
        const projectDiv = document.createElement("div");
        projectDiv.className = "pro";
        projectDiv.innerHTML = `
            <div class="card-body cb">
                <div class="card-title one">${projects[i].name}</div>
                <div class="card-subhead two">${projects[i].language}</div>
                <div class="cardtxt">
                    <button>
                        <a href=${projects[i].html_url} target="_blank">Visit Project</a>
                    </button>
                </div>
            </div>`;
        repos.appendChild(projectDiv);
    }
}
