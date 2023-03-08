import nodemailer from 'nodemailer';

export default function(newUser,verifiedCode,type) {
    const transporter = nodemailer.createTransport({
        service:'Gmail',
        auth: {
            user: 'wibulordweeped@gmail.com',
            pass: 'erylqwdwddfsiimp'
        }
    })

    if (type === 'register'){   
        const mailOption = {
            from: 'Wibu Lord',
            to: newUser,
            subject: 'Verified email',
            text: 'This is your verified code: '+ verifiedCode +' .Enjoy your time in the It Blogger'
        }

        transporter.sendMail(mailOption,function(err,info){
            if(err) console.log(err)
            console.log('Message sent !')
        })
    }


    if (type === 'forgetPass'){
        const mailOption = {
            from: 'Wibu Lord',
            to: newUser,
            subject: 'Reset password code',
            text: 'This is your new verified code: '+ verifiedCode +' .'
        }
    
        transporter.sendMail(mailOption,function(err,info){
            if(err) console.log(err)
            console.log('Message sent !')
        })
    }
}