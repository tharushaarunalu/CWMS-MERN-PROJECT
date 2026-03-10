@echo off
start cmd /k "cd backend && npm start"
start cmd /k "cd frontend && npm start"
:: Use ping for delay as timeout doesn't work well in non-interactive shells
ping 127.0.0.1 -n 6 > nul
start msedge http://localhost:3000
