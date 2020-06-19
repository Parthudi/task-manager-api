const sgmail = require('@sendgrid/mail')

sgmail.setApiKey(process.env.SENDGRID_API_KEY)

const sendingWelcomeMail = (email, name) => {
    
  sgmail.send({
    to: email,
    from: 'parth.170410116046@gmail.com',
    subject: 'welcome to our application',
    text:  'welcome Mr/Mrs ' +name+ ' to our app let us know if u have any query regarding our application'

  })
}

const sendingRemoveMail = (email, name) => {

    sgmail.send({
        to: email,
        from: 'parth.170410116046@gmail.com',
        subject: 'Account deleted',
        text: 'Mr/Mrs ' + name + ' any reason for deleting account??? '
    })
}

module.exports = {
    sendingWelcomeMail,
    sendingRemoveMail
}

/*sgmail.send({
    to: 'parmarparth597@gmail.com',
    from: 'parth.170410116046@gmail.com',
    subject: 'my first mail',
    text: 'this is my first mail hope u get this well'
})*/