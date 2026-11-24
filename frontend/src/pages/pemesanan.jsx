import {useState} from 'react'
import FormKalkulator from '../components/FormKalkulator'
import FormBooking from '../components/FormBooking'
import EstimasiBiaya from '../components/EstimasiBiaya'
import BlueCircle from '../components/BlueCircle';

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
            <BlueCircle vertikal={"top-20"} horizontal={"left-1"} size={55} mdsize={80} />
            <FormKalkulator data={data} setData={setData} />
            <BlueCircle vertikal={"-bottom-3"} horizontal={"right-1"} size={55} mdsize={80} />
            <EstimasiBiaya data={data} gunakanEstimasi={gunakanEstimasi} />
            <BlueCircle vertikal={"-bottom-170"} horizontal={"left-1"} size={55} mdsize={80} />
            <FormBooking booking={booking} setBooking={setBooking} />
            <BlueCircle vertikal={"-bottom-270"} horizontal={"right-1"} size={55} mdsize={80} />
        </>
    )

}