const apiBaseUrl = "https://gmail.googleapis.com";
const backendServiceUrl = "https://serveimage.onrender.com";
let userId = "me";

async function sendEmail(targetEmail, token, uniqueId, urls) {
  let accessToken = token;
  console.log("Request for sending email received for unique id: ", uniqueId);

  // forming the http request for gmail api call
  let requestHeader = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  // =========== content for email ===================
  const extraTextContent = "<p>test Content</p>"
  const emailContent =
    `From: sayonil.m@mobiusdtaas.ai
To: ${targetEmail}
Cc: chakka.e@mobiusdtaas.ai
Subject: XPX & MIAs - End of Sprint Update (3 Jun - 7 Jun 2024)
MIME-Version: 1.0
Content-Type: text/html; charset=UTF-8

<!DOCTYPE html>
<html>
  <body>
    <div>
    ${extraTextContent}
    </div>
    <img src="${backendServiceUrl}/email_opened/${encodeURIComponent(
      'ABCDEFGH'
    )}" style="opacity:0;"></img>
  </body>
</html>`;



  const base64EncodedEmail = btoa(unescape(encodeURIComponent(emailContent)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  let requestBody = JSON.stringify({ raw: base64EncodedEmail });

  let res = await fetch(
    `${apiBaseUrl}/gmail/v1/users/${userId}/messages/send`,
    {
      method: "POST",
      headers: requestHeader,
      body: requestBody,
    }
  );
  let jsonResponse = await res.json();
  return {
    status: res.status,
    resJson: jsonResponse,
  };
}

async function checkEmailOpen() {
  let res = await fetch(`${backendServiceUrl}/check/open`);
  let jsonResponse = await res.json();
  return jsonResponse;
}

module.exports = { sendEmail, checkEmailOpen };
