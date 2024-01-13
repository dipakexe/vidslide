# VidSlide

Video 🎥 to PDF 📄 converter.

## RUN LOCALLY

Firstly, Install python and Node.js dependencies then build the frontend and start the server:

- `pip install -r requirements.txt && npm install`
- `npm run build && python app.py`

## DEPLOYMENT

> Firstly, The python runtime assumes that you have already built the frontend locally, So we need to build the frontend locally using `npm run build` command.
> Then, Deploy the project to vercel using `npx vercel --prod`.
