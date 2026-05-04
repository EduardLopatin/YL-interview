# YL-interview

## Goal:
Task is to build a video player based on the provided Figma design.

## Requirements
- [x] Build your own video player from scratch (no third-party libraries or
open source players).
- [x] Implement the design exactly as it is in Figma.
- [x] Your player must support HLS streaming and allow users to
change video resolution (720p, 1080p, etc...). Hint: use hls.js.
- [x] Display chapters on the timeline as shown in the Figma design.

Timeline interaction:
- [x] On hover, show current time and the name of the hovered
chapter.
- [x] Clicking on the timeline should seek to the selected time in
the video.

### How to setup project
Clone the repo first
```bash
git clone REPO_ADDRESS
```
After clone to into derictory
```bash
cd FOLDER_NAME
```
Node version can be found in .nvmrc
```bash
nvm use // to set recommended version v24.13.1 or use any last LTS
```
Install dependencies
```bash
npm install
```

run dev server
```bash
npm run dev
```

go to http://localhost:5173/ to see results

### Room for improvements:
1. Figma template and requirements didn't provide clear goals about fullsrean.
2. Need to predict behaviour in case if no chapters provided.
3. Styles polishing
4. Chapters size by time
5. Refactoring
