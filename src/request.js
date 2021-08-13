const fetch = require('node-fetch');

async function Request({domainURL, type, headers}) {
    let request = await fetch(`https://${domainURL}/api/${type}`, { headers: headers });
    let json = await request.json();
    return json;
}

module.exports = { Request };