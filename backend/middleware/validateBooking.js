export function validateBooking(req,res,next){
    const {nama, telepon, tamu, tanggal} = req.body;

    if(!nama || !telepon || !tamu || tanggal){
        return res.status(400).json({
            message:"Kolom Belum Lengkap"
        });
    };

    next();
}