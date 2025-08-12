fetch("/items")
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById("items-container");
        container.innerHTML = data.map(item => `
            <div class="item-card">
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p><strong>Price:</strong> $${item.price}</p>
                <p><strong>Phone:</strong> ${item.phone}</p>
            </div>
        `).join("");
    });
