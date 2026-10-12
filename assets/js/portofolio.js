const tombolMenu = document.querySelector(".menu-toggle");
const navigasi = document.querySelector(".navigasi");

if (tombolMenu && navigasi) {
    tombolMenu.addEventListener("click", function () {
        navigasi.classList.toggle("buka");
    });
}

const tombolFilter = document.querySelectorAll(".filter button");
const semuaFoto = document.querySelectorAll(".foto");
const semuaKategori = document.querySelectorAll(".kategori");

tombolFilter.forEach(function (tombol) {
    tombol.addEventListener("click", function () {
        tombolFilter.forEach(function (item) {
            item.classList.remove("aktif");
        });

        tombol.classList.add("aktif");

        const pilihan = tombol.dataset.filter;

        semuaFoto.forEach(function (foto) {
            const cocok =
                pilihan === "semua" ||
                foto.dataset.kategori === pilihan;

            foto.classList.toggle("sembunyi", !cocok);
        });

        semuaKategori.forEach(function (kategori) {
            const adaFoto = Array.from(
                kategori.querySelectorAll(".foto")
            ).some(function (foto) {
                return !foto.classList.contains("sembunyi");
            });

            kategori.style.display = adaFoto ? "block" : "none";
        });
    });
});

const lightbox = document.getElementById("lightbox");
const fotoBesar = document.getElementById("foto-besar");
const tombolTutup = document.querySelector(".tutup");

semuaFoto.forEach(function (foto) {
    foto.addEventListener("click", function () {
        const gambar = foto.querySelector("img");

        fotoBesar.src = gambar.src;
        fotoBesar.alt = gambar.alt;

        lightbox.classList.add("buka");
        lightbox.setAttribute("aria-hidden", "false");
    });
});

function tutupFoto() {
    lightbox.classList.remove("buka");
    lightbox.setAttribute("aria-hidden", "true");
    fotoBesar.src = "";
}

tombolTutup.addEventListener("click", tutupFoto);

lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        tutupFoto();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        tutupFoto();
    }
});
