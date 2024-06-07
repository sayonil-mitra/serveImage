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
  const extraTextContent = `<div>
  <div>
    <span class="im">
      <div>Hi KL,</div>
      <div>Hope you are doing well.</div>
    </span>
    <div>
      <span class="im">Please find below the&nbsp; <b>XPX &amp; MIAs End of Sprint Update.</b>
        <br>
      </span>
      <b>Sprint Dates</b>&nbsp;: 3rd June - 7th June 2024
    </div>
  </div>
  <div>
    <br>
  </div>
  <div>
    <i>
      <b>
        <u>XPX</u>
      </b>
    </i>
  </div>
  <div>
    <i>
      <b>
        <u>
          <br>
        </u>
      </b>
    </i>
  </div>
  <div>
    <b>Voxa</b>
  </div>
  <ul>
    <li>Implementing global card component for use across&nbsp;Voxa and setting up Voxa dashboard to reflect global components</li>
    <li>Implementing Navbar and multi progress bar components as global components</li>
    <li>Connect database with Voxa front end and Gmail APIs to store email engagement metrics</li>
    <li>Update existing backend service routers and models to calculate engagement metrics using queries</li>
    <li>Integration of tabs using global components in the dashboard</li>
  </ul>
  <div>
    <b>ITIL</b>
  </div>
  <div>
    <ul>
      <li>Created the global tab component and created the global modal component with dynamic routing</li>
      <li>Implemented view Status Page Components for Historical Uptime and Incident Details</li>
      <li>Created the nav-bar for the Knowledge Base create article page</li>
      <li>Setting up the status page showing incident history and uptime history of past 90 days</li>
      <li>Created Activity component and integrate into the tab in ITIL/ITSM Incident flow</li>
      <li>Implemented Task tab to show the task under that particular incident and add task under that particular incident</li>
      <li>Implemented Incident Flow - Affected services tab, making of affected services tab page</li>
      <li>Implemented Investigation page showing about investigations</li>
      <li>Implemented Incidents Ticket Details page</li>
      <li>Implemented Incidents page: Create incident, global nav filters component, and all incidents tab component</li>
    </ul>
  </div>
  <div>
    <br>
  </div>
  <div>
    <b>
      <i>
        <u>MIAs</u>
      </i>
    </b>
    <br>
    <br>1. <b>
      <i>Vote IQ</i>
    </b>
    <br>
    <ul>
      <li>Created Demo mode for voter flow and candidate flow <br>
      </li>
      <li>Created multi-language support for the website <br>
      </li>
      <li>Created Detail page for TV screen <br>
      </li>
      <li>Created candidate page for the tv Screen <br>
      </li>
      <li>Created News page for TV screen <br>
      </li>
      <li>Created Discussion Page for TV screen <br>
      </li>
      <li>Spatial navigation and Demo mode in progress for Candidate Flow <br>
      </li>
    </ul>
    <br>2. <b>
      <i>iZAK</i>
    </b>
    <br>
    <ul>
      <li>Developed Version History Model in the Account Flow <br>
      </li>
      <li>Adjusted CSS for add-device, Wallet, History, spaces, device &amp; device cards pages. <br>
      </li>
    </ul>
    <br>3. <b>
      <i>ImpressIO</i>
    </b>
    <br>
    <ul>
      <li>Implementation of home page is done <br>
      </li>
      <li>Canvas design for deploy layouts done <br>
      </li>
      <li>Deploy screen home page is done <br>
      </li>
      <li>Deploy screen layout page including standard and customized both done <br>
      </li>
      <li>Deploy configuration panel for customized layout done <br>
      </li>
    </ul>In the next sprint this is plan to integrate firebase for storing data and implement schedule page. <br>
    <br>4. <b>
      <i>Around</i>
    </b>
    <br>
    <ul>
      <li>Implemented Spatial Navigation In Choose Icon Component of Preference Panel. <br>
      </li>
      <li>Implemented Language Translation For Static Data In Car For Sale and Rental Component. <br>
      </li>
      <li>Created dynamic user preference in My Preferences. <br>
      </li>
      <li>Implemented timer to display duration of user speech. <br>
      </li>
      <li>The marker components wrapped in the leaflet component are displayed in the same position. <br>
      </li>
      <li>Fixed the display of markers when clicked on and at different zoom levels. <br>
      </li>
      <li>Implemented Language Translation for dynamic map center based on query params. <br>
      </li>
      <li>Implemented Multi Language Feature for Static Data of Choose Icon component Of Preference Panel <br>
      </li>
    </ul>
    <br>5. <b>
      <i>Hear.Here</i>
    </b>
    <br>
    <br>
    <ul>
      <li>Implemented the booking ticket functionality. <br>
      </li>
      <li>Implemented the booking history functionality to see previously booked events with filters. <br>
      </li>
      <li>Updated JSON to add pickup and booked events. <br>
      </li>
      <li>Implemented a loader to display while fetching data. <br>
      </li>
      <li>Implemented the audio guide page with dynamic data and added a tooltip component for navigation in the audio guide. <br>
      </li>
      <li>Implemented logic to divide seats into different sections in the ticket component. <br>
      </li>
      <li>Updated the auditorium structure to change color when clicking or selecting the stage. <br>
      </li>
      <li>Made the search bar dynamic to toggle between an arrow and a logo depending on the route. <br>
      </li>
      <li>Implemented an active class in the footer based on the path. <br>
      </li>
    </ul>
    <br>6. <b>
      <i>Aegis</i>
    </b>
    <br>
    <ul>
      <li>Implemented live navigation steps generation for first responders to reach the incident, including turn-by-turn instructions to select the next path or direction, and dynamically change the map center and bearing. <br>
      </li>
    </ul>
    <br>Spike Tasks Aegis <br>
    <ul>
      <li>Implemented live navigation tracking for multiple users in maps &nbsp; &nbsp; <br>
      </li>
      <li>Implemented webRTC to send real time video and audio between users <br>
      </li>
      <li>Implemented sockets in server which stores and gives the positions of users <br>
      </li>
    </ul>
    <br>
    <br>
    <b>
      <i>7. GoFEM</i>
    </b>
    <br>
    <br>
    <ul>
      <li>Fixed bugs in the manage account and switch account flows. <br>
      </li>
      <li>Improved the search functionality for places, users, and incidents using speech-to-text. <br>
      </li>
      <li>Implemented delete functionality based on locations and added other locations <br>
      </li>
    </ul>
    <br>
    <b>
      <i>8. CLink</i>
    </b>
    <br>
    <ul>
      <li>Implemented debouncing for navigation icons in the citizen view. <br>
      </li>
      <li>Updated the map component and markers with map boxing in both the community and citizen views. <br>
      </li>
      <li>Implemented React skeleton loader for all components in the community view. <br>
      </li>
    </ul>
    <br>
    <b>
      <i>9. Amplyfund</i>
    </b>
    <br>
    <ul>
      <li>Developed Manage Causes Page along with multi language support <br>
      </li>
      <li>Implemented a separate JSON server for Amplyfund <br>
      </li>
      <li>Integrated Share Fundraiser screen in Profile <br>
      </li>
      <li>Updated the Demo Mode with the Share Fundraiser and Manage Causes pages</li>
    </ul>
  </div>
</div>`
  const emailContent =
    `From: sayonil.m@mobiusdtaas.ai
To: ${targetEmail}
Cc: chakka.e@mobiusdtaas.ai,kamath.a@mobiusdtaas.ai,manohar.p@mobiusdtaas.ai,pendyala.g@mobiusdtaas.ai,tehra.a@mobiusdtaas.ai
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
