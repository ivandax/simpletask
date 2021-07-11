const domain = 'http://localhost:3000/';

const getVerificationEmail = (from, to, link) => ({
    from,
    to,
    subject: 'SimpleTask: Verify your email',
    text: `To verify your Simpletask Account, please follow this link: ${link}`,
    html: `<h3>Simpletask</h3><<p>To verify your Simpletask account, please follow this <a href="${domain}verify?ref=${link}&email=${to}">Link</a></p>`,
});

const getPasswordRecoveryEmail = (from, to, link) => ({
    from,
    to,
    subject: 'Simpletask: Password reset',
    text: `To create a new password, please follow this link: ${link}`,
    html: `<h3>Simpletask</h3><<p>To create a new password, please follow this link <a href="${domain}new-password?ref=${link}&email=${to}">Link</a></p>`,
});

const getNodemailerOptions = (host, user, password) => ({
    host,
    port: 587,
    secure: false,
    auth: {
        user,
        pass: password,
    },
});

module.exports.getVerificationEmail = getVerificationEmail;
module.exports.getNodemailerOptions = getNodemailerOptions;
module.exports.getPasswordRecoveryEmail = getPasswordRecoveryEmail;
