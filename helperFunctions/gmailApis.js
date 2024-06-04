const apiBaseUrl = "https://gmail.googleapis.com";
const backendServiceUrl = "https://serveimage.onrender.com";
// const backendServiceUrl = "https://localhost:5000";
let userId = "me";

async function sendEmail(targetEmail, token, uniqueId, urls) {
  let accessToken = token;
  console.log(urls);

  // forming the http request for gmail api call
  let requestHeader = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const emailContent =
    `From: sayonil.m@mobiusdtaas.ai
To: ${targetEmail}
Subject: Test Email with Tracking Pixel
MIME-Version: 1.0
Content-Type: text/html; charset=UTF-8

<!DOCTYPE html>
<html>
  <body>
    <p>This is a test email.</p>` +
    (urls.length > 0
      ? urls?.map((url) => {
          return `<div>
            <a href="${backendServiceUrl}/record_click/${uniqueId}/${encodeURIComponent(
            url
          )}">${url}</a>
        </div>`;
        })
      : "") +
    `<img src="${backendServiceUrl}/email_opened/${encodeURIComponent(
      uniqueId
    )}/${encodeURIComponent(targetEmail)}" style="opacity:0;"></img>
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
