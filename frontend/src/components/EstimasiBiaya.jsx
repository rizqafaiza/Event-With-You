export default function EstimasiBiaya({data, gunakanEstimasi}){
    const harga = {
        paket: {
            Basic : {dasar: 15_000_000, pertamu: 50_000},
            Premium : {dasar: 30_000_000, pertamu: 75_000},
            Exclusive: {dasar: 50_000_000, pertamu: 100_000},
        },

        tambahan: {
            'upgrade-catering': { pertamu: true, price: 85_000 },
            'live-music': { pertamu: false, price: 7_500_000 },
            drone: { pertamu: false, price: 3_500_000 },
        }
    }

    function harga_tambahan(){
        let totalTambahan=0;

        data.tambahan.forEach((e) => {
            const item = harga.tambahan[e];
            totalTambahan+= item.pertamu ? item.price * data.tamu : item.price
        });

        return totalTambahan;
    }

    function hitung(){
        const paket = harga.paket[data.tingkat];
        const biayaTamu = paket.pertamu * data.tamu;

        const total = paket.dasar + biayaTamu + harga_tambahan();

        return total;
    }

    const biaya_tamu = harga.paket[data.tingkat].pertamu * data.tamu;

    return(
        <>
            <h2 className="text-3xl font-bold text-center">Estimasi Biaya</h2>

            <div className="w-full h-150 relative p-px lg:p-5">
                <div className="bg-[#ffffff] rounded-3xl relative z-1 w-3/4 mx-auto p-10 shadow-xl">
                    <h3 className="font-bold text-2xl">Total Estimasi Anggaran</h3>
                    <p className="font-bold flex justify-between">
                    <span id="out-paket-label">Paket {data.tingkat}</span>
                    <span id="out-paket">Rp {harga.paket[data.tingkat].dasar.toLocaleString('id-ID')}</span>
                    </p>

                    <br/>

                    <p className="font-bold flex justify-between">
                    <span id="out-tamu-label">Biaya Tamu ({data.tamu} x Rp {harga.paket[data.tingkat].pertamu})</span>
                    <span id="out-tamu">Rp {biaya_tamu.toLocaleString('id-ID')}</span>
                    </p>

                    <br/>

                    <p className="font-bold flex justify-between">
                    <span>Total Tambahan</span>
                    <span id="out-tambahan">Rp {harga_tambahan().toLocaleString('id-ID')}</span>
                    </p>

                    <hr className="border-2"/>

                    <h3 className="font-bold text-xl md:text-2xl">Perkiraan Biaya Keseluruhan:</h3>
                    <p id="out-total" className="font-bold text-2xl md:text-3xl">Rp {hitung().toLocaleString('id-ID')}</p>

                    <div className="flex justify-center">
                        <button className="font-bold bg-[#aeb9c4] rounded-2xl py-3 px-7 md:px-20 lg:px-60 mt-3">Gunakan Hasil Estimasi Ini</button>
                    </div>
                </div>

            </div>
        </>
    )
}