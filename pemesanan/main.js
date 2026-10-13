import './pemesanan.css'

const MIN_TAMU = 50
 
const HARGA = {
  paket: {
    Basic: { dasar: 15_000_000, perTamu: 50_000 },
    Premium: { dasar: 30_000_000, perTamu: 75_000 },
    Exclusive: { dasar: 50_000_000, perTamu: 100_000 },
  },
  tambahan: {
    'upgrade-catering': { perTamu: true, harga: 85_000 },
    'live-music': { perTamu: false, harga: 7_500_000 },
    drone: { perTamu: false, harga: 3_500_000 },
  },
}
 
const JENIS_DARI_URL = {
  wedding: 'Pernikahan',
  birthday: 'Ulang Tahun',
  seminar: 'Seminar',
  corporate: 'Korporat',
}
 
const $ = (id) => document.getElementById(id)
const rupiah = (n) => 'Rp ' + n.toLocaleString('id-ID')
 
function bersihkanTamu(nilai) {
  const n = parseInt(nilai, 10)
  return Number.isNaN(n) || n < MIN_TAMU ? MIN_TAMU : n
}
 
const calcJenis = $('calc-jenis')
const calcTamu = $('calc-tamu')
const tombolPaket = document.querySelectorAll('[data-paket]')
const cekTambahan = document.querySelectorAll('input[name="tambahan"]')
 
const formPesanan = $('form-pesanan')
const fJenis = $('jenis')
const fPaket = $('paket')
const fTamu = $('tamu')
const fTelepon = $('telepon')
const fTanggal = $('tanggal')
 
const state = { paket: 'Basic', tamu: MIN_TAMU }
 
function hitung() {
  const paket = HARGA.paket[state.paket]
  const biayaTamu = state.tamu * paket.perTamu
 
  let totalTambahan = 0
  cekTambahan.forEach((cek) => {
    if (!cek.checked) return
    const item = HARGA.tambahan[cek.value]
    if (!item) return
    totalTambahan += item.perTamu ? item.harga * state.tamu : item.harga
  })
 
  const total = paket.dasar + biayaTamu + totalTambahan
 
  $('out-paket-label').textContent = `Paket ${state.paket}`
  $('out-paket').textContent = rupiah(paket.dasar)
  $('out-tamu-label').textContent = `Biaya Tamu (${state.tamu} x ${rupiah(paket.perTamu)})`
  $('out-tamu').textContent = rupiah(biayaTamu)
  $('out-tambahan').textContent = rupiah(totalTambahan)
  $('out-total').textContent = rupiah(total)
 
  return total
}
 
function tampilkanPaketAktif() {
  tombolPaket.forEach((tombol) => {
    const aktif = tombol.dataset.paket === state.paket
    tombol.classList.toggle('bg-[#c8d1d9]', aktif)
    tombol.classList.toggle('bg-[#f3f3f3]', !aktif)
    tombol.classList.toggle('ring-2', aktif)
    tombol.classList.toggle('ring-[#1c1c24]', aktif)
    tombol.setAttribute('aria-pressed', String(aktif))
  })
}
 
function setPaket(nama) {
  if (!HARGA.paket[nama]) return
  state.paket = nama
  if (fPaket) fPaket.value = nama
  tampilkanPaketAktif()
  hitung()
}
 
function setTamu(n) {
  state.tamu = n
  if (calcTamu) calcTamu.value = n
  if (fTamu) fTamu.value = n
  hitung()
}
 
function sinkronKePesanan() {
  if (fJenis && calcJenis) fJenis.value = calcJenis.value
  if (fPaket) fPaket.value = state.paket
  if (fTamu) fTamu.value = state.tamu
}
 
calcJenis?.addEventListener('change', () => {
  if (fJenis) fJenis.value = calcJenis.value
})
 
tombolPaket.forEach((tombol) => {
  tombol.addEventListener('click', () => setPaket(tombol.dataset.paket))
})
 
calcTamu?.addEventListener('input', () => {
  const n = parseInt(calcTamu.value, 10)
  if (n >= MIN_TAMU) setTamu(n)
})
calcTamu?.addEventListener('change', () => setTamu(bersihkanTamu(calcTamu.value)))
 
cekTambahan.forEach((cek) => cek.addEventListener('change', hitung))
 
fJenis?.addEventListener('change', () => {
  if (calcJenis) calcJenis.value = fJenis.value
})
 
fPaket?.addEventListener('change', () => setPaket(fPaket.value))
 
fTamu?.addEventListener('input', () => {
  const n = parseInt(fTamu.value, 10)
  if (n >= MIN_TAMU) {
    state.tamu = n
    if (calcTamu) calcTamu.value = n
    hitung()
  }
})
fTamu?.addEventListener('change', () => setTamu(bersihkanTamu(fTamu.value)))
 
fTelepon?.addEventListener('input', () => {
  const nomor = fTelepon.value.replace(/[\s-]/g, '')
  const valid = /^(\+?62|0)\d{8,13}$/.test(nomor)
  fTelepon.setCustomValidity(valid ? '' : 'Masukkan nomor telepon yang valid, contoh: 081234567890')
})
 
if (fTanggal) {
  const sekarang = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
  fTanggal.min = sekarang.toISOString().slice(0, 16)
}
 
const status = document.createElement('p')
status.setAttribute('role', 'status')
status.className = 'mt-6 text-center font-bold'
formPesanan?.appendChild(status)
 
formPesanan?.addEventListener('submit', (e) => {
  e.preventDefault()
 
  const data = {
    nama: $('nama').value.trim(),
    jenis: fJenis.value,
    telepon: fTelepon.value.trim(),
    tamu: state.tamu,
    tanggal: fTanggal.value,
    paket: state.paket,
    pesan: $('pesan').value.trim(),
    tambahan: [...cekTambahan].filter((c) => c.checked).map((c) => c.value),
    estimasi: hitung(),
  }
 
  console.log('Pesanan baru:', data)
 
  status.textContent =
    `Terima kasih, ${data.nama}! Permintaan pesanan ${data.jenis} paket ${data.paket} ` +
    `untuk ${data.tamu} tamu sudah kami terima (estimasi ${rupiah(data.estimasi)}). ` +
    `Tim kami akan menghubungi ${data.telepon}.`
 
  formPesanan.reset()
  sinkronKePesanan()
  status.scrollIntoView({ behavior: 'smooth', block: 'center' })
})
 
const jenisUrl = JENIS_DARI_URL[new URLSearchParams(location.search).get('jenis')]
if (jenisUrl && calcJenis) calcJenis.value = jenisUrl
 
sinkronKePesanan()
setPaket(state.paket)
