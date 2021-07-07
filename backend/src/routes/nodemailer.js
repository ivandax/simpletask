const getVerificationEmail = (from, to, link) => ({
    from,
    to,
    subject: 'Testing Email Verification',
    text: `To verify your Simpletask Account, please follow this link: ${link}`,
    html: `<h3>Simpletask</h3><p>To verify your Simpletask Data, please follow this <a href="${link}">Link</a></p>`,
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
