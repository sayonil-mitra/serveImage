const { google } = require("googleapis");
const dotenv = require("dotenv");
var jwt = require("jsonwebtoken");

// Load environment variables from .env file
dotenv.config();

// Initialize the OAuth2 client with the credentials from the environment variables
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET
);

// Set the refresh token
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

// Function to get a new access token using the refresh token
async function getAccessToken() {
  try {
    // Refresh the access token
    const { credentials } = await oauth2Client.refreshAccessToken();
    return credentials.access_token;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
}

// Function to check if the current access token is expired and get a new one if necessary
async function ensureAccessToken() {
  // Check if the current access token is set and not expired
  const currentToken = oauth2Client.credentials.access_token;
  const expiryDate = oauth2Client.credentials.expiry_date;

  if (!currentToken || (expiryDate && expiryDate <= Date.now())) {
    // Get a new access token if the current one is expired or not set
    const newAccessToken = await getAccessToken();
    oauth2Client.setCredentials({
      access_token: newAccessToken,
    });
  }
  return oauth2Client.credentials.access_token;
}

// encrypt oauth token with jwt before sending it to front end
async function encryptToken() {
  let token = await ensureAccessToken();
  let encryptedToken = jwt.sign(token, process.env.JWT_SALT);
  return encryptedToken;
}

module.exports = { encryptToken };
