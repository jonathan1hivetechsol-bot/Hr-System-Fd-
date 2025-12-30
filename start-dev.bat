@echo off
REM Start Firebase Emulator Suite in the background
echo Starting Firebase Emulator Suite...
start "Firebase Emulator" cmd /k "cd "C:\Users\Futur\Downloads\New folder\Future Designz Hr Panel" && firebase emulators:start"

REM Wait for emulator to start
timeout /t 5 /nobreak

REM Start dev server
echo Starting Vite dev server...
cd "C:\Users\Futur\Downloads\New folder\Future Designz Hr Panel"
npm run dev
