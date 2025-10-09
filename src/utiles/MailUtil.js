const mailer = require("nodemailer")

const sendingMail = async(to,subject,text) => {
    const transpoter = mailer.createTransport({
        service:'gmail',
        auth:{
            user:"patelmuhammad192@gmail.com",
            pass:"mmpq ujon hkws gkkn"
        }
    })

    const mailOption = {
        from:'patelmuhammad192@gmail.com',
        to:to,
        subject:subject,
        html:text
    }
    const mailresponse = await transpoter.sendMail(mailOption);
    console.log(mailresponse);
    return mailresponse;
}
module.exports = {
    sendingMail
}