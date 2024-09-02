const QRCode = require('qrcode');

const generateQRCode = async (req, res) => {
    try {
        const menuUrl = `${process.env.BASE_URL}/api/menu`;
        const qrCodeImage = await QRCode.toDataURL(menuUrl);

        res.status(200).json({
            success: true,
            qrCodeImage, 
            menuUrl    
        });
    } catch (error) {
        console.error('Error generating QR code:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = {
    generateQRCode
};
