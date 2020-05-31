const sgMail = require('@sendgrid/mail')




sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//     to: 'apoorva26patni@gmail.com',
//     from: 'rushabhsheta007@gmail.com',
//     subject: 'This is my first Creation!',
//     text: 'I hope this one actually get to you.'
// })

const sendWelcomeMail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rushabhsheta007@gmail.com',
        subject: 'Thanks for joining us!',
        text: `Welcome ${name}.`
    })
} 

module.exports = {
    sendWelcomeMail
}