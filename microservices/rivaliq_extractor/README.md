# RivalIQ Media Extractor

A modern Streamlit-based web application for extracting and processing media content from RivalIQ CSV/Excel files. The application features a clean, user-friendly interface specifically designed to work with social media analytics data from RivalIQ.

## 🌟 Features

- **RivalIQ File Processing**
  - Process CSV/Excel files exported from RivalIQ
  - Extract images and videos from social media posts
  - Automatic download of media content from URLs
  - Audio extraction from videos for additional analysis
  - Duplicate entry detection and removal

- **Modern Interface**
  - Clean and responsive design
  - Post type visualization
  - Detailed results summary
  - Modern download button with visual feedback

- **File Management**
  - Directory structure organized by media type
  - Automatic file naming
  - Results bundled in ZIP format
  - Comprehensive Excel report without unnecessary columns

## 📋 Requirements

- Python 3.7+
- FFmpeg (included in the FFMPEG folder)
- Required Python packages (see requirements.txt)

## 🚀 Installation

1. Clone or download this repository
2. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```
3. FFmpeg Setup (Automatic):
   - The application includes FFmpeg in the FFMPEG folder
   - Both ffmpeg.exe and ffprobe.exe should be present
   - No manual configuration needed in most cases

## 💻 Usage

1. Launch the Application:
   ```bash
   streamlit run app.py
   ```

2. Prepare Input File:
   - Export data from RivalIQ in CSV or Excel format
   - Required columns:
     - `post_link`: URL for video content
     - `image`: URL for image content
     - `post_type`: Content type ("video", "reel", "image", "photo", "link")

3. Process Files:
   - Upload your CSV/Excel file
   - Review file information and post types
   - Click "Process File"
   - Download results when processing is complete

## 📁 File Structure

The application creates the following directory structure:
```
filename_media/
├── media/
│   ├── images/      # Downloaded images (.jpg)
│   ├── videos/      # Downloaded videos (.mp4)
│   └── audio/       # Extracted audio (.mp3)
└── results.xlsx     # Processing report
```

## 📊 Processing Report

The results.xlsx file includes:
- Original file data
- Download status for each entry
- Paths to downloaded media files
- Audio extraction results

## 🎯 Status Tracking

Media and Audio Status Types:
- ✅ success: Successfully processed
- ❌ failed: Processing error
- ⏳ pending: Awaiting processing
- ⏭️ skipped: Not applicable (e.g., audio for images)

## 🛠️ Technical Features

### FFmpeg Integration
- Automatic configuration
- Path verification
- Format conversion support
- High-quality audio extraction

### Media Processing
- Efficient video downloads (yt-dlp)
- Optimized image downloads
- Audio stream detection in videos
- Handling of various social media formats

### User Interface
- Modern, responsive design
- Clear visualization of post types
- Styled download buttons
- Detailed results summary

## ⚠️ Error Handling

Robust error handling for:
- FFmpeg configuration issues
- Network connectivity problems
- Invalid media URLs
- File system operations
- Format conversion errors

## 🔍 Troubleshooting

Common Solutions:

1. FFmpeg Issues:
   - Verify FFMPEG folder contents
   - Check file permissions
   - Try manual path configuration

2. Download Problems:
   - Check URL accessibility
   - Verify network connection
   - Validate URL format

3. Audio Extraction:
   - Confirm video has audio
   - Check available space
   - Verify FFmpeg setup

## 🤝 Contributing

Contributions are welcome. You can:
- Report issues
- Suggest improvements
- Submit pull requests
- Share ideas for new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details. 