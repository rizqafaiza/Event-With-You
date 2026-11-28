export default function FormKalkulator({data, setData}){

    function handleChange(e){
        if(e.target.type==="checkbox"){
            setData({
                ...data, tambahan:e.target.checked ? 
                [...data.tambahan, e.target.value] : data.tambahan.filter(item => item!==e.target.value)
            })

        } else {
            setData({
                ...data, [e.target.name]:e.target.value
            });
        }
    }

    return(
        <>
            <h2 className="text-3xl font-bold text-center mb-px">Kalkulator Estimasi Biaya</h2>
            <form className='bg-[#ffffff] rounded-3xl relative z-1 w-3/4 mx-auto p-10 shadow-xl mb-5'>
                <p className="w-full font-bold">1. Jenis Acara</p>
                <select 
                    name="jenis"
                    value={data.jenis}
                    onChange={handleChange}
                    className='bg-[#f3f3f3] w-full border-2 border-[#808080] rounded-md'
                >
                    <option value="Pernikahan">Pernikahan</option>
                    <option value="Ulang Tahun">Ulang Tahun</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Perusahaan">Perusahaan</option>
                </select>

                <p class="w-full font-bold">2. Tingkat Paket</p>
                <select 
                    name="tingkat"
                    value={data.tingkat}
                    onChange={handleChange}
                    className='bg-[#f3f3f3] w-full border-2 border-[#808080] rounded-md'
                >
                    <option value="Basic">Basic</option>
                    <option value="Premium">Premium</option>
                    <option value="Exclusive">Exclusive</option>
                </select>

                <div className="flex gap-10 wrap flex-col lg:flex-row md:gap-10 md:w-full lg:gap-20">
                    <div>
                        <p className="font-bold">3. Jumlah Tamu Undangan</p>
                        <input 
                            type="number"
                            id="calc-tamu" 
                            min={50}
                            step={10}
                            name="tamu" 
                            value={data.tamu}
                            onChange={handleChange}
                            className="bg-[#f3f3f3] border-2 border-[#808080] rounded-xl px-1 md:px-5 py-3 w-4/5 md:w-4/5 box-border"/>
                    </div>
                    <div className="w-full lg:w-3/5">
                        <p className="font-bold">4. Layanan Tambahan (opsional)</p>
                        <div className="bg-[#f3f3f3] border-2 border-[#808080] rounded-xl px-8 py-3 w-full flex 
                            flex-col md:flex-row wrap gap-3 lg:gap-8 mb-2">
                            <input type="checkbox" 
                                name="tambahan" 
                                value="upgrade-catering"
                                checked={data.tambahan.includes("upgrade-catering")}
                                onChange={handleChange} />Upgrade Catering Buffet Premium
                            <p className="font-bold">+Rp85.000 / tamu</p>
                        </div>

                        <div className="bg-[#f3f3f3] border-2 border-[#808080] rounded-xl px-8 py-3 w-full flex 
                            flex-col md:flex-row wrap gap-3 lg:gap-8 mb-2">
                            <input 
                                type="checkbox" 
                                name="tambahan" 
                                value="live-music"
                                checked={data.tambahan.includes("live-music")}
                                onChange={handleChange} />Live Music Band & DJ Performance
                            <p className="font-bold">+Rp7.500.000</p>
                        </div>

                        <div className="bg-[#f3f3f3] border-2 border-[#808080] rounded-xl px-8 py-3 w-full flex 
                            flex-col md:flex-row wrap gap-3 lg:gap-8">
                            <input 
                                type="checkbox" 
                                name="tambahan" 
                                value="drone"
                                checked={data.tambahan.includes("drone")}
                                onChange={handleChange} />Dokumentasi Drone Aerial 4K
                            <p className="font-bold">+Rp3.500.000</p>
                        </div>

                    </div>
                </div>
            </form>
        </>
    )
}