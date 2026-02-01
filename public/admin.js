// public/admin.js

document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/admin/users")
    .then(response => response.json())
    .then(data => {
      const tbody = document.querySelector("#usersTable tbody");
      tbody.innerHTML = ""; // tabloyu temizle

      data.users.forEach(user => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${user.id || "-"}</td>
          <td>${user.name || "-"}</td>
          <td>${user.surname || "-"}</td>
          <td>${user.email || "-"}</td>
          <td>${user.role || "-"}</td>
          <td><button class="delete-btn" data-id="${user.id}">Sil</button></td>
        `;

        tbody.appendChild(row);
      });

      // Silme butonlarına event listener ekle
      document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", async () => {
          const userId = button.getAttribute("data-id");
          if (confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) {
            const res = await fetch(`/api/admin/users/${userId}`, {
              method: "DELETE",
            });

            const result = await res.json();
            alert(result.message);
            location.reload(); // sayfayı yenile
          }
        });
      });
    })
    .catch(error => {
      console.error("Kullanıcıları alırken hata:", error);
    });
});
