import streamlit as st
import sys
import os
import json
import time
import tempfile
import zipfile
import configparser
from pathlib import Path
import logging
import base64
from datetime import timedelta
import io
import contextlib
import shutil
import subprocess

import requests
import pandas as pd
import numpy as np
from yt_dlp import YoutubeDL
import re

# -------------------------------------------------------------
# Streamlit Page Config
# -------------------------------------------------------------
st.set_page_config(
    page_title="RivalIQ Media Extractor",
    page_icon="🎬",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# -------------------------------------------------------------
# Custom CSS - Simplified version
# -------------------------------------------------------------
st.markdown("""
<style>
    .main .block-container {
        padding-top: 2rem;
    max-width: 1200px;
}

h1 {
    font-size: 2.5rem !important;
    position: relative;
    padding-bottom: 0.5rem;
}

h1:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 80px;
    height: 4px;
    background-color: #F9D342;
}

.stButton > button {
    width: 100%;
    background-color: #F9D342 !important;
    color: black !important;
}

.download-button {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #F9D342;
    color: black !important;
    text-decoration: none;
    font-weight: 600;
    text-align: center;
    width: 100%;
    }
</style>
""", unsafe_allow_html=True)

# -------------------------------------------------------------
# FFmpeg Setup
# -------------------------------------------------------------
def setup_ffmpeg():
    """Configure and verify FFmpeg installation."""
    app_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Ruta específica proporcionada por el usuario
    specific_path = os.path.abspath("microservices/shared/FFMPEG")
    
    # Lista de posibles ubicaciones para FFMPEG
    possible_paths = [
        # 1. Ruta específica proporcionada por el usuario
        specific_path,
        # 2. Ruta con backslashes (Windows)
        "microservices\\shared\\FFMPEG",
        # 3. Ruta relativa desde microservices/
        os.path.join(os.path.dirname(os.path.dirname(app_dir)), "shared", "FFMPEG"),
        # 4. Ruta original (por si acaso)
        os.path.join(app_dir, "FFMPEG"),
        # 5. Ruta absoluta del proyecto
        os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(app_dir))), "microservices", "shared", "FFMPEG"),
        # 6. Ruta directa a microservices/shared/FFMPEG
        os.path.abspath(os.path.join(app_dir, "..", "..", "shared", "FFMPEG"))
    ]
    
    # Debug info
    print("\nDebug - FFmpeg Setup:")
    print(f"App directory: {app_dir}")
    print(f"Expected FFmpeg path: {specific_path}")
    print("Checking FFmpeg configuration...")
    
    # Buscar FFMPEG en todas las rutas posibles
    ffmpeg_dir = None
    for path in possible_paths:
        print(f"Checking path: {path}")
        ffmpeg_exe = os.path.join(path, "ffmpeg.exe")
        ffprobe_exe = os.path.join(path, "ffprobe.exe")
        
        if os.path.exists(path):
            print(f"  Directory exists: {path}")
            if os.path.exists(ffmpeg_exe):
                print(f"  ffmpeg.exe exists: {ffmpeg_exe}")
                if os.path.exists(ffprobe_exe):
                    print(f"  ffprobe.exe exists: {ffprobe_exe}")
                    ffmpeg_dir = path
                    print(f"✅ Found FFmpeg at: {ffmpeg_dir}")
                    break
                else:
                    print(f"  ❌ ffprobe.exe not found at: {ffprobe_exe}")
            else:
                print(f"  ❌ ffmpeg.exe not found at: {ffmpeg_exe}")
        else:
            print(f"  ❌ Directory does not exist: {path}")
    
    if not ffmpeg_dir:
        print("❌ Could not find FFmpeg in any of the expected locations")
        st.session_state.ffmpeg_warning = "Could not find FFmpeg in any of the expected locations\nPlease ensure ffmpeg.exe and ffprobe.exe are in the FFMPEG folder."
        st.session_state.ffmpeg_location = None
        return None
    
    # Define paths for ffmpeg and ffprobe
    ffmpeg_path = os.path.join(ffmpeg_dir, "ffmpeg.exe")
    ffprobe_path = os.path.join(ffmpeg_dir, "ffprobe.exe")
    
    # Verify file existence
    ffmpeg_exists = os.path.exists(ffmpeg_path)
    ffprobe_exists = os.path.exists(ffprobe_path)
    
    print(f"FFmpeg executable found: {ffmpeg_exists}")
    print(f"FFprobe executable found: {ffprobe_exists}")
    
    # Add FFmpeg directory to PATH
    if ffmpeg_exists and ffprobe_exists:
        os.environ["PATH"] = ffmpeg_dir + os.pathsep + os.environ.get("PATH", "")
        os.environ["FFMPEG_LOCATION"] = ffmpeg_path
        os.environ["FFPROBE_LOCATION"] = ffprobe_path
        print("FFmpeg environment variables set successfully")
        
        # Store FFmpeg path in session state without showing success message
        st.session_state.ffmpeg_location = ffmpeg_path
        return ffmpeg_path
    else:
        missing = []
        if not ffmpeg_exists:
            missing.append("ffmpeg.exe")
        if not ffprobe_exists:
            missing.append("ffprobe.exe")
        error_msg = f"Missing files: {', '.join(missing)}"
        print(f"Error: {error_msg}")
        
        # Add a small warning at the bottom of the page instead of a prominent error
        st.session_state.ffmpeg_warning = error_msg
        st.session_state.ffmpeg_location = None
        return None

# -------------------------------------------------------------
# Extract Audio using FFmpeg directly
# -------------------------------------------------------------
def extract_audio(video_path, audio_path):
    """Extract audio from a video file using FFmpeg."""
    try:
        # First check if video has audio streams
        probe_cmd = [
            os.environ.get("FFPROBE_LOCATION"),
            "-v", "error",
            "-select_streams", "a",
            "-show_entries", "stream=codec_type",
            "-of", "json",
            video_path
        ]
        
        probe_result = subprocess.run(probe_cmd, capture_output=True, text=True)
        probe_data = json.loads(probe_result.stdout)
        
        # Check if video has audio streams
        if 'streams' not in probe_data or len(probe_data['streams']) == 0:
            print("No audio stream found in video")
            return False
        
        # Extract audio using FFmpeg
        cmd = [
            os.environ.get("FFMPEG_LOCATION"),
            "-i", video_path,
            "-q:a", "0",
            "-map", "a",
            "-y",
            audio_path
        ]
        
        print(f"Extracting audio from: {video_path}")
        print(f"Output audio path: {audio_path}")
        print(f"FFmpeg command: {' '.join(cmd)}")
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0:
            return True
        else:
            print(f"FFmpeg error: {result.stderr}")
            return False
    except Exception as e:
        print(f"Error extracting audio: {str(e)}")
        return False

# -------------------------------------------------------------
# Initialize FFmpeg
# -------------------------------------------------------------
default_ffmpeg = setup_ffmpeg()

# -------------------------------------------------------------
# Session State Initialization
# -------------------------------------------------------------
if 'ffmpeg_location' not in st.session_state:
    st.session_state.ffmpeg_location = default_ffmpeg

if 'logs' not in st.session_state:
    st.session_state.logs = []
if 'progress' not in st.session_state:
    st.session_state.progress = 0
if 'progress_text' not in st.session_state:
    st.session_state.progress_text = ""
if 'summary' not in st.session_state:
    st.session_state.summary = None
if 'file_info' not in st.session_state:
    st.session_state.file_info = None
if 'download_ready' not in st.session_state:
    st.session_state.download_ready = False
if 'output_dir' not in st.session_state:
    st.session_state.output_dir = None
if 'zip_path' not in st.session_state:
    st.session_state.zip_path = None

# -------------------------------------------------------------
# Capture yt-dlp Output
# -------------------------------------------------------------
@contextlib.contextmanager
def capture_yt_dlp_output():
    stdout = sys.stdout
    stderr = sys.stderr
    string_io = io.StringIO()
    try:
        sys.stdout = string_io
        sys.stderr = string_io
        yield string_io
    finally:
        sys.stdout = stdout
        sys.stderr = stderr

# -------------------------------------------------------------
# Log Functions (still needed for internal tracking)
# -------------------------------------------------------------
def add_log_info(message):
    st.session_state.logs.append({"type": "info", "message": message})

def add_log_error(message, details=None):
    error_msg = message
    if details:
        error_msg += f" Details: {details}"
    st.session_state.logs.append({"type": "error", "message": error_msg})

def update_progress(current, total, message=None):
    """Update the progress bar and estimated time."""
    if 'start_time' not in st.session_state:
        st.session_state.start_time = time.time()
        st.session_state.processed_items = 0
    
    # Calculate progress
    progress = min(current / total, 1.0) if total > 0 else 0
    st.session_state.progress = progress
    
    # Calculate estimated time remaining
    if current > st.session_state.processed_items and current > 0:
        elapsed_time = time.time() - st.session_state.start_time
        items_processed = current - st.session_state.processed_items
        time_per_item = elapsed_time / items_processed
        remaining_items = total - current
        estimated_time = remaining_items * time_per_item
        
        # Format estimated time
        if estimated_time < 60:
            time_str = f"{estimated_time:.0f} seconds"
        elif estimated_time < 3600:
            time_str = f"{estimated_time/60:.1f} minutes"
        else:
            time_str = f"{estimated_time/3600:.1f} hours"
        
        st.session_state.estimated_time = time_str
        st.session_state.processed_items = current
    
    # Update progress message
    if message:
        st.session_state.progress_message = message
        add_log_info(message)

# -------------------------------------------------------------
# Processing Logic
# -------------------------------------------------------------
def process_file(uploaded_file, output_dir):
    """Process the input file and download media content."""
    try:
        add_log_info(f"Starting file processing: {uploaded_file.name}")
        
        # Verify FFmpeg exists without showing messages in the UI
        if not os.path.exists(st.session_state.ffmpeg_location):
            add_log_error("FFmpeg not found at configured location")
            return False
        
        # Create output directories
        media_dir = os.path.join(output_dir, "media")
        images_dir = os.path.join(media_dir, "images")
        videos_dir = os.path.join(media_dir, "videos")
        audio_dir = os.path.join(media_dir, "audio")
        
        for directory in [output_dir, media_dir, images_dir, videos_dir, audio_dir]:
            if not os.path.exists(directory):
                os.makedirs(directory)
                print(f"Created directory: {directory}")
        
        # Read the file
        if uploaded_file.name.endswith('.csv'):
            df = pd.read_csv(uploaded_file)
        else:
            df = pd.read_excel(uploaded_file)
        
        # Ensure post_type is treated as string
        df["post_type"] = df["post_type"].astype(str)
        
        # Count by post_type
        post_type_counts = df['post_type'].value_counts().to_dict()
        add_log_info(f"File loaded with {len(df)} entries")
        add_log_info(f"Post types distribution: {post_type_counts}")
        
        # Calculate media counts
        image_types = ["image", "photo", "imagen", "foto", "picture", "pic"]
        video_types = ["video", "reel", "vídeo", "clip", "movie"]
        images_count = len(df[df["post_type"].str.lower().isin(image_types)])
        videos_count = len(df[df["post_type"].str.lower().isin(video_types)])
        
        # Initialize status columns
        if 'download_status' not in df.columns:
            df['download_status'] = 'pending'
        if 'download_status_audio' not in df.columns:
            df['download_status_audio'] = 'pending'
        
        # File info with improved media counting
        file_info = {
            "fileName": uploaded_file.name,
            "totalRows": len(df),
            "missingColumns": [],
            "isValid": True,
            "mediaCount": {
                "total": len(df),
                "images": images_count,
                "videos": videos_count
            }
        }
        st.session_state.file_info = file_info
        
        # Remove duplicates
        df = df.drop_duplicates(subset=["post_link", "image"]).reset_index(drop=True)
        
        # Tracking columns
        df["media_file"] = ""
        df["audio_file"] = ""
        
        total_rows = len(df)
        current_row = 0
        media_counter = 1
        update_progress(current_row, total_rows)
        
        # Process each row with improved post_type handling
        for index, row in df.iterrows():
            try:
                current_row += 1
                update_progress(
                    current_row, 
                    total_rows, 
                    f"Processing item {current_row} of {total_rows}"
                )
                
                status = "pending"
                file_path = ""
                audio_path = ""
                post_type = str(row.get("post_type", "")).lower()
                audio_status = "skipped"
                
                # Process based on post type using more flexible matching
                if any(vid_type in post_type for vid_type in ["video", "reel", "vídeo", "clip", "movie"]):
                    # Video processing
                    video_url = row.get("post_link", "")
                    if pd.notna(video_url) and str(video_url).strip() != "":
                        add_log_info(f"Downloading video #{media_counter}: {video_url}")
                        
                        video_opts = {
                            "format": "mp4/best",
                            "outtmpl": os.path.join(videos_dir, f'post_{media_counter}.mp4'),
                            "quiet": True,
                            "no_warnings": True,
                            "ffmpeg_location": st.session_state.ffmpeg_location,
                            "prefer_ffmpeg": True
                        }
                        
                        try:
                            with capture_yt_dlp_output():
                                with YoutubeDL(video_opts) as ydl:
                                    ydl.download([video_url])
                                    
                            video_path = os.path.join(videos_dir, f'post_{media_counter}.mp4')
                            if os.path.exists(video_path) and os.path.getsize(video_path) > 0:
                                file_path = os.path.join("media", "videos", f'post_{media_counter}.mp4')
                                status = "success"
                                
                                # Extract audio
                                add_log_info(f"Extracting audio from video #{media_counter}")
                                audio_full_path = os.path.join(audio_dir, f'post_{media_counter}.mp3')
                                if extract_audio(video_path, audio_full_path):
                                    audio_status = "success"
                                    audio_path = os.path.join("media", "audio", f'post_{media_counter}.mp3')
                                else:
                                    audio_status = "failed"
                                media_counter += 1
                            else:
                                status = "failed"
                        except Exception as e:
                            status = "failed"
                            add_log_error(f"Error processing video: {str(e)}")
                    else:
                        status = "failed"
                        audio_status = "failed"
                
                else:
                    # Image processing (anything not identified as video)
                    image_url = row.get("image", "")
                    if pd.notna(image_url) and str(image_url).strip() != "":
                        add_log_info(f"Downloading image: {image_url}")
                        full_file_path = os.path.join(images_dir, f"post_{media_counter}.jpg")
                        try:
                            response = requests.get(image_url, stream=True, timeout=60)
                            if response.status_code == 200:
                                with open(full_file_path, 'wb') as imgf:
                                    for chunk in response.iter_content(chunk_size=8192):
                                        if chunk:
                                            imgf.write(chunk)
                                if os.path.exists(full_file_path) and os.path.getsize(full_file_path) > 0:
                                    status = "success"
                                    file_path = os.path.join("media", "images", f"post_{media_counter}.jpg")
                                    media_counter += 1
                                else:
                                    status = "failed"
                            else:
                                status = "failed"
                        except Exception as e:
                            status = "failed"
                    else:
                        status = "failed"
                
                # Update DataFrame
                df.at[index, "download_status"] = status
                df.at[index, "media_file"] = file_path
                df.at[index, "download_status_audio"] = audio_status
                df.at[index, "audio_file"] = audio_path
            
            except Exception as e:
                add_log_error(f"Error processing row {current_row}: {str(e)}")
                df.at[index, "download_status"] = "failed"
                df.at[index, "download_status_audio"] = "failed"
        
        # Save results to Excel
        output_file = os.path.join(output_dir, "results.xlsx")
        # Remove unwanted columns before saving
        columns_to_remove = ['media_status', 'audio_status', 'media_path', 'audio_path']
        df_to_save = df.drop(columns=[col for col in columns_to_remove if col in df.columns])
        df_to_save.to_excel(output_file, index=False)
        
        # Generate summary
        status_counts = df["download_status"].value_counts(dropna=False)
        audio_counts = df["download_status_audio"].value_counts(dropna=False)
        
        total_media = len(df)
        total_audio = len(df[df["post_type"].str.lower().isin(["video", "reel", "vídeo", "clip", "movie"])])
        
        summary = {
            "total_processed": total_media,
            "media_results": [],
            "audio_results": [],
            "post_type_counts": post_type_counts,
            "media_status": status_counts.to_dict(),
            "audio_status": audio_counts.to_dict()
        }
        
        for status_val, count_val in status_counts.items():
            pct = (count_val / total_media * 100) if total_media else 0
            summary["media_results"].append({
                "status": status_val,
                "count": int(count_val),
                "percentage": round(pct, 2)
            })
        
        for status_val, count_val in audio_counts.items():
            pct = (count_val / total_audio * 100) if total_audio else 0
            summary["audio_results"].append({
                "status": status_val,
                "count": int(count_val),
                "percentage": round(pct, 2)
            })
        
        st.session_state.summary = summary
        return True
    
    except Exception as e:
        add_log_error(f"Error processing file: {str(e)}")
        return False

# -------------------------------------------------------------
# ZIP Creation
# -------------------------------------------------------------
def create_zip_file(output_dir):
    try:
        zip_path = f"{output_dir}.zip"
        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for root, dirs, files in os.walk(output_dir):
                for file in files:
                    file_path = os.path.join(root, file)
                    zipf.write(
                        file_path, 
                        os.path.relpath(file_path, os.path.dirname(output_dir))
                    )
        return zip_path
    except Exception as e:
        add_log_error(f"Error creating ZIP file: {str(e)}")
        return None

# -------------------------------------------------------------
# Download Link
# -------------------------------------------------------------
def get_download_link(bin_file, file_label='File'):
    with open(bin_file, 'rb') as f:
        data = f.read()
    bin_str = base64.b64encode(data).decode()
    href = f'''
    <div style="text-align: center;">
        <a href="data:application/zip;base64,{bin_str}" 
           download="{os.path.basename(bin_file)}" 
           class="download-button">
            📥 Download {file_label}
        </a>
    </div>
    '''
    return href

# -------------------------------------------------------------
# Main Streamlit App
# -------------------------------------------------------------
def count_files_in_directory(directory):
    """Count files in a directory and its subdirectories."""
    file_counts = {}
    
    if os.path.exists(directory):
        # Count files in images directory
        images_dir = os.path.join(directory, "media", "images")
        if os.path.exists(images_dir):
            file_counts["Images"] = len([f for f in os.listdir(images_dir) if os.path.isfile(os.path.join(images_dir, f))])
        else:
            file_counts["Images"] = 0
            
        # Count files in videos directory
        videos_dir = os.path.join(directory, "media", "videos")
        if os.path.exists(videos_dir):
            file_counts["Videos"] = len([f for f in os.listdir(videos_dir) if os.path.isfile(os.path.join(videos_dir, f))])
        else:
            file_counts["Videos"] = 0
            
        # Count files in audio directory
        audio_dir = os.path.join(directory, "media", "audio")
        if os.path.exists(audio_dir):
            file_counts["Audio"] = len([f for f in os.listdir(audio_dir) if os.path.isfile(os.path.join(audio_dir, f))])
        else:
            file_counts["Audio"] = 0
    
    return file_counts

def main():
    # Header
    st.title("RivalIQ Media Extractor")
    
    # Initialize session state variables
    if 'logs' not in st.session_state:
        st.session_state.logs = []
    if 'progress' not in st.session_state:
        st.session_state.progress = 0
    if 'summary' not in st.session_state:
        st.session_state.summary = None
    if 'file_info' not in st.session_state:
        st.session_state.file_info = None
    if 'download_ready' not in st.session_state:
        st.session_state.download_ready = False
    if 'output_dir' not in st.session_state:
        st.session_state.output_dir = None
    if 'zip_path' not in st.session_state:
        st.session_state.zip_path = None
    
    # Verificar y crear la carpeta FFMPEG si no existe
    app_dir = os.path.dirname(os.path.abspath(__file__))
    ffmpeg_dir = os.path.abspath("microservices/shared/FFMPEG")
    
    if not os.path.exists(ffmpeg_dir):
        try:
            os.makedirs(ffmpeg_dir, exist_ok=True)
            print(f"✅ Created FFMPEG directory at: {ffmpeg_dir}")
            st.info(f"Se ha creado la carpeta FFMPEG en: {ffmpeg_dir}. Por favor, coloca los archivos ffmpeg.exe y ffprobe.exe en esta carpeta.")
        except Exception as e:
            print(f"❌ Error creating FFMPEG directory: {e}")
    
    # Setup FFmpeg silently (without displaying the header)
    ffmpeg_path = setup_ffmpeg()
    
    # File upload
    st.header("File Upload")
    uploaded_file = st.file_uploader("Upload CSV or Excel file", type=["csv", "xlsx", "xls"])
    
    # Process button
    if uploaded_file is not None:
        if st.button("Process File"):
            # Reset state
            st.session_state.logs = []
            st.session_state.progress = 0
            st.session_state.summary = None
            st.session_state.file_info = None
            st.session_state.download_ready = False
            st.session_state.start_time = time.time()
            st.session_state.processed_items = 0
            st.session_state.estimated_time = None
            st.session_state.progress_message = None
            
            # Create output directory with file name
            file_name = os.path.splitext(uploaded_file.name)[0]
            output_dir = os.path.join(os.getcwd(), f"{file_name}_media")
            st.session_state.output_dir = output_dir
            
            # Process file
            with st.spinner("Processing file..."):
                if process_file(uploaded_file, output_dir):
                    # Create ZIP file
                    zip_path = create_zip_file(output_dir)
                    if zip_path:
                        st.session_state.zip_path = zip_path
                        st.session_state.download_ready = True
                        st.success("Processing complete!")
                    else:
                        st.error("Error creating ZIP file.")
                else:
                    st.error("Error processing file.")
    
    # Display file information
    if 'file_info' in st.session_state and st.session_state.file_info:
        st.markdown("### File Information")
        st.markdown(f"**File Name**: {st.session_state.file_info['fileName']}")
        st.markdown(f"**Total Entries**: {st.session_state.file_info['totalRows']}")
        
        # Display post type counts first
        if 'summary' in st.session_state and st.session_state.summary and 'post_type_counts' in st.session_state.summary:
            st.markdown("#### Post Types:")
            for post_type, count in st.session_state.summary['post_type_counts'].items():
                # Determine icon based on post type
                if post_type.lower() in ["video", "reel", "vídeo", "clip", "movie"]:
                    icon = "🎬"
                elif post_type.lower() in ["image", "photo", "imagen", "foto", "picture", "pic"]:
                    icon = "📷"
                elif post_type.lower() == "link":
                    icon = "🔗"
                else:
                    icon = "📄"
                st.markdown(f"• {icon} **{post_type}**: {count}")
        
        # Summary display
        if st.session_state.summary:
            st.subheader("Summary of Results")
            summary = st.session_state.summary
            
            st.markdown(f"**Total Processed:** {summary['total_processed']}")
            
            # Media results
            st.markdown("#### Media Download Results:")
            for result in summary["media_results"]:
                status = result["status"]
                if status == "success":
                    st.success(f"✅ {status}: {result['count']} ({result['percentage']}%)")
                elif status == "failed":
                    st.error(f"❌ {status}: {result['count']} ({result['percentage']}%)")
                elif status == "pending":
                    st.warning(f"⏳ {status}: {result['count']} ({result['percentage']}%)")
                else:
                    st.info(f"⏭️ {status}: {result['count']} ({result['percentage']}%)")
            
            # Audio results
            st.markdown("#### Audio Extraction Results:")
            for audio_result in summary["audio_results"]:
                status = audio_result["status"]
                if status == "success":
                    st.success(f"✅ {status}: {audio_result['count']} ({audio_result['percentage']}%)")
                elif status == "failed":
                    st.error(f"❌ {status}: {audio_result['count']} ({audio_result['percentage']}%)")
                elif status == "pending":
                    st.warning(f"⏳ {status}: {audio_result['count']} ({audio_result['percentage']}%)")
                else:
                    st.info(f"⏭️ {status}: {audio_result['count']} ({audio_result['percentage']}%)")
        
    # Download button
    if st.session_state.download_ready and st.session_state.zip_path:
        # Display file counts
        st.markdown("### Files Generated")
        file_counts = count_files_in_directory(st.session_state.output_dir)
        
        for file_type, count in file_counts.items():
            if file_type == "Images":
                icon = "📷"
            elif file_type == "Videos":
                icon = "🎬"
            elif file_type == "Audio":
                icon = "🔊"
            else:
                icon = "📄"
            st.markdown(f"**{icon} {file_type}**: {count}")
        
        # Download button
        st.markdown("### Download Results")
        st.markdown(get_download_link(
            st.session_state.zip_path, "ZIP File"
        ), unsafe_allow_html=True)
        
    # Show FFmpeg warning if exists (at the bottom of the page)
    if 'ffmpeg_warning' in st.session_state and st.session_state.ffmpeg_warning:
        st.markdown("---")
        st.markdown("<div class='error-message' style='font-size: 0.8rem;'>⚠️ FFmpeg configuration issue: " + 
                   st.session_state.ffmpeg_warning + "</div>", unsafe_allow_html=True)
        st.markdown("<div style='font-size: 0.8rem;'>Por favor, asegúrate de que ffmpeg.exe y ffprobe.exe estén en la carpeta: <code>microservices\\shared\\FFMPEG</code></div>", 
                   unsafe_allow_html=True)

# -------------------------------------------------------------
# Run the App
# -------------------------------------------------------------
if __name__ == "__main__":
    main()