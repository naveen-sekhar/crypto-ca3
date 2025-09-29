# SHA-2 Family Hash Generator & Verifier

A comprehensive web-based tool for generating and verifying hashes using the SHA-2 family of cryptographic hash functions (SHA-224, SHA-256, SHA-384, SHA-512).

## 🚀 Features

### Hash Generation
- **Single Hash Generation**: Generate hash for any text using your chosen SHA-2 algorithm
- **Batch Hash Generation**: Generate all SHA-2 family hashes at once for comparison
- **Real-time Processing**: Instant hash generation using browser's native Web Crypto API

### Hash Verification
- **Hash Verification**: Verify if a given text matches a provided hash
- **Format Validation**: Automatic validation of hash format and length
- **Visual Feedback**: Clear success/failure indicators with detailed messages

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Copy to Clipboard**: One-click copying of generated hashes
- **Keyboard Shortcuts**: Ctrl+Enter to execute functions in focused textarea
- **Auto-resize**: Textareas automatically adjust to content size

## 📋 Supported Algorithms

| Algorithm | Output Length | Hex Characters | Use Case |
|-----------|---------------|----------------|----------|
| SHA-224   | 224 bits      | 56 chars       | Constrained environments |
| SHA-256   | 256 bits      | 64 chars       | General purpose (most common) |
| SHA-384   | 384 bits      | 96 chars       | High security applications |
| SHA-512   | 512 bits      | 128 chars      | Maximum security |

## 🛠️ Usage

### Running the Website

1. **Local Usage**:
   ```
   Simply open `index.html` in any modern web browser
   ```

2. **Local Server** (recommended for development):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

### Hash Generation
1. Enter your text in the "Hash Generator" section
2. Select your desired SHA algorithm (SHA-224, SHA-256, SHA-384, or SHA-512)
3. Click "Generate Hash" or press Ctrl+Enter
4. Copy the generated hash using the "Copy Hash" button

### Hash Verification
1. Enter the original text in the "Hash Verifier" section
2. Paste the hash you want to verify
3. Select the same algorithm that was used to generate the hash
4. Click "Verify Hash" or press Ctrl+Enter
5. View the verification result with visual feedback

### Batch Generation
1. Enter your text in the "Batch Hash Generator" section
2. Click "Generate All SHA-2 Hashes"
3. View all four SHA-2 family hashes generated simultaneously

## 🔒 Security Notes

### Important: Hash Functions vs Encryption

SHA-2 algorithms are **cryptographic hash functions**, not encryption algorithms:

- **One-way function**: Cannot be "decrypted" or reversed
- **Deterministic**: Same input always produces same output
- **Fixed output size**: Each algorithm always produces the same length output
- **Avalanche effect**: Small input changes create drastically different outputs

### Use Cases
- **Data Integrity**: Verify files haven't been modified
- **Password Storage**: Store password hashes (with salt)
- **Digital Signatures**: Part of signature algorithms
- **Blockchain**: Mining and block verification
- **Checksums**: Verify downloaded files

### Security Considerations
- **No Encryption**: Hashes cannot be reversed to get original data
- **Not for Passwords Alone**: Use proper password hashing with salt (bcrypt, scrypt, Argon2)
- **Collision Resistance**: Practically impossible to find two inputs with same hash
- **Browser Security**: Uses native Web Crypto API for secure processing

## 🌐 Browser Compatibility

This tool uses the Web Crypto API which is supported in:
- ✅ Chrome 37+
- ✅ Firefox 34+
- ✅ Safari 7+
- ✅ Edge 79+
- ✅ Opera 24+

## 📁 File Structure

```
CA-3/
├── index.html          # Main HTML file with UI structure
├── styles.css          # CSS styling and responsive design
├── script.js          # JavaScript functionality and crypto operations
└── README.md          # This documentation file
```

## 🎯 Educational Value

This project demonstrates:
- **Cryptographic Concepts**: Understanding hash functions and their properties
- **Web Crypto API**: Modern browser cryptography implementation
- **Security Principles**: Difference between hashing and encryption
- **Responsive Web Design**: Mobile-first CSS design
- **User Experience**: Interactive feedback and validation
- **JavaScript Async/Await**: Modern JavaScript patterns

## 🚀 Sample Usage Examples

### Example 1: Basic Hash Generation
```
Input: "Hello, World!"
SHA-256 Output: a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3
```

### Example 2: Verification
```
Original Text: "password123"
SHA-256 Hash: ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f
Result: ✅ Hash verification successful!
```

### Example 3: Batch Generation
Input text generates all four SHA-2 hashes simultaneously for comparison.

## 🔧 Customization

### Adding New Algorithms
To add new hash algorithms (if supported by Web Crypto API):

1. Update the algorithm options in `index.html`
2. Add algorithm to the validation function in `script.js`
3. Update the info section with algorithm details

### Styling Modifications
- Modify `styles.css` for visual changes
- CSS Grid and Flexbox used for responsive layout
- CSS variables can be added for easy theme customization

## 📚 Learning Resources

- [Web Crypto API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [SHA-2 Algorithm Details](https://en.wikipedia.org/wiki/SHA-2)
- [Cryptographic Hash Functions](https://en.wikipedia.org/wiki/Cryptographic_hash_function)
- [NIST SHA-2 Standard](https://csrc.nist.gov/publications/detail/fips/180/4/final)

## ⚠️ Disclaimer

This tool is for educational purposes and demonstrates cryptographic concepts. For production applications involving sensitive data, always:
- Use established cryptographic libraries
- Implement proper security practices
- Consider additional security measures (salt, pepper, key derivation functions)
- Follow current security standards and best practices

## 🤝 Contributing

Feel free to contribute improvements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

**Created for Cryptography CA-3 Assignment**  
*Educational demonstration of SHA-2 family hash functions*