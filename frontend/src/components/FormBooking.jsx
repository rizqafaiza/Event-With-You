export default function FormBooking({booking, setBooking}){
    function handleChange(e){
        if(e.target.type === "checkbox"){
            setBooking({
                ...booking, tambahan: e.target.checked ?
                [...booking.tambahan, e.target.value] : booking.tambahan.filter(item => item !== e.target.value)
            });
        } else {
            setBooking({
                ...booking, [e.target.name]:e.target.value
            });
        }
    }

    return(
        <>
            <h2 className="text-3xl font-bold text-center">Buat Pesanan</h2>
        
        <form action="" id="form-pesanan" 
            className="bg-[#ffffff] rounded-3xl relative z-1 w-3/4 mx-auto p-3 md:p-10 lg:p-10 shadow-xl">
          <div className="flex flex-wrap gap-5 lg:gap-10 w-full justify-center">
            <div className="flex flex-col w-full md:w-100">
              <label htmlFor="nama" className="font-bold">Nama Lengkap*</label>
              <input 
                type="text" 
                name="nama" 
                value={booking.nama}
                onChange={handleChange}
                required 
                placeholder="Nama Lengkap" 
                id="nama" 
              className="bg-[#f3f3f3] border-2 border-[#808080] rounded-lg h-10 w-full lg:w-100"/>
            </div>

            <div className="flex flex-col w-full md:w-100">
              <label htmlFor="jenis" className="font-bold">Jenis Acara*</label>
              <select 
                name="jenis" 
                id="jenis"
                value={booking.jenis}
                onChange={handleChange} 
                className="bg-[#f3f3f3] h-10 w-full lg:w-100 border-2 border-[#808080] rounded-md" 
                required>
              <option value="Pernikahan">Pernikahan</option>
              <option value="Ulang Tahun">Ulang Tahun</option>
              <option value="Seminar">Seminar</option>
              <option value="Korporat">Korporat</option>
            </select>
          </div>

          <div className="flex flex-col w-full md:w-100">
            <label htmlFor="telepon" className="font-bold">Nomor Telepon*</label>
            <input 
                type="tel" 
                name="telepon"
                value={booking.telepon}
                onChange={handleChange}
                id="telepon" 
                required 
                placeholder="Nomor Telepon"
                pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"
                className="bg-[#f3f3f3] h-10 w-full lg:w-100 border-2 border-[#808080] rounded-md"/>
          </div>

          <div className="flex flex-col w-full md:w-100">
            <label htmlFor="tamu" className="font-bold">Jumlah Tamu*</label>
            <input 
                type="number" 
                name="tamu" 
                min={50} 
                step={10} 
                value={booking.tamu} 
                onChange={handleChange}
                required 
                placeholder="Jumlah Tamu" 
                id="tamu"
                className="bg-[#f3f3f3] h-10 w-full md:w-100 border-2 border-[#808080] rounded-md"/>
          </div>

          <div className="flex flex-col w-full md:w-100">
            <label htmlFor="tanggal" className="font-bold">Tanggal Acara*</label>
            <input 
                type="datetime-local" 
                name="tanggal"
                value={booking.tanggal}
                onChange={handleChange}
                id="tanggal" 
                required 
                placeholder="Tanggal Acara" 
                className="bg-[#f3f3f3] h-10 w-full lg:w-100 border-2 border-[#808080] rounded-md"/>
          </div>

          <div className="flex flex-col w-full md:w-100">
            <label htmlFor="paket" className="font-bold">Pilihan Paket Layanan*</label>
            <select 
                name="tingkat" 
                value={booking.tingkat}
                onChange={handleChange}
                id="paket" 
                required 
                className="bg-[#f3f3f3] h-10 w-full lg:w-100 border-2 border-[#808080] rounded-md">
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Exclusive">Exclusive</option>
            </select>
          </div>
          </div>

          <div className="w-full p-5 lg:p-20">
            <label htmlFor="pesan" className="font-bold">Catatan/Pesan Khusus</label>
            <textarea 
                name="note" 
                value={booking.note}
                onChange={handleChange}
                id="pesan" 
                rows="4" 
                className="bg-[#f3f3f3] h-30 w-full border-2 border-[#808080] rounded-md"></textarea>
          </div>

          <div className="flex justify-center">
            <button type="submit" className="w-4/5 h-10 bg-[#c8d1d9] rounded-xl shadow-xl font-bold">
              Kirim Permintaan Pesanan</button>
          </div>
        </form>
        </>
    )
}