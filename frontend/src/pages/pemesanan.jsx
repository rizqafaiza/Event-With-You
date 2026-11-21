import {useState} from 'react'
import FormKalkulator from '../components/FormKalkulator'
import FormBooking from '../components/FormBooking'
import EstimasiBiaya from '../components/EstimasiBiaya'

export default function Pemesanan(){
    const [data, setData] = useState({
        jenis:"Pernikahan",
        tingkat:"Basic",
        tamu:"50",
        tambahan:[]
    });

    const [booking, setBooking] = useState({
        nama:"",
        telepon:"",
        jenis:"",
        tingkat:"",
        tamu:"50",
        tanggal:"",
        tambahan:[],
        note:""
    });

    function gunakanEstimasi(){
        setBooking({
            ...booking,
            jenis: data.jenis,
            tingkat: data.tingkat,
            tamu: data.tamu,
            tambahan: data.tambahan
        });
    }

    return(
        <>
            <FormKalkulator data={data} setData={setData} />
            <EstimasiBiaya data={data} gunakanEstimasi={gunakanEstimasi} />
            <FormBooking booking={booking} setBooking={setBooking} />
        </>
    )

}