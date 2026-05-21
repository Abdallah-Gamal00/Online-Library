document.addEventListener("DOMContentLoaded", () => {
  const bookItems = document.querySelectorAll(".book-item");

  function showBookDetails(bookElement) {
    // Get book details from the HTML
    const title = bookElement.querySelector(".book-info h3")?.textContent || "";
    // The first p in .book-info is the author
    const author = bookElement.querySelector(".book-info p:not(.book-availability)")?.textContent.replace("By ", "") || "";
    // .book-category is a span
    const category = bookElement.querySelector(".book-category")?.textContent || "";
    // .book-availability is a p
    const availability = bookElement.querySelector(".book-availability")?.textContent.trim() || "";
    const image = bookElement.querySelector("img")?.src || "";

    // Debug: log what we get
    console.log({ title, author, category, availability, image });

    const isArabic = /[\u0600-\u06FF]/.test(title);

    const modal = document.createElement("div");
    modal.className = "book-modal";

    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-body">
          <img src="${image}" alt="${title}" class="modal-image" />
          <div class="modal-details" ${isArabic ? 'lang="ar"' : ""}>
            <h2>${title || "No title"}</h2>
            <p><strong>${isArabic ? "المؤلف:" : "Author:"}</strong> ${author || "No author"}</p>
            <p><strong>${isArabic ? "التصنيف:" : "Category:"}</strong> ${category || "No category"}</p>
            <p><strong>${isArabic ? "التوفر:" : "Availability:"}</strong> ${availability || "No availability"}</p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }

  bookItems.forEach(bookItem => {
    bookItem.addEventListener("click", () => {
      showBookDetails(bookItem);
    });
  });
});