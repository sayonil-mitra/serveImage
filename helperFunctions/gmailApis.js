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
  const extraTextContent = `<div>Hi KL,</div><div>Hope you are doing well.</div><div>Please find below the&nbsp;<b>XPX &amp; MIAs End of Sprint Update.</b><br><b>Sprint Dates</b>&nbsp;: 13th May - 17th May 2024</div><div><br></div><div><u style="font-weight:bold;font-style:italic">XPX</u><br><br><b>Voxa</b><br><br><ul><li>Create a JSON server for storing and updating stub data for XPX</li><li>Update all variables, functions to fetch and reflect stub data from the new JSON server</li><li>Optimize campaigns, tasks, prebuilt templates, and workspace schemas with uniquely generated IDs</li><li>Update List View channels to sync data with the JSON server</li><li>Implement global components for a calendar range picker and a calendar month picker</li><li>Implement a global custom navigator for the range-picker and day-picker</li><li>Implement global helper functions to sync data and maintain flow across different Voxa flows</li><li>Optimize Voxa's build and fix routing issues</li><li>Remove unused routes, components, and packages for faster load times</li><li>Reconfigure Vite setup to optimize packages and peer dependencies during build time.</li><li>Address chart and CSS issues in Voxa's calendar view and task view</li></ul><b><br></b></div><div><b>Moscribe</b><br><br><ul><li>CSS fixes in invoice flow pages and invoice product pages and adjusting styles in the generate-invoice pop up to match figma</li><li>Integrated generate invoice, invoice preview, and send invoice modals into Moscribe</li><li>Styles fixes in end user account settings flow, team management page and product page</li><li>Identify and update CSS issues throughout the revenue flow to ensure consistent styling and layout</li><li>Integrate a re-usable card component for use across the Moscribe's components</li><li>Styles fixes in&nbsp;the subscription flow, including the subscription page and&nbsp;invoice flow</li><li>Update component styles in the account details page, billing page</li><li>Implement a product page within the end user-account settings flow</li><li>Update and enhance the graphs displaying retention rates in the Moscribe dashboard<br></li></ul><div><u><i><b>MIAs</b></i></u></div></div><div><u><i><b><br></b></i></u></div><div>Multi-language support confluence:</div><div><a href="https://gaiansolutions.atlassian.net/wiki/spaces/MIA/pages/2292678662/MIAs+Multi+Language+Support" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://gaiansolutions.atlassian.net/wiki/spaces/MIA/pages/2292678662/MIAs%2BMulti%2BLanguage%2BSupport&amp;source=gmail&amp;ust=1717850876369000&amp;usg=AOvVaw0jlTuxYF3-RYVDmKMjDMFR">https://gaiansolutions.<wbr>atlassian.net/wiki/spaces/MIA/<wbr>pages/2292678662/MIAs+Multi+<wbr>Language+Support</a><br><ul><li><b>iZAK</b>: Implemented multi-language support using i18next (1 screen in spaces is pending)</li><li><b>Museo</b>: Implemented multi-language support using i18next for both static and dynamic data.</li><li><b>Revee</b>: Completed multi-language support implementation and resolved font issues.</li><li><b>Amplyfund</b>: Implemented multi-language support using i18next (Profile flow is pending)</li><li><b>Aegis</b>: Completed multi-language support and bug fixes for NOC, First-Responders, and Civilians flows.</li><li><b>HearHere</b>: Implemented multi-language support across the app and completed spike for bubble taps for event selection.</li><li><b>GoFema</b>: Integrated multi-language support throughout the app for static and dynamic data.</li><li><b>MO</b>: Implemented multi-language support across the app.</li><li><b>CLink </b>: Added multi-language support &amp; working on the new figma design</li><li><b>Around </b>: Multi-language support for entire app static &amp; dynamic data</li></ul></div>`
  const emailContent =
    `From: sayonil.m@mobiusdtaas.ai
To: ${targetEmail}
Cc: chakka.e@mobiusdtaas.ai,mohammad.r@mobiusdtaas.ai
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
        uniqueId
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
