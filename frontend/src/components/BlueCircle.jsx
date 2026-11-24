export default function BlueCircle({vertikal, horizontal, size, mdsize}){
    return (
        <div className={`bg-[#aeb9c4] rounded-full absolute ${horizontal} ${vertikal} size-${size} md:size-${mdsize} z-0`}>
        </div>
    )
}

// cara pakai function ini:
// <BlueCircle vertikal={"top/bottom-angka"} horizontal={"left/right-angka"} size={angka} mdsize={angka} indeks={angka} />