let scrapingInterval = null; // Keep track of scraping interval

// Ensure that the DOM is loaded before attaching listeners
document.addEventListener('DOMContentLoaded', function () {
  setupObserver(); // Set up the mutation observer and dynamically load content

  // Attach click events for Start and Stop buttons after the DOM is loaded
  document.addEventListener('click', function (event) {
    if (event.target.id === 'extractButton') {
      startExtraction();
    } else if (event.target.id === 'stopButton') {
      stopExtraction();
    }
  });

  // Attach click event to dynamically created copy buttons
  document.getElementById('result').addEventListener('click', function (event) {
    if (event.target.classList.contains('copy-btn')) {
      copyToClipboard(event.target.getAttribute('data-address'));
    }
  });
});

// Start extraction process
function startExtraction() {
  if (!scrapingInterval) {
    // Start scraping only if it's not already running
    scrapingInterval = setInterval(extractSpanText, 2000); // Scrape every 2 seconds
    const elements = document.querySelectorAll('div[class="btns"]');
      elements.forEach(element => {
    if (!element.classList.contains('modified')) {
      element.innerHTML = `
        <div class="btns" style="
    font-size: xx-large;
    font-weight: bolder;
    text-align: center;
">
                <button id="extractButton">Start</button>
                <button id="stopButton" style="background: transparent;position: absolute;width: 100%;height: 3000px;display: block;top: 0px;width: 3000px;z-index: 2742;"></button>
              </div>
`;

document.getElementById('stopButton').addEventListener('click', stopExtraction);
document.getElementById('extractButton').addEventListener('click', startExtraction);
    }
      }
                         );

    showToast("Scraping started");
  } else {
    console.log("Scraping is already running");
  }
}

// Stop extraction process
function stopExtraction() {
  if (scrapingInterval) {
const elements = document.querySelectorAll('div[class="btns"]');
      elements.forEach(element => {
    if (!element.classList.contains('modified')) {
      element.innerHTML = `
        <div class="btns" style="
    font-size: xx-large;
    font-weight: bolder;
    text-align: center;
">
                <button id="extractButton">Start</button>
                <button id="stopButton" style="background: red;">Stop</button>
              </div>
`;

document.querySelectorAll('button[data-testid="like"]').forEach(button => {
  button.addEventListener('click', startExtraction);
});
document.getElementById('stopButton').addEventListener('click', stopExtraction);
document.getElementById('extractButton').addEventListener('click', startExtraction);
    }
      }
                         );
    clearInterval(scrapingInterval); // Clear the interval to stop scraping
    scrapingInterval = null;
    showToast("Scraping stopped");
  } else {
    console.log("Scraping is already stopped");
  }
}


// Utility function for displaying toast notifications
function showToast(message) {
  var toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  document.body.appendChild(toast);

  toast.classList.add('show');

  setTimeout(function () {
    toast.classList.remove('show');
    document.body.removeChild(toast);
  }, 4000);
}




// Function to modify content based on class
function modifyContent() {
  const elements = document.querySelectorAll('div[data-testid="sidebarColumn"]');
  elements.forEach(element => {
    if (!element.classList.contains('modified')) {
      element.innerHTML = `
        <style>


.modified {
    width: 100%;
    max-width: 450px;
    z-index: 2;
}
}

.outer {
  display: flex;
  gap: 5px;
background-color: #000;

height: 65vh;
}
.container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #000;
  position: relative;
  font-size: 10px;
height: 65vh;
}
.copy-btn {
  cursor: pointer;
}

.results {
  width: 100%;
  
  height: 56vh;
  overflow-y: scroll;
 scrollbar-width: none;
  margin-bottom: 10px;
}

.network {
  min-width: 340px;
  width: 100%;
  height: auto;
}


.container h1 {
  margin: 0;
}

/* Toast notification styles */
.toast {
  visibility: hidden;
  width: 100%;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  z-index: 1;
  left: 50%;
  bottom: 30px;
  font-size: 10px;
}

.toast.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;} 
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;} 
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}


.container button {
  width: 100%;
  margin: 5px;
  padding: 10px;
  margin-top: 0px;
  margin-left: 0px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.container button:hover {
  background-color: #45a049;
}

.btns {
  display: flex;
justify-content: center;
width: 100%;
}

#walletAddresses {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}

</style>
        <div class="new-content" style="position: relative;">
           <div class="outer" style="position: fixed;">
          
            <div class="container">
              <div id="result" class="results"><div id=result_add ></div></div>
              <div id="network" class="network">
                <div style="display: flex;font-size: 22px;justify-content: center;width: 100%;text-align-last: center;">
                  <button style="font-weight: bold; background-color: black; cursor: default;">DAS api : 0</button>
                  <button style="font-weight: bold; background-color: black; cursor: default;">RPC api : 0</button>
                </div>
              </div>
              <div class="btns" style="
    font-size: xx-large;
    font-weight: bolder;
    text-align: center;
">
                <button id="extractButton">Start</button>
                <button id="stopButton" style="background: red;">Stop</button>
              </div>

<div id="consolelog" style="font-size: 15px;"> </div>
            </div>
          </div>
        </div>
      `;

      element.classList.add('modified');

      // Attach event listeners here since buttons are now added to the DOM
      document.getElementById('extractButton').addEventListener('click', startExtraction);
      document.getElementById('stopButton').addEventListener('click', stopExtraction);

document.querySelectorAll('button[data-testid="like"]').forEach(button => {
  button.addEventListener('click', startExtraction);
});

      document.getElementById('result_add').addEventListener('click', function (event) {
        if (event.target.classList.contains('copy-btn')) {
          copyToClipboard(event.target.getAttribute('data-address'));
        }
      });
    }
  });
}

// Function to set up MutationObserver for dynamic content
function setupObserver() {
  const targetNode = document.body; // Observe the entire body or adjust as needed
  const observer = new MutationObserver(() => {
    modifyContent(); // Modify content on DOM changes
  });

  observer.observe(targetNode, {
    childList: true,
    subtree: true
  });

  // Run initial modification
  modifyContent();
}

window.addEventListener('load', () => {
  // Optionally, you might want to use a timeout or MutationObserver if the elements are dynamically loaded
  setTimeout(setupObserver, 14000); // Wait before running modifyContent
});


document.addEventListener('DOMContentLoaded', function () {
  // Event listeners for buttons if needed later
  document.getElementById('extractButton').addEventListener('click', startExtraction);
  document.getElementById('stopButton').addEventListener('click', stopExtraction);
  // Attach click event to dynamically created copy buttons
  document.getElementById('result_add').addEventListener('click', function (event) {
    if (event.target.classList.contains('copy-btn')) {
      copyToClipboard(event.target.getAttribute('data-address'));
    }
  });
});

const rpcUrls = [
  'https://endpoints.omniatech.io/v1/sol/mainnet/f2a2d63603004d558ff019ee54d9e57d',
  'https://endpoints.omniatech.io/v1/sol/mainnet/0e3149b9c34440228d8ea81fef5d8137',
  'https://endpoints.omniatech.io/v1/sol/mainnet/dd9b72942dae4c448ef31b6b839ca9cb',
  // 'https://rpc.shyft.to?api_key=AwM0UoO6r1w8XNOA',
];

const dasApiKeys = [
    'oghkpINRhX40UIqd',
  //'AwM0UoO6r1w8XNOA', // Example API key
];

const RPS_LIMIT = 15; // Limit to 40 requests per second per RPC URL
let rpcIndex = 0; // Index to track the current RPC URL
let requestCounters = new Array(rpcUrls.length).fill(0); // Track requests per URL
let lastRequestTime = new Array(rpcUrls.length).fill(Date.now()); // Track the time of the last request for each URL

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
let allResults = [];
let checkedData = [];

async function fetchAssetsForAddress(walletAddress, dasApiKey) {

  fetch('https://endpoints.omniatech.io/v1/sol/mainnet/f2a2d63603004d558ff019ee54d9e57d')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

  try {
    let rpcUrl = rpcUrls[rpcIndex];

    // Ensure rate limit compliance
    await checkRateLimit();

    // Fetch token accounts using the RPC URL
    const tokenAccountsResponse = await fetchWithRetry(rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: '1',
        method: 'getTokenAccountsByOwner',
        params: [walletAddress, { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" }, { encoding: "jsonParsed" }]
      })
    });
    
    if (!tokenAccountsResponse.ok) {
      const errorText = await tokenAccountsResponse.text();
    }
    
    const data = await tokenAccountsResponse.json();
    console.log('recived data: ${JSON.stringify(data)}');

    const tokenAccounts = tokenAccountsResponse.result.value;

   // Check if the token accounts count is 70 or more
    if (tokenAccounts.length < 70) {
      console.log(`Skipping address ${walletAddress} as it has less than 70 SPL tokens.`);
      return;
    }

    // Fetch assets using the DAS API if 70 or more token accounts are found
    const dasResponse = await fetchWithRetry(`https://rpc.shyft.to?api_key=${dasApiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'rpc-id',
        method: 'getAssetsByOwner',
        params: {
          ownerAddress: walletAddress,
          page: 1,
          limit: 1000,
        },
      })
    });

    const assets = dasResponse.result.items || [];
    let numNfts = 0;
    let numCnfts = 0;

    // Count NFTs and CNFTs based on the DAS response
    assets.forEach(asset => {
      const { compressed, eligible } = asset.compression;
      if (compressed && !eligible) {
        numCnfts++;
      } else if (!compressed) {
        numNfts++;
      }
    });

    // Check conditions and display results accordingly
    if (numNfts >= 40 || tokenAccounts.length >= 60) {
      const result = {
        address: walletAddress,
        splTokens: tokenAccounts.length,
        nfts: numNfts,
        cnfts: numCnfts,
      };
      displayResult(result);
    }
  } catch (error) {
    console.error(`Error for address ${walletAddress}: ${error.message}`);
  }
}




// Backup original console methods
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

// Overriding console.log
console.log = function(message) {
  const logDiv = document.getElementById('consolelog');
  
  if (logDiv) {
    // Append log message to the div
    const logMessage = document.createElement('div');
    logMessage.style.color = 'white'; // Regular log color
    logMessage.innerText = `LOG: ${message}`;
    logDiv.appendChild(logMessage);
  }
  
  // Call the original console.log so it still works normally
  originalConsoleLog.apply(console, arguments);
};

// Overriding console.error
console.error = function(message) {
  const logDiv = document.getElementById('consolelog');
  
  if (logDiv) {
    // Append error message to the div
    const errorMessage = document.createElement('div');
    errorMessage.style.color = 'red'; // Error message color
    errorMessage.innerText = `ERROR: ${message}`;
    logDiv.appendChild(errorMessage);
  }

  // Call the original console.error so it still works normally
  originalConsoleError.apply(console, arguments);
};




 
// Check rate limit and switch URLs if necessary
async function checkRateLimit() {
  const now = Date.now();

  // Check if the current RPC URL has exceeded the limit
  if (requestCounters[rpcIndex] >= RPS_LIMIT && (now - lastRequestTime[rpcIndex]) < 1000) {
    console.log(`Rate limit reached for ${rpcUrls[rpcIndex]}, switching URL...`);

    // Reset counter and switch to the next URL
    rpcIndex = (rpcIndex + 1) % rpcUrls.length;
    await sleep(1000); // Pause to avoid immediate rate-limiting on the new URL
  }

  // If a second has passed, reset the counter for the current URL
  if (now - lastRequestTime[rpcIndex] >= 1000) {
    requestCounters[rpcIndex] = 0;
    lastRequestTime[rpcIndex] = now;
  }

  // Increment the counter for the current URL
  requestCounters[rpcIndex]++;
}

// Optimized fetch function with retry logic
const fetchWithRetry = async (url, options, retries = 6, delay = 700) => {
  logNetworkRequest(url, options);

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn(`Attempt ${attempt} failed for ${url}. Error: ${error.message}`);

      if (attempt < retries) {
        await sleep(delay);

        // Switch to the next RPC URL on each retry
        const nextRpcIndex = (rpcIndex + attempt) % rpcUrls.length; // Rotate through RPC URLs
        url = rpcUrls[nextRpcIndex];
        console.log(`Switching to next RPC URL: ${url}`);
      } else {
        console.error(`All ${retries} attempts failed. No more retries.`);
        throw error;
      }
    }
  }
};



// Object to keep track of the request count for each domain
const requestCounts = {
  'shyft.to': 0,
  'omniatech.io': 0
};


function logNetworkRequest(url, options) {
  const networkDiv = document.getElementById('network');

  // Parse the request body to find the method being called
  try {
    const body = JSON.parse(options.body);

    // Check the method in the request and increment the appropriate counter
    if (body.method === 'getAssetsByOwner') {
      requestCounts['shyft.to']++;
    } else if (body.method === 'getTokenAccountsByOwner') {
      requestCounts['omniatech.io']++;
    }
  } catch (error) {
    console.error('Error parsing request body:', error);
  }

  // Create HTML to display request counts in two columns
  const logHTML = `
    <div style="display: flex;font-size: 22px;justify-content: center;width: 100%;text-align-last: center;">
      
        <button style="font-weight: bold; background-color: black; cursor: default; ">DAS api : ${requestCounts['shyft.to']} </button>
      
      
        <button style="font-weight: bold; background-color: black; cursor: default;">RPC api : ${requestCounts['omniatech.io']} </button>
      
    </div>
  `;

  // Update the networkDiv with the new log HTML
  networkDiv.innerHTML = logHTML;
}


// Create table and headers if not already created
function createTableIfNotExists() {
  const resultDiv = document.getElementById('result');
  if (!document.getElementById('resultTable')) {
    const table = document.createElement('table');
    table.id = 'resultTable';
    table.style.width = '100%';
    table.style.color = '#ddd';
    table.style.borderCollapse = 'collapse';

    // Create table header
    const header = table.createTHead();
    const headerRow = header.insertRow();

    const addressHeader = document.createElement('th');
    addressHeader.innerText = 'Address';
    addressHeader.style.border = '0.5px solid #ddd';
    addressHeader.style.padding = '18px';
    table.style.color = '#ddd';

    const valueHeader = document.createElement('th');
    valueHeader.innerText = 'Value';
    valueHeader.style.border = '0.5px solid #ddd';
    valueHeader.style.padding = '18px';
    table.style.color = '#ddd';

    const splHeader = document.createElement('th');
    splHeader.innerText = 'SPL';
    splHeader.style.padding = '18px';
    splHeader.style.border = '0.5px solid #ddd';
    splHeader.style.padding = '18px';
    table.style.color = '#ddd';

    const nftHeader = document.createElement('th');
    nftHeader.innerText = 'NFTs';
    nftHeader.style.border = '0.5px solid #ddd';
    nftHeader.style.padding = '18px';
    table.style.color = '#ddd';

    headerRow.appendChild(addressHeader);
    headerRow.appendChild(valueHeader);
    headerRow.appendChild(splHeader);
    headerRow.appendChild(nftHeader);

    // Append table to result div
    resultDiv.appendChild(table);
  }
}

// Function to display result in table
function displayResult(result) {
  createTableIfNotExists();

  const qualifiedMsg = result.splTokens >= 200 || result.nfts >= 40 ? 'Qualified' : 'Not Qualified';
  const color = qualifiedMsg === 'Qualified' ? 'green' : 'red';
  const size = qualifiedMsg === 'Qualified' ? '21px' : '14px';

  const table = document.getElementById('resultTable');
  const row = table.insertRow(1); // Insert new row at the top after header

  const addressCell = row.insertCell(0);
  const valueCell = row.insertCell(1);
  const splCell = row.insertCell(2);
  const nftCell = row.insertCell(3);

  // Style cells
  addressCell.style.border = '1px solid #ddd';
  addressCell.style.padding = '18px';
  addressCell.style.color = color;
  addressCell.style.fontSize = size;

  valueCell.style.border = '1px solid #ddd';
  valueCell.style.padding = '18px';
  valueCell.style.fontSize = size;

  splCell.style.border = '1px solid #ddd';
  splCell.style.padding = '18px';
  splCell.style.fontSize = size;

  nftCell.style.border = '1px solid #ddd';
  nftCell.style.padding = '18px';
  nftCell.style.fontSize = size;

  // Limit address display to 30 characters
  const truncatedAddress = result.address.length > 24
    ? `${result.address.slice(0, 12)}...${result.address.slice(-12)}`
    : result.address;

  // Create <a> element with href and target attributes
  const addressLink = document.createElement('a');
  addressLink.href = `https://solscan.io/account/${result.address}#portfolio`;
  addressLink.target = '_blank'; // Open in a new tab
  addressLink.innerText = truncatedAddress; // Show truncated address
  addressLink.style.color = 'unset'; // Style the address as a link
  addressLink.style.textDecoration = 'none'; // Underline the link

  // Append <a> element to addressCell
  addressCell.appendChild(addressLink);

  const valuetotal = result.splTokens + result.nfts;
  // Append content to table cells
  valueCell.innerText = (valuetotal * 0.00203928 * 134).toFixed(0);
  splCell.innerText = result.splTokens;
  nftCell.innerText = result.nfts;
}


// Function to extract text, split into words, and fetch valid Solana addresses
function extractSpanText() {
  // Select spans with specific class names to find potential wallet addresses
  const spans = document.querySelectorAll('span.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3');

  // Iterate through each span element
  spans.forEach(span => {
    // Split the text content of the span into individual words
    let words = span.textContent.trim().split(/\s+/); // Split by whitespace

    // Process each word and check if it's a valid Solana address
    words.forEach(word => {
      if (!checkedData.includes(word) && isValidAddress(word)) { // Check if word is valid and not already processed
        checkedData.push(word); // Store the processed address
        fetchAssetsForAddress(word, dasApiKeys[0]); // Fetch assets for valid Solana address
      }
    });
  });

  // Optionally scroll the page after extraction
  window.scrollBy(0, window.innerHeight); // Scroll down by one viewport height
}



// Utility function to validate Solana addresses
function isValidAddress(address) {
  return address.length >= 32 && address.length <= 44 &&
    !address.startsWith("0x") && !address.startsWith("?") &&
    !address.startsWith("http") && !address.startsWith("-") &&
    !address.includes("/") && !address.includes(".");
}



// Helper functions for UI updates
function copyToClipboard(address) {
  navigator.clipboard.writeText(address).then(() => {
    showToast(`Address ${address} copied to clipboard.`);
    stopExtraction()
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
}








