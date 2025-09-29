// SHA-2 Hash Generator and Verifier

// Helper function to convert string to array buffer
function stringToArrayBuffer(str) {
    const encoder = new TextEncoder();
    return encoder.encode(str);
}

// Helper function to convert array buffer to hex string
function arrayBufferToHex(buffer) {
    const hashArray = Array.from(new Uint8Array(buffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

// Generate hash using specified algorithm
async function generateSingleHash(text, algorithm) {
    try {
        const data = stringToArrayBuffer(text);
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        return arrayBufferToHex(hashBuffer);
    } catch (error) {
        console.error('Error generating hash:', error);
        throw new Error(`Failed to generate ${algorithm} hash`);
    }
}

// Main hash generation function
async function generateHash() {
    const inputText = document.getElementById('inputText').value;
    const hashOutput = document.getElementById('hashOutput');
    
    if (!inputText.trim()) {
        alert('Please enter some text to hash');
        return;
    }
    
    // Get selected algorithm
    const selectedAlgorithm = document.querySelector('input[name="algorithm"]:checked').value;
    
    try {
        // Show loading state
        hashOutput.value = 'Generating hash...';
        
        const hash = await generateSingleHash(inputText, selectedAlgorithm);
        hashOutput.value = hash;
        
        // Add success animation
        hashOutput.style.backgroundColor = '#c6f6d5';
        setTimeout(() => {
            hashOutput.style.backgroundColor = '#f7fafc';
        }, 1000);
        
    } catch (error) {
        hashOutput.value = 'Error: ' + error.message;
        hashOutput.style.backgroundColor = '#fed7d7';
        setTimeout(() => {
            hashOutput.style.backgroundColor = '#f7fafc';
        }, 2000);
    }
}

// Verify hash function
async function verifyHash() {
    const verifyText = document.getElementById('verifyText').value;
    const verifyHashInput = document.getElementById('verifyHash').value;
    const verifyResult = document.getElementById('verifyResult');
    
    if (!verifyText.trim() || !verifyHashInput.trim()) {
        alert('Please enter both the original text and the hash to verify');
        return;
    }
    
    // Get selected algorithm for verification
    const selectedAlgorithm = document.querySelector('input[name="verifyAlgorithm"]:checked').value;
    
    try {
        // Show loading state
        verifyResult.innerHTML = '<div class="loading"></div>Verifying hash...';
        verifyResult.className = 'verify-result show';
        
        const generatedHash = await generateSingleHash(verifyText, selectedAlgorithm);
        const inputHash = verifyHashInput.trim().toLowerCase();
        const isMatch = generatedHash.toLowerCase() === inputHash;
        
        if (isMatch) {
            verifyResult.innerHTML = `
                <div style="font-size: 24px; margin-bottom: 10px;">✅</div>
                <div>Hash verification successful!</div>
                <div style="font-size: 12px; margin-top: 5px; opacity: 0.8;">The text matches the provided ${selectedAlgorithm} hash.</div>
            `;
            verifyResult.className = 'verify-result success show';
        } else {
            verifyResult.innerHTML = `
                <div style="font-size: 24px; margin-bottom: 10px;">❌</div>
                <div>Hash verification failed!</div>
                <div style="font-size: 12px; margin-top: 5px; opacity: 0.8;">The text does not match the provided ${selectedAlgorithm} hash.</div>
                <div style="font-size: 11px; margin-top: 10px; word-break: break-all;">
                    <strong>Expected:</strong> ${inputHash}<br>
                    <strong>Generated:</strong> ${generatedHash}
                </div>
            `;
            verifyResult.className = 'verify-result error show';
        }
        
    } catch (error) {
        verifyResult.innerHTML = `
            <div style="font-size: 24px; margin-bottom: 10px;">⚠️</div>
            <div>Verification error</div>
            <div style="font-size: 12px; margin-top: 5px; opacity: 0.8;">${error.message}</div>
        `;
        verifyResult.className = 'verify-result error show';
    }
}

// Generate all SHA-2 hashes
async function generateAllHashes() {
    const batchText = document.getElementById('batchText').value;
    const batchResults = document.getElementById('batchResults');
    
    if (!batchText.trim()) {
        alert('Please enter some text to generate hashes');
        return;
    }
    
    const algorithms = ['SHA-224', 'SHA-256', 'SHA-384', 'SHA-512'];
    
    try {
        // Show loading state
        batchResults.innerHTML = '<div class="loading"></div>Generating all hashes...';
        
        let resultsHTML = '';
        
        for (const algorithm of algorithms) {
            try {
                const hash = await generateSingleHash(batchText, algorithm);
                resultsHTML += `
                    <div class="hash-result">
                        <h4>${algorithm}</h4>
                        <div class="hash-value">${hash}</div>
                    </div>
                `;
            } catch (error) {
                resultsHTML += `
                    <div class="hash-result">
                        <h4>${algorithm}</h4>
                        <div class="hash-value" style="color: #e53e3e;">Error: ${error.message}</div>
                    </div>
                `;
            }
        }
        
        batchResults.innerHTML = resultsHTML;
        
    } catch (error) {
        batchResults.innerHTML = `
            <div class="hash-result">
                <h4>Error</h4>
                <div class="hash-value" style="color: #e53e3e;">Failed to generate hashes: ${error.message}</div>
            </div>
        `;
    }
}

// Copy to clipboard function
async function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.value;
    
    if (!text.trim()) {
        alert('Nothing to copy');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(text);
        
        // Show feedback
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.backgroundColor = '#38a169';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '#48bb78';
        }, 1500);
        
    } catch (error) {
        // Fallback for older browsers
        element.select();
        element.setSelectionRange(0, 99999);
        
        try {
            document.execCommand('copy');
            
            const button = event.target;
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.style.backgroundColor = '#38a169';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '#48bb78';
            }, 1500);
            
        } catch (fallbackError) {
            alert('Failed to copy to clipboard. Please select and copy manually.');
        }
    }
}

// Add event listeners for Enter key
document.addEventListener('DOMContentLoaded', function() {
    // Hash generator enter key
    document.getElementById('inputText').addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'Enter') {
            generateHash();
        }
    });
    
    // Hash verifier enter key
    document.getElementById('verifyText').addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'Enter') {
            verifyHash();
        }
    });
    
    document.getElementById('verifyHash').addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'Enter') {
            verifyHash();
        }
    });
    
    // Batch generator enter key
    document.getElementById('batchText').addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'Enter') {
            generateAllHashes();
        }
    });
    
    // Auto-resize textareas
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });
});

// Utility function to format hash for better readability
function formatHash(hash, chunkSize = 8) {
    return hash.match(new RegExp(`.{1,${chunkSize}}`, 'g')).join(' ');
}

// Function to validate hash format
function validateHashFormat(hash, algorithm) {
    const expectedLengths = {
        'SHA-224': 56,
        'SHA-256': 64,
        'SHA-384': 96,
        'SHA-512': 128
    };
    
    const cleanHash = hash.replace(/\s/g, '').toLowerCase();
    const expectedLength = expectedLengths[algorithm];
    
    if (cleanHash.length !== expectedLength) {
        return {
            valid: false,
            message: `Invalid hash length. Expected ${expectedLength} characters for ${algorithm}, got ${cleanHash.length}.`
        };
    }
    
    if (!/^[a-f0-9]+$/.test(cleanHash)) {
        return {
            valid: false,
            message: 'Hash contains invalid characters. Only hexadecimal characters (0-9, a-f) are allowed.'
        };
    }
    
    return { valid: true };
}

// Enhanced verify function with validation
async function verifyHashEnhanced() {
    const verifyText = document.getElementById('verifyText').value;
    const verifyHashInput = document.getElementById('verifyHash').value;
    const verifyResult = document.getElementById('verifyResult');
    const selectedAlgorithm = document.querySelector('input[name="verifyAlgorithm"]:checked').value;
    
    if (!verifyText.trim() || !verifyHashInput.trim()) {
        alert('Please enter both the original text and the hash to verify');
        return;
    }
    
    // Validate hash format first
    const validation = validateHashFormat(verifyHashInput, selectedAlgorithm);
    if (!validation.valid) {
        verifyResult.innerHTML = `
            <div style="font-size: 24px; margin-bottom: 10px;">⚠️</div>
            <div>Invalid hash format</div>
            <div style="font-size: 12px; margin-top: 5px; opacity: 0.8;">${validation.message}</div>
        `;
        verifyResult.className = 'verify-result error show';
        return;
    }
    
    // Proceed with normal verification
    await verifyHash();
}

// Add sample data function for testing
function loadSampleData() {
    const sampleText = "Hello, World! This is a sample text for SHA-2 hashing.";
    
    // Load sample text in all input fields
    document.getElementById('inputText').value = sampleText;
    document.getElementById('verifyText').value = sampleText;
    document.getElementById('batchText').value = sampleText;
    
    // Generate sample hash for verification demo
    generateSingleHash(sampleText, 'SHA-256').then(hash => {
        document.getElementById('verifyHash').value = hash;
    });
}

// Console helper for developers
console.log(`
🔐 SHA-2 Hash Generator & Verifier
=================================

Available functions:
- generateHash() - Generate hash for input text
- verifyHash() - Verify hash against original text  
- generateAllHashes() - Generate all SHA-2 family hashes
- loadSampleData() - Load sample data for testing

Keyboard shortcuts:
- Ctrl+Enter - Execute the respective function in focused textarea

Supported algorithms: SHA-224, SHA-256, SHA-384, SHA-512
`);