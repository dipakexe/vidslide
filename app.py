"""
TODO: highlight the time label with either adaptive font color or a semi-transparent grey background.
"""

import os
import tempfile
from io import BytesIO

from flask import Flask, render_template, request, send_file, jsonify
from flask_cors import CORS

from PIL import Image
from fpdf import FPDF
from moviepy.editor import VideoFileClip


app = Flask(__name__)
CORS(app=app)


@app.get("/")
def home():
    return render_template("index.html")


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in {
        "mp4",
        "avi",
        "mkv",
        "mov",
    }


def video_to_pdf(video_stream, frame_gap_seconds, include_time_label=False):
    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        temp_file.write(video_stream.read())
        temp_file.seek(0)

        clip = VideoFileClip(temp_file.name, audio=False)

    frame_rate = 1 / frame_gap_seconds

    with tempfile.TemporaryDirectory() as temp_output_dir:
        temp_image_file = os.path.join(temp_output_dir, "image.png")
        temp_output_pdf_path = os.path.join(temp_output_dir, "output.pdf")

        pdf = FPDF(orientation="landscape")

        for i, (frame, time) in enumerate(
            zip(
                clip.iter_frames(fps=frame_rate),
                clip.iter_frames(fps=clip.fps, with_times=True),
            )
        ):
            temp_image_file = os.path.join(temp_output_dir, f"image_{i}.png")
            pil_image = Image.fromarray(frame)
            pil_image.save(temp_image_file)

            pdf.add_page()
            pdf.image(temp_image_file, x=0, y=0, w=pdf.w, h=pdf.h)

            if include_time_label:
                time_label = "{:02d}:{:02d}/{:02d}:{:02d}".format(
                    int(time[0] // 60),
                    int(time[0] % 60),
                    int(clip.duration // 60),
                    int(clip.duration % 60),
                )

                pdf.set_xy(10, 10)
                pdf.set_font("Arial", size=15, style="B")
                pdf.cell(0, 10, time_label, align="C")

        pdf.output(temp_output_pdf_path)

        return send_file(temp_output_pdf_path, as_attachment=True)


@app.post("/video2slide")
def convert_video_to_slide():
    video = request.files["video"]
    include_time_label = request.form.get(
        "include_time_label", default=False, type=bool
    )

    if "video" not in request.files or video.filename == "":
        return (jsonify({"error": "No video file part"}), 400)

    if not allowed_file(video.filename):
        print("Invalid video file is not allowed.")

        return (
            jsonify(
                {"error": "Invalid file format. Allowed formats: mp4, avi, mkv, mov"}
            ),
            400,
        )

    frame_gap_seconds = float(request.form.get("frame_gap_seconds", 1.0))

    if video:
        return video_to_pdf(
            video_stream=video.stream,
            frame_gap_seconds=frame_gap_seconds,
            include_time_label=include_time_label,
        )


if __name__ == "__main__":
    app.run(debug=True)
