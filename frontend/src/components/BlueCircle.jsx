export default function BlueCircle({bottom, left, size, mdsize}){
    return (
        <div className={`bg-[#aeb9c4] rounded-full absolute left-${left} bottom-${bottom} size-${size} md:size-${mdsize}`}>
        </div>
    )
}

// cara pakai function ini:
// <BlueCircle bottom={angka} left={angka} size={angka} mdsize={angka} />